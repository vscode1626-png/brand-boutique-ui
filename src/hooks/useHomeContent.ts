import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { homeContentApi } from '@/lib/api';
import { UpdateHomeContentInput } from '@/types/api';

// Query keys
export const homeContentKeys = {
  all: ['home-content'] as const,
};

// Get home content (public)
export const useHomeContent = () => {
  return useQuery({
    queryKey: homeContentKeys.all,
    queryFn: () => homeContentApi.get(),
  });
};

// Admin: Update home content
export const useUpdateHomeContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateHomeContentInput) => homeContentApi.admin.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: homeContentKeys.all });
    },
  });
};
