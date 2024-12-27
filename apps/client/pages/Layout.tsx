import { ReactNode } from 'react';
import { CommonProvider } from '../src/application/providers/common-provider';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CommonProvider>
        <main className="">{children}</main>
      </CommonProvider>
    </>
  );
}
