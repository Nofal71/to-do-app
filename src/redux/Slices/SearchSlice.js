import { createSlice } from "@reduxjs/toolkit";

export const SearchSlice = createSlice({
    name: 'search',
    initialState: {
        search: ''
    },
    reducers: {
        setSearchInput: (state, action) => {
            state.search = action.payload
        }
    }
})

export const { setSearchInput } = SearchSlice.actions;

export const SearchReducer = SearchSlice.reducer;
