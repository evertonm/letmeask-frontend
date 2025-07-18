import { useQuery } from '@tanstack/react-query';
import { fetchWithInterceptor } from '@/utils/fetch-interceptor';
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response';

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetchWithInterceptor(
        `https://letmeask-backend-production.up.railway.app/rooms/${roomId}/questions`
      );
      const result: GetRoomQuestionsResponse = await response.json();
      return result;
    },
  });
}
