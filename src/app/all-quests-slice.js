import { createSlice } from "@reduxjs/toolkit";

export const allQuestsSlice = createSlice({
    name: "allQuests",
    initialState: {
        quests: [],
    },
    reducers: {
        addQuest: (state, action) => {
            state.quests.push(action.payload);
        }
    }
});

export const { addQuest } = allQuestsSlice.actions;
export default allQuestsSlice.reducer;