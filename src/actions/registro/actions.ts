'use server';
import { nuevoClienteType } from '@/schema/registro/nuevo-cliente.schema';
import { supabaseAdmin } from '@/utils/supabase/admin';
export async function newClient(formData: nuevoClienteType) {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase.auth.admin.createUser({
    phone: formData.telefono.toString(),
    password: 'gym@2025',
    user_metadata: {
      display_name: formData.nombre
    }
  });
  if (data?.user?.id) {
    const userID = data.user.id;
    await supabase.from('usuarios').insert({
      userID,
      fechaNacimiento: formData.fechaNacimiento,
      sexo: formData.sexo,
      estatura: formData.estatura,
      peso: formData.peso,
      tipoCuerpo: formData.tipoCuerpo,
      inscripcion: formData.inscripcion,
      plan: formData.plan,
      valor: formData.valor,
      fechaInicio: formData.fechaInicio,
      descuento: formData.descuento,
      diasPorSemana: formData.diasPorSemana
    });
  }
  if (error) {
    // console.log(error);
    return error;
  }
}

type UpdateClienteInput = nuevoClienteType & { userID: string }; // viene del backend

export async function updateClient(payload: UpdateClienteInput) {
  const supabase = supabaseAdmin;
  // console.log({ payload });
  /* ---------- 1. Actualizar el usuario en auth ---------- */
  // (solo si cambian teléfono, nombre o password)
  // 1. Actualizar número de teléfono con RPC
  const { error: phoneError } = await supabase.rpc('actualizar_telefono', {
    uid: payload.userID,
    nuevo_telefono: payload.telefono.toString()
  });
  if (phoneError) return phoneError;
  // 2. Actualizar metadata como nombre de usuario
  const { error: metaError } = await supabase.auth.admin.updateUserById(
    payload.userID,
    {
      user_metadata: {
        display_name: payload.nombre
      }
    }
  );
  if (metaError) return metaError;

  /* ---------- 2. Actualizar la fila en tu tabla ---------- */
  const { data, error: rowError } = await supabase
    .from('usuarios')
    .update({
      fechaNacimiento: payload.fechaNacimiento,
      sexo: payload.sexo,
      estatura: payload.estatura,
      peso: payload.peso,
      tipoCuerpo: payload.tipoCuerpo,
      inscripcion: payload.inscripcion,
      plan: payload.plan,
      valor: payload.valor,
      fechaInicio: payload.fechaInicio,
      descuento: payload.descuento,
      diasPorSemana: payload.diasPorSemana
    })
    .eq('userID', payload.userID) // 👈 filtro obligatorio
    .select() // para devolver la fila actualizada
    .single();

  if (rowError) return rowError;
  return data; // ← fila nueva/actualizada
}
