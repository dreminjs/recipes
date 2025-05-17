import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  onSubmit: () => void;
}

export const AuthFormLayout: FC<IProps> = ({ children, onSubmit}) => {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg border border-orange-100 max-w-md w-full">
      <form className="max-w-md w-full" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};
