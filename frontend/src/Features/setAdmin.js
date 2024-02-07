import { createSlice } from "@reduxjs/toolkit";

export const adminDetailsSlice = createSlice({
    name: "Admin",
    initialState: {},
    reducers: {
        setAdminDEtails: (state, action) => {
            state.value = action.payload
        },
        LoginAdmin: (state, action) => {
            state.admin = action.payload;
        },
        LogoutAdmin: (state, action) => {
            state.admin = action.payload;
        }
    }
})
export const { setAdminDEtails, LoginAdmin, LogoutAdmin } = adminDetailsSlice.actions
export const selectAdmin = (state) => state.admin
export default adminDetailsSlice.reducer