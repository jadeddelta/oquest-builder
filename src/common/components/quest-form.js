import { useState } from "react";
import QuestPicker from "./quest-picker";
import {
    QUEST_DEFINITIONS,
    QUEST_ALL,
    QUEST_ITEM,
    QUEST_ENTITY,
    QUEST_SHEEP,
    QUEST_POTION,
    QUEST_COMMAND,
    QUEST_CUSTOM_ITEM,
    QUEST_LOCATION,
    QUEST_VILLAGER
} from "../utils/quest-definitions";
import QUEST_TYPES from "../utils/quest-types";
import { useDispatch, useSelector } from "react-redux";
import {
    addAttribute,
    removeAttribute,
    resetQuest,
} from "@/common/redux/current-quest-slice";
import { addQuest } from "@/common/redux/all-quests-slice";
import { current } from "@reduxjs/toolkit";
import QuestNumber from "./quest_fields/quest-number";
import QuestSingleStr from "./quest_fields/quest-singlestr";
import QuestArrayStr from "./quest_fields/quest-arraystr";
import QuestOptArrayCap from "./quest_fields/quest-optarraycap";

export default function QuestForm() {
    const [submittedType, setSubmittedType] = useState(false);

    const currentQuest = useSelector((state) => state.currentQuest.quest);
    const dispatch = useDispatch();

    // IDEA: we are rewiring to check key against quest definitions,
    // and then generate the appropriate component, removing the need for fieldType
    const getFieldComponent = (key, index) => {
        const definition = QUEST_DEFINITIONS[key];
        if (definition instanceof Array) {
            return (
                <>
                    <label htmlFor={key}>{key}:</label>
                    <br />
                    {definition.map((ikey, iindex) => { // TODO: find a better way to do this maybe
                        return ( // WARNING: this won't work for "command" field
                            <div key={(index * 10) + iindex} className="flex items-center">
                                <p>&nbsp;&nbsp;-&nbsp;</p>
                                {getFieldComponent(ikey, (index * 10) + iindex)}
                            </div>
                        );
                    })}
                </>
            );
        }
        switch (definition) {
            case "singlecap":
            case "singlestr":
                return (
                    <QuestSingleStr questKey={key} index={index} />
                );
            case "number":
                return (
                    <QuestNumber questKey={key} index={index} />
                );
            case "arraycap":
            case "arraystr":
                return (
                    <QuestArrayStr questKey={key} index={index} />
                );
            case "optarraystr":
            case "optarraycap":
                return (
                    <QuestOptArrayCap questKey={key} index={index} />
                );
            default:
                return (
                    <p>but how did you get here?</p>
                );
        }
    }

    const generateQuestForm = (type) => {
        let questFields = QUEST_ALL;

        switch (QUEST_TYPES[type]) {
            case "ITEM":
                questFields = questFields.concat(QUEST_ITEM);
                break;
            case "ENTITY":
                questFields = questFields.concat(QUEST_ENTITY);
                if (currentQuest['quest_type'] === "SHEAR" && currentQuest['required_entity'] === "SHEEP") {
                    questFields = questFields.concat(QUEST_SHEEP);
                }
                break;
            case "LOCATION":
                questFields = questFields.concat(QUEST_LOCATION);
                questFields = questFields.filter((key) => key !== "required_amount");
                break;
            case "VILLAGER":
                questFields = questFields.concat(QUEST_VILLAGER);
                break;
            default:
                console.error("how did you get here?");
                break;
        }

        // NOT WORKING THE WAY I WANT IT
        // make command coupled with the reward tag somehow
        if (currentQuest['reward_type'] === "COMMAND") {
            questFields = questFields.concat(QUEST_COMMAND);
            if (!("commands" in currentQuest)) {
                dispatch(addAttribute({ "commands": [""] }));
            }
        } else {
            dispatch(removeAttribute("commands"));
        }

        return (
            <>
                <p className="pb-2">quest_type: {type}</p>
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        console.log(currentQuest);
                        dispatch(addQuest(currentQuest));
                    }
                }>
                    {
                        questFields.map((key, index) => {
                            return (
                                <>
                                    {getFieldComponent(key, index)}
                                </>
                            );
                        })
                    }
                    <div className="flex flex-row justify-between mt-2">
                        <button type="submit" className="border-2 border-yellow-400 rounded-sm px-1">Submit</button>
                        <button
                            type="button"
                            className="border-2 border-blue-400 rounded-sm px-1"
                            onClick={(e) => {
                                setSubmittedType(false);
                                dispatch(resetQuest());
                            }}>Reset Type</button>
                    </div>
                </form>
            </>
        );
    };

    return (
        <div className="flex flex-col items-center justify-start h-full w-1/3">
            {!submittedType && (<QuestPicker onQuestPick={setSubmittedType} />)}
            {submittedType && generateQuestForm(currentQuest['quest_type'])}
        </div>
    );
}