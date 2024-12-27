import { FC } from 'react';

interface IProps {
  title: 'Вход' | 'Регистрация';
}

export const GreetingTitle: FC<IProps> = ({ title }) => {
  return (
    <h3 className="text-gray-500">
        {title}
    </h3>
  );
};
