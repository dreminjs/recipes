import { FC, PropsWithChildren } from 'react';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        {children}
      </div>
    </div>
  );
};
