import { ReactNode } from 'react';
import { QueryProvider } from '../src/application/providers/query-provider';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryProvider>
        <main className="">{children}</main>
      </QueryProvider>
    </>
  );
}
