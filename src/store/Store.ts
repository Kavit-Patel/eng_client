import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer/userSlice";
import gptReducer from "./gptReducer/gptSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tset: gptReducer,
  },
});

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
