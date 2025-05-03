'use client';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormNuevoCliente } from '@/features/clientes/form-nuevo-cliente';
import { useNuevoClienteForm } from '@/hooks/registro/nuevoClienteForm.hook';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ClientesVista({ clienteId }: { clienteId?: string }) {
  const [activeTab, setActiveTab] = useState('datos-cliente');
  const { reset, form, onSumbit } = useNuevoClienteForm(
    () => setActiveTab('entrenamiento'),
    clienteId
  );
  const { isSubmitting } = form.formState;

  const tabsArray = [
    { value: 'datos-cliente', label: 'Datos del Cliente' },
    { value: 'entrenamiento', label: 'Entrenamiento' },
    { value: 'nutricion', label: 'Nutricion' },
    { value: 'pagos', label: 'Pagos' }
  ];
  return (
    // <PageContainer>
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className='h-full w-full'
    >
      <TabsList className='grid w-full grid-cols-4'>
        {tabsArray.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className='w-full'>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value='datos-cliente' className='h-full'>
        <Card className='flex h-full flex-col justify-between'>
          <CardContent className='space-y-2'>
            <FormNuevoCliente form={form} onSumbit={onSumbit} />
          </CardContent>
          <CardFooter className='ms-auto flex gap-4'>
            <Button variant='outline' onClick={() => reset()}>
              Cancelar
            </Button>
            <Button form='form-nuevo-cliente' disabled={isSubmitting}>
              {isSubmitting ? (
                <div className='flex items-center gap-2'>
                  <Loader2 className='animate-spin' />
                  <span className='ml-2'>Registrando...</span>
                </div>
              ) : (
                'Registrar'
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value='entrenamiento'>
        <Card>
          {/* <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, youll be logged out.</CardDescription>
          </CardHeader> */}
          <CardContent className='space-y-2'>
            {/* <Entrenamiento /> */}
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    // </PageContainer>
  );
}
