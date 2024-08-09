import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    load: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        signInStart: (state) => {
            state.load = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;  
            state.load = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.load = false;
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
    },
});

export const { signInStart, signInFailure, signInSuccess ,updateUserFailure,updateUserStart,updateUserSuccess } = userSlice.actions;

export default userSlice.reducer;