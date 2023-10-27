import { createSlice } from "@reduxjs/toolkit";

export const allQuestsSlice = createSlice({
    name: "allQuests",
    initialState: {
        quests: [],
        startCount: 1,
    },
    reducers: {
        addQuest: (state, action) => {
            state.quests.push(action.payload);
        },
        setStartCount: (state, action) => {
            state.startCount = action.payload;
        },
        removeQuest: (state, action) => {
            state.quests.splice(action.payload, 1);
        }
    }
});

export const { addQuest, setStartCount, removeQuest } = allQuestsSlice.actions;
export default allQuestsSlice.reducer;