'use server';

import { supabaseAdmin } from '@/utils/supabase/admin';

export const getCliente = async (clienteId: string) => {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase
    .from('tabla_clientes')
    .select('*')
    .eq('id', clienteId);
  return { data, error };
};
