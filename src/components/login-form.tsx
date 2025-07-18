import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { LoginResponse } from '@/http/types/login-response';
import { useLogin } from '@/http/use-login';
import { saveAuthData } from '@/utils/auth-storage';
import { Input } from './ui/input';

// Esquema de validação no mesmo arquivo conforme solicitado
const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate();

  const [hasError, setHasError] = useState(false); // Estado para controlar o erro

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function handleLogin({ username, password }: LoginFormData) {
    try {
      const response: LoginResponse = await login({ username, password });
      saveAuthData(response.token, response.refreshToken, {
        ...response.user,
        firstName: response.user.firstName, // Correcting the typo
      });
      navigate('/rooms');
      setHasError(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Usuário ou senha inválidos');
        setHasError(true);
      }
    }
  }

  return (
    <Card className={`w-96 ${hasError ? 'border-red-500' : 'border-gray-300'}`}>
      <CardHeader>
        <CardTitle>Autenticar</CardTitle>
        <CardDescription>
          Faça login para acessar sua conta e interagir com as salas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o usuário" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite sua senha"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <Loader2 className="size-6 animate-spin text-cyan-900" />
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Não possui conta?{' '}
          <Link className="no-underline hover:underline" to="/register">
            Registre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
