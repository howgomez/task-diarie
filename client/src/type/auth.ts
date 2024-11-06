
export interface LoginRequest {
  id: string;
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
}