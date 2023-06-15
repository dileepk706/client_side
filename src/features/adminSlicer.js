import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isAdmin:false
}
const adminSlicer=createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        isAdmin:(state,action)=>{
            console.log('action.payload',action.payload);
            state.isAdmin=action.payload
        },
        logoutAdmin:(state,action)=>{
            localStorage.removeItem('adminToken')
            state.isAdmin=false
        }
    }
})



export default adminSlicer.reducer
export const {isAdmin,logoutAdmin}=adminSlicer.actions