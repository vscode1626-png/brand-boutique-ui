import api from './client';
import {
  ApiCoupon,
  ApiResponse,
  CreateCouponInput,
  UpdateCouponInput,
  CouponValidationResult,
  PaginatedResponse,
} from '@/types/api';

export interface CouponFilters {
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export const couponsApi = {
  /**
   * Validate a coupon code (public)
   */
  validate: async (code: string, subtotal: number): Promise<ApiResponse<CouponValidationResult>> => {
    return api.post<ApiResponse<CouponValidationResult>>('/coupons/validate', { code, subtotal });
  },

  // Admin endpoints (protected)
  admin: {
    /**
     * Get all coupons
     */
    getAll: async (filters?: CouponFilters): Promise<PaginatedResponse<ApiCoupon>> => {
      return api.get<PaginatedResponse<ApiCoupon>>('/coupons', {
        params: filters as Record<string, string | number | boolean | undefined>,
        requiresAuth: true,
      });
    },

    /**
     * Get a single coupon by ID
     */
    getById: async (id: string): Promise<ApiResponse<ApiCoupon>> => {
      return api.get<ApiResponse<ApiCoupon>>(`/coupons/${id}`, { requiresAuth: true });
    },

    /**
     * Create a new coupon
     */
    create: async (data: CreateCouponInput): Promise<ApiResponse<ApiCoupon>> => {
      return api.post<ApiResponse<ApiCoupon>>('/coupons', data, { requiresAuth: true });
    },

    /**
     * Update an existing coupon
     */
    update: async (id: string, data: UpdateCouponInput): Promise<ApiResponse<ApiCoupon>> => {
      return api.put<ApiResponse<ApiCoupon>>(`/coupons/${id}`, data, { requiresAuth: true });
    },

    /**
     * Delete a coupon
     */
    delete: async (id: string): Promise<ApiResponse<null>> => {
      return api.delete<ApiResponse<null>>(`/coupons/${id}`, { requiresAuth: true });
    },
  },
};

export default couponsApi;
