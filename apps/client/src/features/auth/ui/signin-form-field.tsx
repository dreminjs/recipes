import { ISignIn } from '../../../shared';
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
    <div className={`pb-2 mb-3 4 ${className} relative`}>
      <input
        placeholder={placeholder[type]}
        {...register(type)}
        className="text-[24px] bg-transparent placeholder:text-white text-white outline-none border-b-2 w-full"
      />
        {error && <p className='text-[24px] text-white underline'>{error.toString()}</p>}
    </div>
  );
};
