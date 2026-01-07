import api from './client';
import { ApiResponse, HomeContent, UpdateHomeContentInput } from '@/types/api';

export const homeContentApi = {
  /**
   * Get home page content (public)
   */
  get: async (): Promise<ApiResponse<HomeContent>> => {
    return api.get<ApiResponse<HomeContent>>('/home-content');
  },

  // Admin endpoints (protected)
  admin: {
    /**
     * Update home page content
     */
    update: async (data: UpdateHomeContentInput): Promise<ApiResponse<HomeContent>> => {
      return api.put<ApiResponse<HomeContent>>('/home-content/admin', data, { requiresAuth: true });
    },
  },
};

export default homeContentApi;
