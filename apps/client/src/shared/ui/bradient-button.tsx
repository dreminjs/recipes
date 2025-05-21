import { ButtonHTMLAttributes, FC } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const GradientButton: FC<IProps> = ({
  className = '',
  children,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={props.disabled}
      className={`
        bg-gradient-to-r from-amber-500 to-orange-500
        text-white text-xl font-semibold
        py-3 px-6 rounded-lg shadow-md
        hover:from-amber-600 hover:to-orange-600
        transition-all
        ${props.disabled ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
