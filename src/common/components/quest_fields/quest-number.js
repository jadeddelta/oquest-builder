import { addAttribute } from "@/common/redux/current-quest-slice";
import { useDispatch } from "react-redux";

export default function QuestNumber({ questKey, index }) {
    const dispatch = useDispatch();

    return (
        <>
            <label htmlFor={questKey + index}>{questKey}:</label>
            <input
                type="number"
                size="8"
                name={questKey + index}
                id={questKey + index}
                key={questKey}
                className="bg-black border-2 border-slate-400 rounded-sm m-1"
                onChange={(e) => {
                    dispatch(addAttribute({ [questKey]: e.target.value }));
                }}
            />
            <br />
        </>
    );
}