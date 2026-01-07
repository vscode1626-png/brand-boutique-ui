import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi, OrderFilters } from '@/lib/api';
import { CreateOrderInput, UpdateOrderStatusInput } from '@/types/api';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters: OrderFilters) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  invoice: (invoiceNumber: string) => [...orderKeys.all, 'invoice', invoiceNumber] as const,
  stats: () => [...orderKeys.all, 'stats'] as const,
};

// Create order (public)
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: CreateOrderInput) => ordersApi.create(data),
  });
};

// Get order by invoice (public)
export const useOrderByInvoice = (invoiceNumber: string) => {
  return useQuery({
    queryKey: orderKeys.invoice(invoiceNumber),
    queryFn: () => ordersApi.getByInvoice(invoiceNumber),
    enabled: !!invoiceNumber,
  });
};

// Admin: Get all orders
export const useAdminOrders = (filters?: OrderFilters) => {
  return useQuery({
    queryKey: orderKeys.list(filters || {}),
    queryFn: () => ordersApi.admin.getAll(filters),
  });
};

// Admin: Get single order
export const useAdminOrder = (id: string) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersApi.admin.getById(id),
    enabled: !!id,
  });
};

// Admin: Get order stats
export const useOrderStats = () => {
  return useQuery({
    queryKey: orderKeys.stats(),
    queryFn: () => ordersApi.admin.getStats(),
  });
};

// Admin: Update order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderStatusInput }) =>
      ordersApi.admin.updateStatus(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.stats() });
    },
  });
};

// Admin: Cancel order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ordersApi.admin.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.stats() });
    },
  });
};
