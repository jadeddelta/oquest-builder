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
        allowMultiple: (state, action) => {
            if (state.quest[action.payload.key] === undefined) {
                state.quest[action.payload.key] = ["", ""];
                return;
            }
            state.quest[action.payload.key] = [state.quest[action.payload.key], ""];
        },
        disallowMultiple: (state, action) => {
            state.quest[action.payload.key] = state.quest[action.payload.key][0];
        },
        resetQuest: state => {
            state.quest = {
                description: [],
            };
        }
    }
});

export const {
    addAttribute,
    addArrayAttribute,
    addArrayField,
    removeArrayField,
    addObjectAttribute,
    resetQuest,
    allowMultiple,
    disallowMultiple,
} = currentQuestSlice.actions;
export default currentQuestSlice.reducer;