import { AxiosError } from "axios";
import { login_request, register_request, logout_request, verify_token } from "../../api/auth";
import { AppDispatch } from "../store"
import { login, logout, checkingCredentials } from "./authSlice"
import { LoginRequest, RegisterRequest } from "../../type/auth";



export const checkingAuthentication = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startRegisterUser = ({username, email, password }: RegisterRequest) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    try {
      const response = await register_request({ username, email, password });
      const { id } = response.data;
      dispatch(login({ id, email, username }));
    } catch (error ) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data);
    
      dispatch(logout({ errorMessage: err.response?.data.message }));
      
    }
  };
};

export const startLoginUser = ({ email, password }: LoginRequest) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    try {
      const response = await login_request({ email, password });

      console.log(response.data);
      
      const { id, username } = response.data;

      dispatch(login({ id, email, username }));
    } catch (error ) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data);

      dispatch(logout({ errorMessage: err.response?.data.message }));
      
    }
  };
};

export const verifyToken = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    try {
      const response = await verify_token();

      const { id,email, username } = response.data;
      dispatch(login({ id, email, username }));

    } catch (error) {
      console.log(error);
      dispatch(logout({ errorMessage: '' }));
    }
  }
}

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    try {
      await logout_request();
      dispatch(logout({ errorMessage: '' }));

    } catch (error) {
      console.log(error);
      dispatch(logout({ errorMessage: "Logout failed" }));
    }
  }
}