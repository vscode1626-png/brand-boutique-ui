import api, { setAuthToken, removeAuthToken, getAuthToken } from './client';
import { AdminUser, AuthResponse, LoginCredentials, ApiResponse } from '@/types/api';

export const authApi = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.success && response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<ApiResponse<AdminUser>> => {
    return api.get<ApiResponse<AdminUser>>('/auth/me', { requiresAuth: true });
  },

  /**
   * Logout - clear local token
   */
  logout: (): void => {
    removeAuthToken();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },

  /**
   * Get stored auth token
   */
  getToken: (): string | null => {
    return getAuthToken();
  },
};

export default authApi;
