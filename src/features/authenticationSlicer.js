import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLogin: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isLogin: (state, action) => {
            const token = localStorage.getItem('token')
            token ? state.isLogin = true : state.isLogin = false
            // console.log(action.payload);
            // state.isLogin=action.payload
        },
        logout: (state, action) => {
            localStorage.removeItem('token')
            state.isLogin=false
        }
    }
})

export default authSlice.reducer
export const { isLogin ,logout} = authSlice.actions