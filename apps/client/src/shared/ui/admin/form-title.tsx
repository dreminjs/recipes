import { FC } from 'react';

interface IProps {
  title: string;
}

export const FormTitle: FC<IProps> = ({ title }) => {
  return (
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      {title}
    </h2>
  );
};
