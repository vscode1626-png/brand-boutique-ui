import api from './client';
import {
  ApiResponse,
  RazorpayKeyResponse,
  CreatePaymentOrderInput,
  RazorpayOrder,
  VerifyPaymentInput,
  PaymentVerificationResult,
} from '@/types/api';

export const paymentsApi = {
  /**
   * Get Razorpay publishable key
   */
  getRazorpayKey: async (): Promise<ApiResponse<RazorpayKeyResponse>> => {
    return api.get<ApiResponse<RazorpayKeyResponse>>('/payments/razorpay-key');
  },

  /**
   * Create a Razorpay order for payment
   */
  createOrder: async (data: CreatePaymentOrderInput): Promise<ApiResponse<RazorpayOrder>> => {
    return api.post<ApiResponse<RazorpayOrder>>('/payments/create-order', data);
  },

  /**
   * Verify payment after Razorpay callback
   */
  verifyPayment: async (data: VerifyPaymentInput): Promise<ApiResponse<PaymentVerificationResult>> => {
    return api.post<ApiResponse<PaymentVerificationResult>>('/payments/verify', data);
  },
};

// Razorpay script loader
let razorpayLoaded = false;

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (razorpayLoaded) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      razorpayLoaded = true;
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Razorpay checkout options type
export interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
}

// Open Razorpay checkout
export const openRazorpayCheckout = (options: RazorpayCheckoutOptions): void => {
  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();
};

export default paymentsApi;
