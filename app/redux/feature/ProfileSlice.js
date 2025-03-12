"use client";
import instance from "@/app/common/service/Instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getProfile = createAsyncThunk("getProfile", async () => {

    const response = await instance.get(`me`)
    return response.data
})

const profileSlice = createSlice({
    name: "profileSlice",
    initialState: {
        profileData: [],
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builders) => {
        builders
            .addCase(getProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getProfile.fulfilled, (state ,action) => {
                state.profileData = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getProfile.rejected, (state) => {
                state.loading = false
                state.error = null
            })
    }
})

export default profileSlice.reducer