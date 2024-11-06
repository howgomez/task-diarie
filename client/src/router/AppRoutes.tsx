import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, HomePage } from "../pages";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { RootState, useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyToken } from "../store/auth/thunks";
const AppRoutes = () => {

  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.status === 'authenticated');

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return ( 
    <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default AppRoutes;