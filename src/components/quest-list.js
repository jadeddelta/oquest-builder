import { useDispatch, useSelector } from 'react-redux';
import { questToString, questsToString } from '@/utils/helpers';
import { setStartCount, removeQuest } from '@/app/all-quests-slice';

export default function QuestList() {
    const questList = useSelector((state) => state.allQuests.quests);
    const startCount = useSelector((state) => state.allQuests.startCount);

    const dispatch = useDispatch();

    return (
        <div className="h-full w-2/3 flex flex-col">
            <div className="flex flex-row justify-between items-center mb-2">
                <button
                    type="button"
                    className="border-2 border-purple-400 rounded-sm px-1"
                    onClick={() => {
                        if (questList.length === 0) {
                            alert("There are no quests to export!");
                            return;
                        }
                        const element = document.createElement("a");
                        const file = new Blob([questsToString(questList, startCount)], { type: 'text/plain' });
                        element.href = URL.createObjectURL(file);
                        element.download = "quests.yml";
                        document.body.appendChild(element);
                        element.click();
                    }}>Export</button>
                <p>Quest Count: {questList.length}</p>
                <form>
                    <label>Quests start at:</label>
                    <input
                        type="number"
                        value={startCount}
                        className="bg-black border-2 border-slate-400 rounded-sm m-1"
                        size="10"
                        onChange={(e) => {
                            dispatch(setStartCount(e.target.value));
                        }} />
                </form>
            </div>
            <div className="overflow-auto flex flex-row flex-wrap">
                {
                    //TODO: in bottom right corner, add trash icon to delete quest
                    questList.map((quest, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col justify-between text-xs border-2 border-slate-400 rounded p-2 w-5/12 mb-2 mr-4">
                                <pre className="whitespace-pre-wrap">{questToString(quest, Number(index) + Number(startCount))}</pre>
                                <div className="flex flex-row justify-end">
                                    <button
                                        className="border-2 border-red-700 rounded-sm px-1 mt-2 text-sm"
                                        onClick={(e) => {
                                            dispatch(removeQuest(index));
                                        }}>Delete</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}