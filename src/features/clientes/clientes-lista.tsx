import { searchParamsCache } from '@/lib/searchparams';
import { ClientesTable } from './clientes-tabla';
import { columns } from './clientes-tabla/columns';
import { getClientes } from '@/actions/clientes/clientes-tabla.action';

export default async function ClientesListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('nombre');
  const pageLimit = searchParamsCache.get('perPage');
  const sort = searchParamsCache.get('sort');
  const estado = searchParamsCache.get('estado');
  const filters = {
    page,
    limit: pageLimit,
    search: search || '',
    sort: sort ? JSON.parse(sort) : [{ id: 'fechaInicio', desc: false }],
    estado: estado || ''
  };

  const { data: usuarios, error, count } = await getClientes(filters);
  return (
    <ClientesTable
      data={usuarios || []}
      totalItems={count || 0}
      columns={columns}
    />
  );
}
