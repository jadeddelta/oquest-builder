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
    }
});

export const { addQuest, setStartCount } = allQuestsSlice.actions;
export default allQuestsSlice.reducer;