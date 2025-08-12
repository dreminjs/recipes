
import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'orange' | 'secondary' | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

export const Button: FC<IProps> = ({
  variant = "orange",
  size = 'sm',
  className = '',
  children,
  type = 'button',
  ...props
}) => {

  const baseClasses = clsx(
    'font-semibold rounded-lg shadow-md transition-all',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500',
    'disabled:opacity-70 disabled:cursor-not-allowed'
  );

  const variantClasses = clsx({
    'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600':
      variant === "orange",
    'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100':
      variant === 'secondary',
    'bg-transparent text-gray-700 hover:bg-gray-100': variant === 'ghost',
  });

  const sizeClasses = clsx({
    'py-2 px-4 text-base': size === 'sm',
    'py-3 px-6 text-xl': size === 'md',
    'py-4 px-8 text-2xl': size === 'lg',
  });

  return (
    <button
      type={type}
      className={clsx(baseClasses, variantClasses, sizeClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
};