import { getCliente } from '@/actions/clientes/clientes.action';
import { useQuery } from '@tanstack/react-query';

export const useQueryCliente = (clienteId?: string) => {
  const queryCliente = useQuery({
    queryKey: ['cliente', clienteId],
    queryFn: () => getCliente(clienteId ?? ''),
    enabled: !!clienteId
  });
  return { queryCliente };
};
