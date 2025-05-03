'use client';
// import { useTheme } from 'next-themes';
import React from 'react';
import { ActiveThemeProvider } from '../active-theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  // we need the resolvedTheme value to set the baseTheme for clerk based on the dark or light theme
  const queryClient = new QueryClient();

  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors closeButton />
          {children}
        </QueryClientProvider>
      </ActiveThemeProvider>
    </>
  );
}
