import { FC } from 'react';

interface IProps {
  content: string;
}

export const FormLabel: FC<IProps> = ({ content }) => {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {content}
    </label>
  );
};
