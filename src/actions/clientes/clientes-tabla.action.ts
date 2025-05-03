'use server';

import { calcularFechaFin } from '@/lib/calcular-fecha-plan';
import { supabaseAdmin } from '@/utils/supabase/admin';
import { isAfter } from 'date-fns';

export async function getClientes(params: {
  page: number;
  limit: number;
  search?: string;
  sort?: { id: string; desc: boolean }[];
  estado?: string;
}) {
  const supabase = supabaseAdmin;

  // ---------- 1. build the base query ----------
  let query = supabase
    .from('tabla_clientes')
    // ask Supabase to calculate the total that *ignores* range/limit
    .select('*', { count: 'exact' });

  // search
  if (params.search) {
    query = query.ilike('nombre', `%${params.search}%`);
  }

  if (params.estado) {
    query = query.eq('estado', params.estado);
  }

  // sort
  if (params.sort) {
    params.sort.forEach(
      ({ id, desc }) => (query = query.order(id, { ascending: !desc }))
    );
  }

  // ---------- 2. add pagination ----------
  const from = (params.page - 1) * params.limit;
  const to = from + params.limit - 1;
  query = query.range(from, to);

  // ---------- 3. run it ----------
  const { data, count, error } = await query;

  // ---------- 4. post‑process ----------
  const usuarios = (data ?? []).map((u) => {
    const vencido = isAfter(
      new Date(),
      calcularFechaFin(u.plan, u.fechaInicio)
    );
    return { ...u, estado: vencido ? '0' : '1' };
  });

  // update estados in parallel (non‑blocking for speed)
  Promise.all(
    usuarios.map((u) =>
      supabaseAdmin.from('usuarios').update({ estado: u.estado }).eq('id', u.id)
    )
  );

  return { data: usuarios, count, error };
}
