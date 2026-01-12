import { apiClient } from '../client';

import type { LoginRequest, RegisterRequest, AuthResponse } from './types';

export const authApi = {
  login: (credentials: LoginRequest): Promise<AuthResponse> =>
    apiClient.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (data: RegisterRequest): Promise<AuthResponse> =>
    apiClient.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: (): Promise<{ message: string }> =>
    apiClient.request<{ message: string }>('/auth/logout', {
      method: 'POST',
    }),

  refresh: (): Promise<AuthResponse> =>
    apiClient.request<AuthResponse>('/auth/refresh', {
      method: 'POST',
    }),

  getCurrentUser: (): Promise<any> =>
    apiClient.request<any>('/me', {
      method: 'GET',
    }),

  getGoogleAuthUrl: (): Promise<{ url: string }> =>
    apiClient.request<{ url: string }>('/auth/google/url', {
      method: 'GET',
    }),

  health: (): Promise<{ message: string }> =>
    apiClient.request<{ message: string }>('/health', {
      method: 'GET',
    }),
};
