'use server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginSchema } from '@/schema/auth/login.schema';

export async function login(formData: LoginSchema) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return { error: error.message };
  }

  redirect('/panel/overview');
}

export async function logout() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  await supabase.auth.signOut(); // borra cookie sb:token
  redirect('/auth/sign-in'); // vuelve al inicio
}
