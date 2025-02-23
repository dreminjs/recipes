import { ReactNode } from 'react';
import { CommonProvider } from '@/application/providers/common-provider';
import dynamic from 'next/dynamic';

const Header = dynamic(
  () => import('@/widgets/header/').then((mod) => mod.Header),
  { ssr: false }
);

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
