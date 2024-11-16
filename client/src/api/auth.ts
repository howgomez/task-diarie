import axios from "./axios";


export const register_request = async ( data: { username: string, email: string, password: string } ) => {
  const { username, email, password } = data;
  return await axios.post(`/api/auth/register`, { username, email, password }, { withCredentials: true })
}

export const login_request  = async ( data: { email: string, password: string } ) => {
  return await axios.post(`/api/auth/login`, data, { withCredentials: true })
}

export const logout_request = async () => {
  return await axios.post(`/api/auth/logout`, {}, { withCredentials: true })
}

export const verify_token = async () => {
  return await axios.get(`/api/auth/verify`, { withCredentials: true })
}