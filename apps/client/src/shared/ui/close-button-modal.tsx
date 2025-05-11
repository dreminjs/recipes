import { FC } from 'react';

interface IProps {
  onClick: () => void;
}

export const CloseModalButton: FC<IProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-6 w-full px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
    >закрыть</button>
  );
};
