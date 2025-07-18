import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithInterceptor } from '@/utils/fetch-interceptor';
import type { CreateRoomRequest } from './types/create-room-request';
import type { CreateRoomResponse } from './types/create-room-response';

export function useCreateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      const response = await fetchWithInterceptor(
        'https://letmeask-backend-production.up.railway.app/rooms',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const result: CreateRoomResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-rooms'],
      });
    },
  });
}
