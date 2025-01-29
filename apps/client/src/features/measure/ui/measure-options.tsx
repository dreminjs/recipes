import { IIngredientForm } from '../../../shared';
import { UseFormRegister, FieldErrors, FieldError } from 'react-hook-form';
import { FC } from 'react';
import { options } from '../model/measure-options';

interface IProps {
  register: UseFormRegister<IIngredientForm>;
  error?: FieldError;
}

export const MeasureOptions: FC<IProps> = ({ register, error }) => {
  return (
    <div>
      <select className="border-2" {...register('measure')} defaultValue="">
        <option disabled value={""}>
          Выберете единицу
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error?.message && <p>{error.message?.toString()}</p>}
    </div>
  );
};
