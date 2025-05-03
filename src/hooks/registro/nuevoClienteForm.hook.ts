import { newClient } from '@/actions/registro/actions';
import {
  NuevoClienteSchema,
  nuevoClienteType
} from '@/schema/registro/nuevo-cliente.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useMemo } from 'react';

export const useNuevoClienteForm = (onSuccess?: () => void, cliente?: any) => {
  const date = useMemo(() => new Date(), []);
  const form = useForm<nuevoClienteType>({
    resolver: zodResolver(NuevoClienteSchema),
    defaultValues: {
      nombre: cliente?.nombre ?? '',
      telefono: cliente?.phone ?? undefined,
      fechaNacimiento: cliente?.fechaNacimiento
        ? new Date(cliente.fechaNacimiento)
        : undefined,
      sexo: cliente?.sexo ?? undefined,
      estatura: cliente?.estatura ?? undefined,
      peso: cliente?.peso ?? undefined,
      tipoCuerpo: cliente?.tipoCuerpo ?? '',
      inscripcion: date,
      plan: cliente?.plan ?? undefined,
      valor: cliente?.valor ?? undefined,
      fechaInicio: date,
      descuento: cliente?.descuento ?? undefined,
      total: cliente?.total ?? undefined,
      diasPorSemana: cliente?.diasPorSemana ?? undefined,
      estado: cliente?.estado ?? undefined
    },
    mode: 'onChange'
  });

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
