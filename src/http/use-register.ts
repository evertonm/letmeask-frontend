import { useMutation } from '@tanstack/react-query';
import type { RegisterResponse } from './types/register-response';

interface RegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      try {
        const response = await fetch(
          'https://letmeask-backend-production.up.railway.app/users/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );
        if (response.status !== 201) {
          throw new Error(await response.text());
        }
        const result: RegisterResponse = await response.json();
        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
  });
}
