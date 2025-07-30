import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const CharactersticsLayout: FC<IProps> = function CharactersticsLayout({ children }) {
  return <div className="flex items-center flex-col">{children}</div>;
};
