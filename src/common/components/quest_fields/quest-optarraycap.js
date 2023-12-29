import {
    addAttribute,
    addArrayField,
    addArrayAttribute,
    removeArrayField,
    allowMultiple,
    disallowMultiple
} from "@/common/redux/current-quest-slice";
import { useDispatch, useSelector } from "react-redux";

export default function QuestOptArrayCap({ questKey, index }) {
    const dispatch = useDispatch();
    const currentQuest = useSelector((state) => state.currentQuest.quest);

    if (Array.isArray(currentQuest[questKey])) {
        return (
            <>
                <label htmlFor={questKey}>{questKey}:</label>
                <button
                    type="button"
                    className="border-2 border-green-400 rounded-sm px-1 m-1"
                    onClick={(e) => {
                        dispatch(addArrayField({ key: questKey }));
                    }}>
                    Add Field
                </button>
                {currentQuest[questKey].length > 2 &&
                    <button
                        type="button"
                        className="border-2 border-red-400 rounded-sm px-1 m-1"
                        onClick={(e) => {
                            dispatch(removeArrayField({ key: questKey }));
                        }}>
                        Remove Field
                    </button>
                }
                {currentQuest[questKey].length === 2 &&
                    <button
                        type="button"
                        className="border-2 border-red-400 rounded-sm px-1 m-1"
                        onClick={(e) => {
                            dispatch(disallowMultiple({ key: questKey }));
                        }}>
                        Disallow Multiple
                    </button>
                }
                <br />
                {
                    currentQuest[questKey].map((ikey, iindex) => {
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
                                            key: questKey,
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
                <label htmlFor={questKey}>{questKey}:</label>
                <button
                    type="button"
                    className="border-2 border-green-400 rounded-sm px-1 m-1"
                    onClick={(e) => {
                        dispatch(allowMultiple({ key: questKey }));
                    }}>
                    Allow Multiple
                </button>
                <br />
                <label htmlFor={questKey}>{"- "}</label>
                <input
                    type="text"
                    name={questKey}
                    id={questKey}
                    className={"bg-black border-2 border-slate-400 rounded-sm m-1"}
                    onChange={(e) => {
                        dispatch(addAttribute({ [questKey]: e.target.value }))
                    }}
                />
                <br />
            </>
        );
    }
}