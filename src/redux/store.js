import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userANDjob/userSlice";
import jobSlice from "./userANDjob/jobSlice";

export const store = configureStore({
  reducer: {
    // chứa toàn bộ state của ứng dụng
    userReducer: userSlice,
    jobReducer: jobSlice,
  },
});
