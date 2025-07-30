import { FC } from 'react';
import {
  UseFormRegister,
} from 'react-hook-form';
import { IRequestResetPasswordForm } from '../inteface';

interface IProps {
  error?:string
  register: UseFormRegister<IRequestResetPasswordForm>;
}

export const RequestResetPasswordInput: FC<IProps> = ({ error, register }) => {
  
   return (
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-amber-800">
        Электронная почта
      </label>
      <div className="relative">
        <input
          id="email"
          type={"email"}
          {...register("email")}
          className={`w-full px-4 py-3 border ${
            error ? 'border-red-500' : 'border-amber-300'
          } rounded-lg bg-amber-50 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
          placeholder="your@email.com"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error.toString()}
        </p>
      )}
    </div>
  );
};