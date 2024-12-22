import { createSlice } from "@reduxjs/toolkit";

const connectionslice = createSlice({
    name: 'connection',
    initialState: [],
    reducers:{
        addconnections: (state, action) => action.payload,
        removeconnections: () => null,
    },
});

export const {addconnections, removeconnections} = connectionslice.actions;

export default connectionslice.reducer;