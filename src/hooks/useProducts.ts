import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi, ProductFilters } from '@/lib/api';
import { CreateProductInput, UpdateProductInput } from '@/types/api';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  stock: (id: string, size: string) => [...productKeys.all, 'stock', id, size] as const,
};

// Fetch all products
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: productKeys.list(filters || {}),
    queryFn: () => productsApi.getAll(filters),
  });
};

// Fetch single product
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};

// Check product stock
export const useProductStock = (productId: string, size: string) => {
  return useQuery({
    queryKey: productKeys.stock(productId, size),
    queryFn: () => productsApi.checkStock(productId, size),
    enabled: !!productId && !!size,
  });
};

// Admin: Create product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductInput) => productsApi.admin.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

// Admin: Update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductInput }) =>
      productsApi.admin.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

// Admin: Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsApi.admin.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

// Admin: Upload images
export const useUploadProductImages = () => {
  return useMutation({
    mutationFn: (files: File[]) => productsApi.admin.uploadImages(files),
  });
};
