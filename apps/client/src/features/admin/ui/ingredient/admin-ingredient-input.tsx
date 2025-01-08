import { FC } from 'react';
import { IIngredientForm } from '../../../../shared';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<IIngredientForm>;
  error?: FieldError;
}

export const AdminIngredientInput: FC<IProps> = ({ register, error }) => {
  return (
    <div>
      <input
        {...register('title')}
        className="border-b-2 outline-none"
        placeholder="название"
        type="text"
      />
      {error?.message && <p>{error.message?.toString()}</p>}
    </div>
  );
};
