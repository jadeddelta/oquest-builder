import { configureStore } from "@reduxjs/toolkit";
import currentQuestReducer from "./current-quest-slice";

export default configureStore({
    reducer: {
        currentQuest: currentQuestReducer
    },
});