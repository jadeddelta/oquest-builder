import { useDispatch } from "react-redux";
import QUEST_TYPES from "../utils/quest-types";
import { addArrayField, addAttribute } from "@/common/redux/current-quest-slice";

export default function QuestPicker({ onQuestPick }) {
    const dispatch = useDispatch();

    // TODO: onSubmit replaces the URL, change this
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(addAttribute({ quest_type: e.target["quest-type"].value }));
            dispatch(addAttribute({ description: [] })); // TODO: i hate this i hate this can we change this later
            dispatch(addArrayField({ key: "description" }));
            dispatch(addAttribute({ reward: "dummy" }))
            onQuestPick(true);
        }}>
            <label htmlFor="quest-type">Pick a quest type: </label>
            <select name="quest-type" id="quest-type" className={"mr-2 bg-black"}>
                {Object.keys(QUEST_TYPES).map((key, index) => {
                    return (
                        <option key={index} value={key}>{key}</option>
                    );
                })}
            </select>
            <button
                className="border-2 border-yellow-400 rounded-sm px-1"
            >Select</button>
        </form>
    );
}