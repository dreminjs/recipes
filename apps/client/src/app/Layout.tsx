import { ReactNode } from 'react';
import { Footer } from 'src/components/footer';
import dynamic from 'next/dynamic';
import { CommonProvider } from 'src/app';

const Header = dynamic(
  () => import('src/components/header').then((mod) => mod.Header),
  { ssr: false }
);
export function Layout({ children }: { children: ReactNode }) {
  return (
    <CommonProvider>
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen flex flex-col">
        <div className="mx-auto max-w-[1350px] pt-2 w-full flex-1 flex flex-col">
          <Header />
          <div className="max-w-7xl mx-auto w-full py-2 px-4 sm:px-6 lg:px-8 flex-1">
            {children}
          </div>
          <div className="">
            <Footer />
          </div>
        </div>
      </div>
    </CommonProvider>
  );
}
