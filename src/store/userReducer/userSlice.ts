import { createSlice } from "@reduxjs/toolkit";
import { Iuser } from "../../types";
import { userLogin, userRegister } from "./userApi";

export interface IinitialState {
  user: Iuser | null;
  userLoginStatus: "idle" | "pending" | "success" | "rejected";
  userSignupStatus: "idle" | "pending" | "success" | "rejected";
}

export const initialState: IinitialState = {
  user: null,
  userLoginStatus: "idle",
  userSignupStatus: "idle",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userLoginStatus = "success";
        state.user = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.userLoginStatus = "pending";
      })
      .addCase(userLogin.rejected, (state) => {
        state.userLoginStatus = "rejected";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.userSignupStatus = "success";
        state.user = action.payload;
      })
      .addCase(userRegister.pending, (state) => {
        state.userSignupStatus = "pending";
      })
      .addCase(userRegister.rejected, (state) => {
        state.userSignupStatus = "rejected";
      });
  },
});

export default userSlice.reducer;
export const { userLogout } = userSlice.actions;
