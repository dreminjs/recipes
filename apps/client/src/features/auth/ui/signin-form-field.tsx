import { ISignIn } from '@/shared';
import { FC } from 'react';
import {
  UseFormRegister,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

interface IProps {
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  register: UseFormRegister<ISignIn>;
  type: 'email' | 'password';
  className?: string;
}

export const SigninFormField: FC<IProps> = ({
  register,
  error,
  type,
  className,
}) => {
  const placeholder = {
    email: 'Email',
    password: 'Password',
  };

  return (
    <fieldset className={`mb-4 ${className}`}>
      <input
        placeholder={placeholder[type]}
        {...register(type)}
        type={type}
        className={`w-full px-4 py-3 text-lg bg-white/90 rounded-lg border ${
          error ? 'border-red-500' : 'border-amber-200'
        } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
      />
      {error && (
        <p className="mt-1 text-red-600 text-sm font-medium animate-fadeIn">
          {error.toString()}
        </p>
      )}
    </fieldset>
  );
};
