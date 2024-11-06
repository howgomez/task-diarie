import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { useDispatch } from "react-redux";
import  taskSlice from "./tasks/taskSlice";

export const store = configureStore({
  reducer: { auth: authSlice.reducer, task: taskSlice.reducer },
  
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();