import { createSlice } from "@reduxjs/toolkit";

export const ListSlice = createSlice({
    name: "list",
    initialState: {
        list: [
            { name: 'Home', path: 'home', data: [] }
        ],
    },
    reducers: {
        addListItem: (state, action) => {
            const data = { ...action.payload, data: [] };
            state.list = [...state.list, data];
        },
        removeListItem: (state, action) => {
            state.list = state.list.filter((e) => e.name !== action.payload);
        },
        addListData: (state, action) => {
            const { path, data } = action.payload;
            state.list = state.list.map(item =>
                item.path === path ? { ...item, data: [...item.data, data] } : item
            );
            const newData = { ...data, homeTag: path.toUpperCase() }
            state.list[0].data = [...state.list[0].data, newData]
        },
    },
});

export const { addListItem, removeListItem, addListData } = ListSlice.actions;

export const ListReducer = ListSlice.reducer;
