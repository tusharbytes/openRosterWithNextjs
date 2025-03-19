"use client"
import profileSlice from "../redux/feature/ProfileSlice"

const { configureStore } = require("@reduxjs/toolkit")

  

const store = configureStore({
    reducer:{
        profile:profileSlice
    }
})
export default store