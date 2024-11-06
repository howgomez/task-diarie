import { RootState, useAppDispatch } from "../store/store";
import AuthForm from "../components/AuthForm";
import { startLoginUser } from "../store/auth/thunks";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.status === 'authenticated');
  console.log(isAuthenticated);
  
  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(startLoginUser(data));
    console.log(data);
    
  };
  if(isAuthenticated) return <Navigate to="/dashboard" />;

  return <AuthForm onSubmit={onSubmit} isLogin={true} />;
};

export default LoginPage;
