import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ClientesVista from '@/features/clientes/clientes-vista';

export const metadata = {
  title: 'Dashboard : Product View'
};

type PageProps = { params: Promise<{ clienteId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ClientesVista clienteId={params.clienteId} />
          {/* <ProductViewPage productId={params.productId} /> */}
        </Suspense>
      </div>
    </PageContainer>
  );
}
