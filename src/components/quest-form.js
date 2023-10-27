import { useState } from "react";
import QuestPicker from "./quest-picker";
import QUEST_TYPES from "../utils/quest-types";
import {
    QUEST_FORMATS_ALL,
    QUEST_FORMAT_ITEM,
    QUEST_FORMAT_ENTITY,
    QUEST_FORMAT_POTION,
    QUEST_FORMAT_COMMAND,
    QUEST_FORMAT_SHEEP,
    QUEST_FORMAT
} from "../utils/quest-formats"
import { useDispatch, useSelector } from "react-redux";
import {
    addAttribute,
    addArrayAttribute,
    addObjectAttribute,
    addArrayField,
    removeArrayField,
    resetQuest,
    allowMultiple,
    disallowMultiple
} from "@/app/current-quest-slice";
import { addQuest } from "@/app/all-quests-slice";
import { current } from "@reduxjs/toolkit";

export default function QuestForm() {
    const CAN_BE_MULTIPLE = ["required_item", "required_entity", "commands"];
    const IS_NUMBER = ["required_amount", "amount"];

    const [submittedType, setSubmittedType] = useState(false);

    const currentQuest = useSelector((state) => state.currentQuest.quest);
    const dispatch = useDispatch();

    // TODO: this is messy, let's try to put these into components 
    const generateQuestField = (key, fieldType, index) => {
        if (CAN_BE_MULTIPLE.includes(key)) {
            if (Array.isArray(currentQuest[key])) {
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
                        {currentQuest[key].length > 2 &&
                            <button
                                type="button"
                                className="border-2 border-red-400 rounded-sm px-1 m-1"
                                onClick={(e) => {
                                    dispatch(removeArrayField({ key: key }));
                                }}>
                                Remove Field
                            </button>
                        }
                        {currentQuest[key].length === 2 &&
                            <button
                                type="button"
                                className="border-2 border-red-400 rounded-sm px-1 m-1"
                                onClick={(e) => {
                                    dispatch(disallowMultiple({ key: key }));
                                }}>
                                Disallow Multiple
                            </button>
                        }
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
            } else {
                return (
                    <>
                        <label htmlFor={key}>{key}:</label>
                        <button
                            type="button"
                            className="border-2 border-green-400 rounded-sm px-1 m-1"
                            onClick={(e) => {
                                dispatch(allowMultiple({ key: key }));
                            }}>
                            Allow Multiple
                        </button>
                        <br />
                        <label htmlFor={key}>{"- "}</label>
                        <input
                            type="text"
                            name={key}
                            id={key}
                            className={"bg-black border-2 border-slate-400 rounded-sm m-1"}
                            onChange={(e) => {
                                dispatch(addAttribute({ [key]: e.target.value }))
                            }}
                        />
                        <br />
                    </>
                );
            }
        } else if (Array.isArray(fieldType)) {
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
                                            type={(IS_NUMBER.includes(ikey) ? "number" : "text")}
                                            size={(IS_NUMBER.includes(ikey) ? "10" : "")}
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
                        type={(IS_NUMBER.includes(key) ? "number" : "text")}
                        size={(IS_NUMBER.includes(key) ? "10" : "")}
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
                if (currentQuest['quest_type'] === "SHEAR" && currentQuest['required_entity'] === "SHEEP") {
                    questFields = { ...questFields, ...QUEST_FORMAT_SHEEP };
                }
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
                        dispatch(addQuest(currentQuest));
                    }
                }>
                    {Object.keys(questFields)
                        .map((key, index) => generateQuestField(key, questFields[key], index))}
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