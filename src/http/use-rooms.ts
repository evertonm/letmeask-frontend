import { useQuery } from '@tanstack/react-query';
import { fetchWithInterceptor } from '@/utils/fetch-interceptor';
import type { GetRoomsResponse } from './types/get-rooms-response';

export function useRooms() {
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetchWithInterceptor(
        'https://letmeask-backend-production.up.railway.app/rooms'
      );
      const result: GetRoomsResponse = await response.json();
      return result;
    },
  });
}
