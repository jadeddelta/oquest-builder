import { createSlice } from '@reduxjs/toolkit';

export const currentQuestSlice = createSlice({
    name: 'currentQuest',
    initialState: {
        quest: {}
    },
    reducers: {
        addAttribute: (state, action) => {
            state.quest = { ...state.quest, ...action.payload }
        },
        addArrayAttribute: (state, action) => {
            state.quest[action.payload.key][action.payload.index] = action.payload.value;
            // maybe add a check condition to purge empty strings?
        },
        addArrayField: (state, action) => {
            state.quest[action.payload.key].push("");
        },
        removeArrayField: (state, action) => {
            state.quest[action.payload.key].pop();
        },
        addObjectAttribute: (state, action) => {
            state.quest[action.payload.origin] = {
                ...state.quest[action.payload.origin],
                ...{ [action.payload.key]: action.payload.value }
            };
        },
        resetQuest: state => {
            state.quest = {};
        }
    }
});

export const {
    addAttribute,
    addArrayAttribute,
    addArrayField,
    removeArrayField,
    addObjectAttribute,
    resetQuest
} = currentQuestSlice.actions;
export default currentQuestSlice.reducer;