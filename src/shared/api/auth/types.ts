export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  success?: boolean;
  message?: string;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
  data?: {
    user?: {
      id: string | number;
      username: string;
      email?: string;
    };
  };
}
