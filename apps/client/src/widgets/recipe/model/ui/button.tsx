import { FC, ReactNode } from 'react';

interface IProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export const Button: FC<IProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
    bg-white hover:bg-gray-50
    border border-gray-300
    text-gray-800 hover:text-gray-900
    px-4 py-2
    rounded-lg
    shadow-sm hover:shadow-md
    transition-all duration-200
    ease-in-out
    font-medium
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    active:bg-gray-100
    transform hover:-translate-y-0.5
    ${className ? className : ''}
  `}
    >
      {children}
    </button>
  );
};
