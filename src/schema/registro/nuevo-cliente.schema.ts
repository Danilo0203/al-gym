import { z } from 'zod';

export const NuevoClienteSchema = z
  .object({
    nombre: z
      .string({
        required_error: 'Campo requerido',
        invalid_type_error: 'El nombre debe ser un texto'
      })
      .min(1, { message: 'Campo requerido' }),
    telefono: z
      .number({
        required_error: 'Campo requerido',
        invalid_type_error: 'Debe ser un número'
      })
      .refine((val) => val.toString().length === 8, {
        message: 'Debe tener exactamente 8 dígitos'
      }),
    fechaNacimiento: z.date({
      required_error: 'Campo requerido',
      invalid_type_error: 'La fecha de nacimiento debe ser una fecha'
    }),
    sexo: z.enum(['m', 'f'], {
      required_error: 'Campo requerido',
      invalid_type_error: 'El sexo debe ser Masculino o Femenino'
    }),
    estatura: z.number({
      required_error: 'Campo requerido',
      invalid_type_error: 'La estatura debe ser un número'
    }),
    peso: z.number({
      required_error: 'Campo requerido',
      invalid_type_error: 'El peso debe ser un número'
    }),
    tipoCuerpo: z.string({
      required_error: 'Campo requerido',
      invalid_type_error:
        'El tipo de cuerpo debe ser Ectomorfo, Mesomorfo o Endomorfo'
    }),
    inscripcion: z.date({
      required_error: 'Campo requerido',
      invalid_type_error: 'La fecha de inscripción debe ser una fecha'
    }),
    plan: z.string({
      required_error: 'Campo requerido',
      invalid_type_error:
        'El plan debe ser Mensual, Trimestral, Semestral o Anual'
    }),
    valor: z.number({
      required_error: 'Campo requerido',
      invalid_type_error: 'El valor debe ser un número'
    }),
    fechaInicio: z.date({
      required_error: 'Campo requerido',
      invalid_type_error: 'La fecha de inicio debe ser una fecha'
    }),
    descuento: z
      .number({ invalid_type_error: 'El descuento debe ser un número' })
      .min(0, { message: 'El descuento no puede ser negativo' })
      .optional(),
    total: z.number({
      required_error: 'Campo requerido',
      invalid_type_error: 'El total debe ser un número'
    }),
    imagenPerfil: z.instanceof(File).optional(),
    diasPorSemana: z
      .number({
        required_error: 'Campo requerido',
        invalid_type_error: 'Los días por semana deben ser un número'
      })
      .min(1, { message: 'Los días por semana deben ser al menos 1' })
      .max(7, { message: 'Los días por semana no pueden ser más de 7' }),
    estado: z.enum(['1', '0']).default('1')
  })
  .superRefine((data, ctx) => {
    const descuento = data.descuento ?? 0;
    if (descuento > data.valor) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['descuento'],
        message: 'El descuento no puede ser mayor al valor'
      });
    }
  });

export type nuevoClienteType = z.infer<typeof NuevoClienteSchema>;
