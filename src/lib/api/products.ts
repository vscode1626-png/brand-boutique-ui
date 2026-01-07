import api, { uploadFiles } from './client';
import {
  ApiProduct,
  ApiResponse,
  CreateProductInput,
  UpdateProductInput,
  StockCheckResult,
  PaginatedResponse,
  ProductCategory,
} from '@/types/api';

export interface ProductFilters {
  category?: ProductCategory;
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// Public endpoints
export const productsApi = {
  /**
   * Get all products with optional filtering
   */
  getAll: async (filters?: ProductFilters): Promise<PaginatedResponse<ApiProduct>> => {
    return api.get<PaginatedResponse<ApiProduct>>('/products', {
      params: filters as Record<string, string | number | boolean | undefined>,
    });
  },

  /**
   * Get a single product by ID
   */
  getById: async (id: string): Promise<ApiResponse<ApiProduct>> => {
    return api.get<ApiResponse<ApiProduct>>(`/products/${id}`);
  },

  /**
   * Check stock for a specific product size
   */
  checkStock: async (productId: string, size: string): Promise<ApiResponse<StockCheckResult>> => {
    return api.get<ApiResponse<StockCheckResult>>(`/products/${productId}/stock/${size}`);
  },

  // Admin endpoints (protected)
  admin: {
    /**
     * Create a new product
     */
    create: async (data: CreateProductInput): Promise<ApiResponse<ApiProduct>> => {
      return api.post<ApiResponse<ApiProduct>>('/products', data, { requiresAuth: true });
    },

    /**
     * Update an existing product
     */
    update: async (id: string, data: UpdateProductInput): Promise<ApiResponse<ApiProduct>> => {
      return api.put<ApiResponse<ApiProduct>>(`/products/${id}`, data, { requiresAuth: true });
    },

    /**
     * Delete a product
     */
    delete: async (id: string): Promise<ApiResponse<null>> => {
      return api.delete<ApiResponse<null>>(`/products/${id}`, { requiresAuth: true });
    },

    /**
     * Upload product images
     */
    uploadImages: async (files: File[]): Promise<{ success: boolean; urls: string[] }> => {
      return uploadFiles('/upload', files, 'images');
    },

    /**
     * Update product stock for a specific size
     */
    updateStock: async (
      id: string,
      size: string,
      quantity: number
    ): Promise<ApiResponse<ApiProduct>> => {
      return api.patch<ApiResponse<ApiProduct>>(
        `/products/${id}/stock`,
        { size, quantity },
        { requiresAuth: true }
      );
    },
  },
};

export default productsApi;
