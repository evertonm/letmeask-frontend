import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CreateRoomForm } from '@/components/create-room-form';
import { RoomList } from '@/components/room-list';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clearAuthData, getUser } from '@/utils/auth-storage';

export function CreateRoom() {
  const user = getUser();
  const logout = clearAuthData;
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="min-h-screen">
      <div className="fixed flex h-10 w-full items-center justify-end bg-gray-900 px-4 py-6">
        <div className=" mx-4 flex h-10 cursor-pointer items-center rounded-full border border-red-100 px-2 font-semibold text-sm text-white-600 transition-all duration-300 ease-in-out hover:bg-gray-800">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <User />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>
                Olá, {user?.firstName} {user?.lastName}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem disabled>{user?.email}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-20">
        <div className="grid grid-cols-2 items-start gap-8">
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  );
}
