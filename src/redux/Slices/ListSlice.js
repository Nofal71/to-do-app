import { createSlice } from "@reduxjs/toolkit";

export const ListSlice = createSlice({
    name: 'list',
    initialState: {
        list: []
    },
    reducers: {
        addListItem: (state, action) => {
            state.list.push(action.payload)
        },
        removeListItem: (state, action) => {
            return state.filter((e) => e.name !== action.payload());
        }
    }
});

export const { addListItem, removeListItem } = ListSlice.actions;

export const ListReducer = ListSlice.reducer;
