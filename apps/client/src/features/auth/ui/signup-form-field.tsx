import { ISignUp } from '../../../shared';
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
  register: UseFormRegister<ISignUp>;
  type: 'email' | 'nickname' | 'password';
  className?: string
}

export const SignupFormField: FC<IProps> = ({ register, error, type, className }) => {
  const placeholder = {
    email: 'Email',
    nickname: 'Nickname',
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
