import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { PrivateRoute, PublicRoute } from './components/routes';
import { CreateRoom } from './pages/create-room';
import { Login } from './pages/login';
import { RecordRoomAudio } from './pages/record-room-audio';
import { Register } from './pages/register';
import { Room } from './pages/room';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route element={<PublicRoute />}>
            <Route element={<Login />} index />
            <Route element={<Register />} path="register" />
          </Route>

          {/* Rotas privadas */}
          <Route element={<PrivateRoute />}>
            <Route element={<CreateRoom />} path="/rooms" />
            <Route element={<Room />} path="/room/:roomId" />
            <Route element={<RecordRoomAudio />} path="/room/:roomId/audio" />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
