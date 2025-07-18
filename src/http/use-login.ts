import { useMutation } from '@tanstack/react-query';
import type { LoginRequest } from './types/login-request';
import type { LoginResponse } from './types/login-response';

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      try {
        const response = await fetch('http://localhost:3333/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        const result: LoginResponse = await response.json();

        return result;
      } catch (error) {
        throw new Error(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        );
      }
    },
  });
}
