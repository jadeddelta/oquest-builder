import { useSelector } from 'react-redux';
import { questToString } from '@/utils/helpers';

export default function QuestList() {
    const questList = useSelector((state) => state.allQuests.quests);
    const startCount = useSelector((state) => state.allQuests.startCount);

    return (
        <div className="h-full w-2/3 flex flex-col">
            <p className="mb-2">Quest Count: {questList.length}</p>
            <div className="overflow-auto flex flex-row flex-wrap">
                {
                    questList.map((quest, index) => {
                        return (
                            <div key={index} className="text-xs border-2 border-slate-400 rounded p-2 w-5/12 mb-2 mr-2">
                                <pre className="whitespace-pre-wrap">{questToString(quest, index + startCount)}</pre>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}