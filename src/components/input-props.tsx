import React from 'react';
import { FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { ControllerRenderProps } from 'react-hook-form';

export const InputProps = ({
  field,
  label,
  children,
  type = 'text',
  disabled = false
}: {
  field: ControllerRenderProps;
  label: string;
  children?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  disabled: boolean;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      // Convertir a número; si no se puede, se puede asignar 0 o dejar vacío según la lógica
      field.onChange(e.target.value ? Number(e.target.value) : '');
    } else {
      field.onChange(e.target.value);
    }
  };

  return (
    <FormItem className='bg-accent rounded-xl p-3'>
      <FormLabel>{label}</FormLabel>
      <div className='flex items-center gap-2'>
        <FormControl>
          <Input
            disabled={disabled}
            {...field}
            pattern={type === 'number' ? '\\d*' : undefined}
            inputMode={type === 'number' ? 'numeric' : undefined}
            type={type}
            // Usamos nuestro manejador personalizado para el onChange
            onChange={handleChange}
            // Para inputs de tipo número, forzamos siempre que el value sea de tipo string o
            // bien se define la conversión adecuada:
            value={field.value || ''}
          />
        </FormControl>
        {children}
      </div>
      <FormMessage className='ml-auto text-[.6em]' />
    </FormItem>
  );
};
