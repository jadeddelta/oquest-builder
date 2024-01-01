import { configureStore } from "@reduxjs/toolkit";
import currentQuestReducer from "./current-quest-slice";
import allQuestsReducer from "./all-quests-slice";

export default configureStore({
    reducer: {
        currentQuest: currentQuestReducer,
        allQuests: allQuestsReducer,
    },
});