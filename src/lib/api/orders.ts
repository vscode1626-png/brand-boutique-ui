import api from './client';
import {
  ApiOrder,
  ApiResponse,
  CreateOrderInput,
  UpdateOrderStatusInput,
  PaginatedResponse,
  OrderStatus,
  PaymentStatus,
} from '@/types/api';

export interface OrderFilters {
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'totalAmount';
  sortOrder?: 'asc' | 'desc';
}

export const ordersApi = {
  /**
   * Create a new order (public)
   */
  create: async (data: CreateOrderInput): Promise<ApiResponse<ApiOrder>> => {
    return api.post<ApiResponse<ApiOrder>>('/orders', data);
  },

  /**
   * Get order by invoice number (public)
   */
  getByInvoice: async (invoiceNumber: string): Promise<ApiResponse<ApiOrder>> => {
    return api.get<ApiResponse<ApiOrder>>(`/orders/invoice/${invoiceNumber}`);
  },

  // Admin endpoints (protected)
  admin: {
    /**
     * Get all orders with filtering
     */
    getAll: async (filters?: OrderFilters): Promise<PaginatedResponse<ApiOrder>> => {
      return api.get<PaginatedResponse<ApiOrder>>('/orders', {
        params: filters as Record<string, string | number | boolean | undefined>,
        requiresAuth: true,
      });
    },

    /**
     * Get a single order by ID
     */
    getById: async (id: string): Promise<ApiResponse<ApiOrder>> => {
      return api.get<ApiResponse<ApiOrder>>(`/orders/${id}`, { requiresAuth: true });
    },

    /**
     * Update order status
     */
    updateStatus: async (id: string, data: UpdateOrderStatusInput): Promise<ApiResponse<ApiOrder>> => {
      return api.put<ApiResponse<ApiOrder>>(`/orders/${id}/status`, data, { requiresAuth: true });
    },

    /**
     * Cancel an order
     */
    cancel: async (id: string): Promise<ApiResponse<ApiOrder>> => {
      return api.put<ApiResponse<ApiOrder>>(`/orders/${id}/cancel`, {}, { requiresAuth: true });
    },

    /**
     * Get order statistics (for dashboard)
     */
    getStats: async (): Promise<ApiResponse<{
      totalOrders: number;
      totalRevenue: number;
      pendingOrders: number;
      todayOrders: number;
    }>> => {
      return api.get('/orders/stats', { requiresAuth: true });
    },
  },
};

export default ordersApi;
