import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, HomePage } from "../pages";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { RootState, useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyToken } from "../store/auth/thunks";
import TaskPage from "../pages/tasks/TaskPage";
const AppRoutes = () => {

  
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.status === 'authenticated');

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return ( 
    <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!isAuthenticated ? <div className="w-full sm:w-[500px] m-auto bg-black/40 h-[600px] flex flex-col justify-center items-center mt-20"><LoginPage /></div> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <div className="w-full sm:w-[500px] m-auto bg-black/40 h-[600px] flex flex-col justify-center items-center mt-20"><RegisterPage /></div> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard/task/:id" element={isAuthenticated ? <TaskPage /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default AppRoutes;