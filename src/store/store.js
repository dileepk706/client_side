import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authenticationSlicer"
import adminSlice from "../features/adminSlicer"

const store=configureStore({
    reducer:{
        auth:authSlice,
        adminAuth:adminSlice
    }
})

export default store