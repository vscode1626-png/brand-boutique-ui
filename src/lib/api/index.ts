// API Client and utilities
export { default as api, ApiError, getAuthToken, setAuthToken, removeAuthToken, isAuthenticated, uploadFiles } from './client';

// API modules
export { default as productsApi } from './products';
export { default as ordersApi } from './orders';
export { default as couponsApi } from './coupons';
export { default as authApi } from './auth';
export { default as paymentsApi, loadRazorpayScript, openRazorpayCheckout } from './payments';
export { default as homeContentApi } from './homeContent';

// Re-export types
export type * from '@/types/api';
export type { ProductFilters } from './products';
export type { OrderFilters } from './orders';
export type { CouponFilters } from './coupons';
export type { RazorpayCheckoutOptions } from './payments';
