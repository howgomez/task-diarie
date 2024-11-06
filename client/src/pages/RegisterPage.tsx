import React from "react";
import { useAppDispatch } from "../store/store";
import { startRegisterUser } from "../store/auth/thunks";
import AuthForm from "../components/AuthForm";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (data: { username: string; email: string; password: string }) => {
    dispatch(startRegisterUser(data));
    console.log(data);
    
  };

  return <AuthForm onSubmit={onSubmit} isLogin={false} />;
};

export default RegisterPage;
