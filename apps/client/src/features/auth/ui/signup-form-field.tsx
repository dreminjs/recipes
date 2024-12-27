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
}

export const SignupFormField: FC<IProps> = ({ register, error, type }) => {
  const placeholder = {
    email: 'Email',
    nickname: 'Nickname',
    password: 'Password',
  };

  return (
    <div className="mb-2">
      <input
        placeholder={placeholder[type]}
        {...register(type)}
        className="text-[24px] bg-transparent placeholder:text-white text-white outline-none border-b-2 w-full"
      />
      {error && <p>{error.toString()}</p>}
    </div>
  );
};
