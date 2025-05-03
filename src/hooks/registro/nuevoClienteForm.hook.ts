import { newClient } from '@/actions/registro/actions';
import { useQueryCliente } from '@/hooks/cliente/useQueryCliente';
import {
  NuevoClienteSchema,
  nuevoClienteType
} from '@/schema/registro/nuevo-cliente.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useEffect } from 'react';

export const useNuevoClienteForm = (
  onSuccess?: () => void,
  clienteId?: string
) => {
  const { queryCliente } = useQueryCliente(clienteId);
  const cliente = queryCliente.data?.data?.[0];
  const date = new Date();
  const form = useForm<nuevoClienteType>({
    resolver: zodResolver(NuevoClienteSchema),
    defaultValues: {
      nombre: '',
      telefono: undefined,
      fechaNacimiento: undefined,
      sexo: undefined,
      estatura: undefined,
      peso: undefined,
      tipoCuerpo: undefined,
      inscripcion: date,
      plan: undefined,
      valor: undefined,
      fechaInicio: date,
      descuento: undefined,
      total: undefined,
      diasPorSemana: undefined
    },
    mode: 'onChange'
  });
  console.log(cliente);
  useEffect(() => {
    if (cliente) {
      form.reset({
        nombre: cliente.nombre ?? '',
        telefono: cliente.telefono ?? undefined,
        fechaNacimiento:  cliente.fechaNacimiento ?? undefined,
        sexo: cliente.sexo ?? undefined,
        estatura: cliente.estatura ?? undefined,
        peso: cliente.peso ?? undefined,
        tipoCuerpo: cliente.tipoCuerpo ?? undefined,
        inscripcion: cliente.inscripcion ?? date,
        plan: cliente.plan ?? undefined,
        valor: cliente.valor ?? undefined,
        fechaInicio: cliente.fechaInicio ?? date,
        descuento: cliente.descuento ?? undefined,
        total: cliente.total ?? undefined,
        diasPorSemana: cliente.diasPorSemana ?? undefined
      });
    }
  }, [cliente, form, date]);

  const onSumbit = async (data: nuevoClienteType) => {
    const error = await newClient(data);
    if (error) {
      if (
        error.message.includes(
          'Phone number already registered by another user'
        )
      ) {
        toast.error(
          'El número de teléfono ya está registrado por otro usuario',
          {
            position: 'top-right'
          }
        );
      }
    } else {
      toast.success('Cliente creado correctamente', {
        position: 'top-right'
      });
      form.reset();
      if (onSuccess) onSuccess();
    }
  };
  return { form, onSumbit, reset: form.reset };
};
