import { useQuery, useMutation } from '@tanstack/react-query';
import { paymentsApi, loadRazorpayScript, openRazorpayCheckout, RazorpayCheckoutOptions } from '@/lib/api';
import { CreatePaymentOrderInput, VerifyPaymentInput } from '@/types/api';
import { useState, useCallback } from 'react';

// Query keys
export const paymentKeys = {
  razorpayKey: ['razorpay-key'] as const,
};

// Get Razorpay key
export const useRazorpayKey = () => {
  return useQuery({
    queryKey: paymentKeys.razorpayKey,
    queryFn: () => paymentsApi.getRazorpayKey(),
    staleTime: Infinity, // Key doesn't change often
  });
};

// Create payment order
export const useCreatePaymentOrder = () => {
  return useMutation({
    mutationFn: (data: CreatePaymentOrderInput) => paymentsApi.createOrder(data),
  });
};

// Verify payment
export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: (data: VerifyPaymentInput) => paymentsApi.verifyPayment(data),
  });
};

// Full Razorpay checkout flow hook
export const useRazorpayCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: keyData } = useRazorpayKey();
  const createOrder = useCreatePaymentOrder();
  const verifyPayment = useVerifyPayment();

  const initiatePayment = useCallback(
    async ({
      amount,
      orderId,
      customerName,
      customerPhone,
      onSuccess,
      onFailure,
    }: {
      amount: number;
      orderId: string;
      customerName?: string;
      customerPhone?: string;
      onSuccess: (paymentData: VerifyPaymentInput) => void;
      onFailure: (error: string) => void;
    }) => {
      setIsLoading(true);
      setError(null);

      try {
        // Load Razorpay script
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          throw new Error('Failed to load Razorpay SDK');
        }

        // Get Razorpay key
        const key = keyData?.data?.key;
        if (!key) {
          throw new Error('Razorpay key not available');
        }

        // Create Razorpay order
        const orderResponse = await createOrder.mutateAsync({ amount, orderId });
        if (!orderResponse.success || !orderResponse.data) {
          throw new Error('Failed to create payment order');
        }

        const razorpayOrder = orderResponse.data;

        // Open Razorpay checkout
        const options: RazorpayCheckoutOptions = {
          key,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'RICH CLUB',
          description: `Order #${orderId}`,
          order_id: razorpayOrder.id,
          prefill: {
            name: customerName,
            contact: customerPhone,
          },
          theme: {
            color: '#2C2C2C',
          },
          handler: async (response) => {
            try {
              // Verify payment
              const verificationData: VerifyPaymentInput = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId,
              };

              const verifyResponse = await verifyPayment.mutateAsync(verificationData);
              
              if (verifyResponse.success) {
                onSuccess(verificationData);
              } else {
                onFailure('Payment verification failed');
              }
            } catch (err: any) {
              onFailure(err.message || 'Payment verification failed');
            }
          },
        };

        openRazorpayCheckout(options);
      } catch (err: any) {
        const errorMessage = err.message || 'Payment initiation failed';
        setError(errorMessage);
        onFailure(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [keyData, createOrder, verifyPayment]
  );

  return {
    initiatePayment,
    isLoading: isLoading || createOrder.isPending || verifyPayment.isPending,
    error,
  };
};
