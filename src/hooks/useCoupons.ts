import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { couponsApi, CouponFilters } from '@/lib/api';
import { CreateCouponInput, UpdateCouponInput } from '@/types/api';

// Query keys
export const couponKeys = {
  all: ['coupons'] as const,
  lists: () => [...couponKeys.all, 'list'] as const,
  list: (filters: CouponFilters) => [...couponKeys.lists(), filters] as const,
  details: () => [...couponKeys.all, 'detail'] as const,
  detail: (id: string) => [...couponKeys.details(), id] as const,
};

// Validate coupon (public)
export const useValidateCoupon = () => {
  return useMutation({
    mutationFn: ({ code, subtotal }: { code: string; subtotal: number }) =>
      couponsApi.validate(code, subtotal),
  });
};

// Admin: Get all coupons
export const useAdminCoupons = (filters?: CouponFilters) => {
  return useQuery({
    queryKey: couponKeys.list(filters || {}),
    queryFn: () => couponsApi.admin.getAll(filters),
  });
};

// Admin: Get single coupon
export const useAdminCoupon = (id: string) => {
  return useQuery({
    queryKey: couponKeys.detail(id),
    queryFn: () => couponsApi.admin.getById(id),
    enabled: !!id,
  });
};

// Admin: Create coupon
export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCouponInput) => couponsApi.admin.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.lists() });
    },
  });
};

// Admin: Update coupon
export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCouponInput }) =>
      couponsApi.admin.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: couponKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: couponKeys.lists() });
    },
  });
};

// Admin: Delete coupon
export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => couponsApi.admin.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.lists() });
    },
  });
};
