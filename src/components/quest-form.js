import { useState } from "react";
import QuestPicker from "./quest-picker";
import QUEST_TYPES from "../constants/quest-types";
import {
    QUEST_FORMATS_ALL,
    QUEST_FORMAT_ITEM,
    QUEST_FORMAT_ENTITY,
    QUEST_FORMAT_POTION,
    QUEST_FORMAT_COMMAND,
    QUEST_FORMAT_SHEEP,
    QUEST_FORMAT
} from "../constants/quest-formats"
import { useDispatch, useSelector } from "react-redux";
import {
    addAttribute,
    addArrayAttribute,
    addObjectAttribute,
    addArrayField,
    removeArrayField,
} from "@/app/current-quest-slice";

export default function QuestForm() {
    const [quest, setQuest] = useState(QUEST_FORMATS_ALL);
    const [submittedType, setSubmittedType] = useState(false);

    const currentQuest = useSelector((state) => state.currentQuest.quest);
    const dispatch = useDispatch();

    // TODO: this is messy, let's try to put these into components 
    const generateQuestField = (key, fieldType, index) => {
        if (Array.isArray(fieldType)) {
            return (
                <>
                    <label htmlFor={key}>{key}:</label>
                    <button
                        type="button"
                        className="border-2 border-green-400 rounded-sm px-1 m-1"
                        onClick={(e) => {
                            dispatch(addArrayField({ key: key }));
                        }}>
                        Add Field
                    </button>
                    <button
                        type="button"
                        className="border-2 border-red-400 rounded-sm px-1 m-1"
                        onClick={(e) => {
                            dispatch(removeArrayField({ key: key }));
                        }}>
                        Remove Field
                    </button>
                    <br />
                    {
                        currentQuest[key].map((ikey, iindex) => {
                            return (
                                <>
                                    <label htmlFor={ikey}>{"- "}</label>
                                    <input
                                        type="text"
                                        name={ikey}
                                        id={ikey}
                                        key={iindex}
                                        className={"bg-black border-2 border-slate-400 rounded-sm m-1"}
                                        onChange={(e) => {
                                            dispatch(addArrayAttribute({
                                                key: key,
                                                index: iindex,
                                                value: e.target.value
                                            }))
                                        }}
                                    />
                                    <br />
                                </>
                            );
                        })
                    }
                </>
            );
        } else if (fieldType instanceof Object) {
            return (
                <>
                    <label htmlFor={key}>{key}:</label>
                    <br />
                    {
                        Object.keys(fieldType)
                            .map((ikey, iindex) => {
                                return (
                                    <>
                                        <label htmlFor={ikey}>{"- " + ikey}:</label>
                                        <input
                                            type="text"
                                            name={ikey}
                                            id={ikey}
                                            key={iindex}
                                            className={"bg-black border-2 border-slate-400 rounded-sm m-1"}
                                            onChange={(e) => {
                                                dispatch(addObjectAttribute({
                                                    origin: key,
                                                    key: ikey,
                                                    value: e.target.value
                                                }))
                                            }}
                                        />
                                        <br />
                                    </>
                                );

                            })
                    }
                </>
            );
        } else {
            return (
                <>
                    <label htmlFor={key}>{key}:</label>
                    <input
                        type="text"
                        name={key}
                        id={key}
                        key={index}
                        className={"bg-black border-2 border-slate-400 rounded-sm m-1"}
                        onChange={(e) => {
                            dispatch(addAttribute({ [key]: e.target.value }))
                        }}
                    />
                    <br />
                </>
            );
        }
    }

    const generateQuestForm = (type) => {
        let questFields = QUEST_FORMATS_ALL;

        switch (QUEST_TYPES[type].toLowerCase()) {
            case "item":
                questFields = { ...questFields, ...QUEST_FORMAT_ITEM };
                break;
            case "entity":
                questFields = { ...questFields, ...QUEST_FORMAT_ENTITY };
                break;
            default:
                break;
        }

        return (
            <>
                <p className="pb-2">quest_type: {type}</p>
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        console.log(currentQuest);
                    }
                }>
                    {Object.keys(questFields)
                        .map((key, index) => generateQuestField(key, questFields[key], index))}
                    <button type="submit" className="border-2 border-slate-400 rounded-sm px-1">Submit</button>
                </form>
            </>
        );
    };

    return (
        <div className="flex flex-col items-center justify-start h-full">
            {!submittedType && (<QuestPicker onQuestPick={setSubmittedType} />)}
            {submittedType && generateQuestForm(currentQuest['quest_type'])}
        </div>
    );
}