import { ReactNode } from 'react';
import { CommonProvider } from '../src/application/providers/common-provider';
import { Header } from '../src/widgets/header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CommonProvider>
        <main className="max-w-[90%] mx-auto py-5">
          <Header />
          {children}
        </main>
      </CommonProvider>
    </>
  );
}
