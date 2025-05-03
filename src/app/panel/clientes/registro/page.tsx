import ClientesVista from '@/features/clientes/clientes-vista';
import PageContainer from '@/components/layout/page-container';
export const metadata = {
  title: 'Registro de Clientes'
};
export default function ClientesRegistroPage() {
  return (
    <PageContainer>
      <ClientesVista />
    </PageContainer>
  );
}
