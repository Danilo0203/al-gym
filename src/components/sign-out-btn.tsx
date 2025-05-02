import { logout } from '@/app/auth/_actions';
import { Button } from './ui/button';

export default function SignOutBtn() {
  return (
    <form action={logout}>
      <Button type='submit'>Cerrar sesión</Button>
    </form>
  );
}
