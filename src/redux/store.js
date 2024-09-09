import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userANDjob/userSlice";
import jobSlice from "./userANDjob/jobSlice";
import loadingSlice from "./loading/loadingSlice";

export const store = configureStore({
  reducer: {
    // chứa toàn bộ state của ứng dụng
    userReducer: userSlice,
    jobReducer: jobSlice,
    loadingReducer:loadingSlice,
  },
});
