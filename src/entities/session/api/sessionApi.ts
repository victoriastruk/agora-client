import { authApi } from '../../../shared/api/auth/auth-api';
import {
  type LoginRequest,
  type RegisterRequest,
  type AuthResponse,
} from '../../../shared/api/auth/types';

export const sessionApi = {
  getCurrentUser: () => authApi.getCurrentUser() as Promise<AuthResponse>,
  login: (credentials: LoginRequest) => authApi.login(credentials),
  logout: () => authApi.logout(),
  register: (data: RegisterRequest) => authApi.register(data),
  refresh: () => authApi.refresh(),
  getGoogleAuthUrl: () => authApi.getGoogleAuthUrl(),
  health: () => authApi.health(),
} as const;
