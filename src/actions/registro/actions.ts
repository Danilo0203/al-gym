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
