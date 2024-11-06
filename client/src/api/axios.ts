import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL_BACKEND; //example http://localhost:3000/api/auth

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export default axiosInstance

