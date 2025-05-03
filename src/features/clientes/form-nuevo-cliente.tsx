import { Calendario } from '@/components/calendario';
import { InputProps } from '@/components/input-props';
// import { FileImage } from "@/components/file-image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useNuevoClienteForm } from '@/hooks/registro/nuevoClienteForm.hook';
import { useEffect } from 'react';
interface FormNuevoClienteProps {
  form: ReturnType<typeof useNuevoClienteForm>['form'];
  onSumbit: ReturnType<typeof useNuevoClienteForm>['onSumbit'];
}

export const FormNuevoCliente = ({ form, onSumbit }: FormNuevoClienteProps) => {
  const { isSubmitting } = form.formState;
  // Autoajustar precio según plan seleccionado
  const plan = form.watch('plan');

  useEffect(() => {
    let precio = 0;
    let dia = 5;
    switch (plan) {
      case 'dia':
        precio = 15; // ejemplo: precio por día
        dia = 1; // un día
        break;
      case 'semanal':
        precio = 75; // ejemplo: precio semanal
        break;
      case 'mensual':
        precio = 250; // ejemplo: precio mensual
        break;
      case 'anual':
        precio = 2000; // ejemplo: precio anual
        break;
      default:
        precio = 0;
        dia = 0;
    }
    form.setValue('diasPorSemana', dia);
    form.setValue('valor', precio);
  }, [plan, form]);
  // Autoajustar total según valor y descuento
  const descuentoActual = form.watch('descuento');
  // Al principio del componente:
  const valorActual = form.watch('valor');

  useEffect(() => {
    const total = Math.max((valorActual || 0) - (descuentoActual || 0), 0);
    if (form.getValues('total') !== total) {
      form.setValue('total', total);
    }
  }, [valorActual, descuentoActual, form]);

  return (
    <Form {...form}>
      <form
        className='flex flex-col justify-between gap-10 sm:flex-row'
        onSubmit={form.handleSubmit(onSumbit)}
        id='form-nuevo-cliente'
      >
        {/* <FormField
            name="imagenPerfil"
            control={form.control}
            render={() => (
              <FormItem className="h-fit grow">
                <FormLabel className="mb-2">Imagen de Perfil</FormLabel>
                <FormControl>
                  <FileImage />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        {/* <FileImage /> */}
        <div className='grid grow-[2] grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            name='nombre'
            control={form.control}
            render={({ field }) => (
              <InputProps
                field={{ ...field }}
                label='Nombre'
                disabled={isSubmitting}
              />
            )}
          />
          <FormField
            name='telefono'
            control={form.control}
            render={({ field }) => (
              <InputProps
                field={{ ...field }}
                label='Telefono'
                type='number'
                disabled={isSubmitting}
              />
            )}
          />

          <FormField
            control={form.control}
            name='fechaNacimiento'
            render={({ field }) => (
              <FormItem className='bg-accent rounded-md p-3'>
                <FormLabel>Fecha Nacimiento</FormLabel>
                <FormControl>
                  <Calendario
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className='ml-auto text-[.6em]' />
              </FormItem>
            )}
          />

          <FormField
            name='sexo'
            control={form.control}
            render={({ field }) => (
              <FormItem className='bg-accent rounded-md p-3'>
                <FormLabel>Sexo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full' disabled={isSubmitting}>
                      <SelectValue placeholder='Seleccion un genero' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='m'>Masculino</SelectItem>
                    <SelectItem value='f'>Femenino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className='ml-auto text-[.6em]' />
              </FormItem>
            )}
          />
          <FormField
            name='estatura'
            control={form.control}
            render={({ field }) => (
              <InputProps
                field={{ ...field }}
                type='number'
                label='Estatura'
                disabled={isSubmitting}
              >
                <span className='font-bold'>CM</span>
              </InputProps>
            )}
          />
          <FormField
            name='peso'
            control={form.control}
            render={({ field }) => (
              <InputProps
                field={{ ...field }}
                label='Peso'
                type='number'
                disabled={isSubmitting}
              >
                <span className='font-bold'>LBS</span>
              </InputProps>
            )}
          />
          <FormField
            name='tipoCuerpo'
            control={form.control}
            render={({ field }) => (
              <FormItem className='bg-accent rounded-md p-3'>
                <FormLabel>Tipo de Cuerpo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full' disabled={isSubmitting}>
                      <SelectValue placeholder='Selecciona un tipo de cuerpo' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SelectItem value='ectomorfo'>Ectomorfo</SelectItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Constitución delgada, extremidades largas y
                            dificultad para ganar masa muscular.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SelectItem value='mesomorfo'>Mesomorfo</SelectItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Cuerpo atlético, facilidad para ganar músculo y
                            perder grasa.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SelectItem value='endomorfo'>Endomorfo</SelectItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Tendencia a acumular grasa, metabolismo más lento y
                            dificultad para perder peso.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </SelectContent>
                </Select>
                <FormMessage className='ml-auto text-[.6em]' />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              name='plan'
              control={form.control}
              render={({ field }) => (
                <FormItem className='bg-accent rounded-md p-3'>
                  <FormLabel>Plan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-auto' disabled={isSubmitting}>
                        <SelectValue placeholder='Seleccion un tipo de plan' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='dia'>Dia</SelectItem>
                      <SelectItem value='semanal'>Semanal</SelectItem>
                      <SelectItem value='mensual'>Mensual</SelectItem>
                      <SelectItem value='anual'>Anual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className='ml-auto text-[.6em]' />
                </FormItem>
              )}
            />
            <FormField
              name='diasPorSemana'
              control={form.control}
              render={({ field }) => (
                <InputProps
                  field={{ ...field }}
                  label='Dias por semana'
                  disabled={isSubmitting || plan === 'dia'}
                  type='number'
                />
              )}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              name='valor'
              control={form.control}
              render={({ field }) => (
                <InputProps
                  field={{ ...field }}
                  label='Valor'
                  type='number'
                  disabled={true}
                >
                  <span className='font-bold'>GTQ</span>
                </InputProps>
              )}
            />
            <FormField
              name='descuento'
              control={form.control}
              render={({ field }) => (
                <InputProps
                  field={{ ...field }}
                  label='Descuento'
                  type='number'
                  disabled={isSubmitting}
                >
                  <span className='font-bold'>GTQ</span>
                </InputProps>
              )}
            />
          </div>
          <FormField
            name='fechaInicio'
            control={form.control}
            render={({ field }) => (
              <FormItem className='bg-accent rounded-md p-3'>
                <FormLabel>Fecha de Inicio</FormLabel>
                <FormControl>
                  <Calendario
                    value={field.value ?? new Date()}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                    allowFutureDates={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='total'
            control={form.control}
            render={({ field }) => {
              // Handler para actualizar descuento al perder foco en total
              const handleBlur = () => {
                const totalVal = Number(field.value) || 0;
                const valorVal = Number(form.getValues('valor')) || 0;
                const descuentoCalc = Math.max(valorVal - totalVal, 0);
                form.setValue('descuento', descuentoCalc);
                field.onBlur();
              };
              return (
                <InputProps
                  field={{ ...field, onBlur: handleBlur }}
                  label='Total'
                  type='number'
                  disabled={isSubmitting}
                >
                  <span className='font-bold'>GTQ</span>
                </InputProps>
              );
            }}
          />
        </div>
      </form>
    </Form>
  );
};
