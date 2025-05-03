'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import { CellAction } from './cell-action';
import { Clientes } from '@/interfaces/Clientes.interfaces';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toZonedTime } from 'date-fns-tz';
import { CATEGORY_OPTIONS } from './options';
export const columns: ColumnDef<Clientes>[] = [
  {
    id: 'Foto',
    accessorKey: 'imagenPerfil',
    header: 'Foto',
    cell: ({ row }) => {
      const nombre = row.original.nombre[0] + row.original.nombre[1];
      const imagenPerfil = row.original.imagenPerfil ?? '';
      return (
        <Avatar className='size-10'>
          <AvatarImage src={imagenPerfil} />
          <AvatarFallback>{nombre}</AvatarFallback>
        </Avatar>
      );
    }
  },
  {
    id: 'nombre',
    accessorKey: 'nombre',
    header: ({ column }: { column: Column<Clientes, unknown> }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
    cell: ({ cell }) => (
      <div className='capitalize'>{cell.getValue<Clientes['nombre']>()}</div>
    ),
    meta: {
      label: 'Nombre',
      placeholder: 'Buscar clientes...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    id: 'fechaInicio',
    accessorKey: 'fechaInicio',
    header: ({ column }: { column: Column<Clientes, unknown> }) => (
      <DataTableColumnHeader column={column} title='Fecha de Inicio' />
    ),
    cell: ({ cell }) => {
      const fechaInicio = cell.getValue<Clientes['fechaInicio']>();
      if (!fechaInicio) return null;

      const zona = 'America/Guatemala';
      const localDate = toZonedTime(fechaInicio, zona);

      return format(localDate, "dd 'de' MMMM 'de' yyyy", {
        locale: es
      });
    }
  },
  {
    id: 'plan',
    accessorKey: 'plan',
    header: 'Plan',
    cell: ({ cell }) => {
      const plan = cell.getValue<Clientes['plan']>();
      return <div className='capitalize'> {plan}</div>;
    }
  },
  {
    id: 'telefono',
    accessorKey: 'phone',
    header: 'Teléfono',
    cell: ({ cell }) => {
      const phone = cell.getValue<Clientes['phone']>();
      return <div className='capitalize'> {phone}</div>;
    }
  },
  {
    id: 'estado',
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ cell }) => {
      const estado = cell.getValue<Clientes['estado']>();
      const Icon = estado === '1' ? CheckCircle2 : XCircle;
      return (
        <Badge variant={estado === '1' ? 'active' : 'destructive'}>
          <Icon />
          {estado === '1' ? 'Activo' : 'Inactivo'}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Estado',
      variant: 'select',
      options: [
        { label: 'Activo', value: '1' },
        { label: 'Inactivo', value: '0' }
      ]
    }
  },

  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
