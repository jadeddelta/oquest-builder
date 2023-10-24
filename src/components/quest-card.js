import QuestForm from "./quest-form";
import QuestList from "./quest-list";

export default function QuestCard() {
    return (
        <div className="flex flex-row items-center justify-between w-full h-full">
            <QuestForm />
            <QuestList />
        </div>
    );
}