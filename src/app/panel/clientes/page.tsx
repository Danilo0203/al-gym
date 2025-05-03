import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { SearchParams } from 'nuqs';
import { searchParamsCache } from '@/lib/searchparams';
import ClientesListingPage from '@/features/clientes/clientes-lista';

export const metadata = {
  title: 'Tabla de Clientes'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};
export default async function ClientesPage(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Clientes' description='' />
          <Link
            href='/panel/clientes/registro'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className='mr-2 h-4 w-4' /> Nuevo Cliente
          </Link>
        </div>
        <Separator />
        <Suspense
          // key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <ClientesListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
