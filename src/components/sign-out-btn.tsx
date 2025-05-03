import { logout } from '@/app/auth/_actions';
import { Button } from './ui/button';
import { IconLogout } from '@tabler/icons-react';

export default function SignOutBtn() {
  return (
    <form action={logout} className='flex items-center gap-2'>
      <IconLogout className='mr-2 h-4 w-4' />
      <Button type='submit' variant='ghost'>
        Cerrar sesión
      </Button>
    </form>
  );
}
