import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const FormLayout: FC<IProps> = ({ children }) => {
  return <div className="p-6 bg-white rounded-lg shadow-xl">{children}</div>;
};
