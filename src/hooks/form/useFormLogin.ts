import { login } from '@/app/auth/_actions';
import { loginSchema, LoginSchema } from '@/schema/auth/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useFormLogin = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur'
  });

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: LoginSchema) => {
    const response = await login(data);
    if (response.error) {
      if (response.error === 'Invalid login credentials') {
        setErrorMessage('Correo o contraseña incorrectos');
      } else {
        setErrorMessage(response.error);
      }
    }
  };

  return { form, onSubmit, errorMessage };
};
