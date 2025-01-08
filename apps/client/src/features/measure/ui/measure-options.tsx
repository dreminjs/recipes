import { IIngredientForm } from '../../../shared';
import { UseFormRegister, FieldErrors, FieldError } from 'react-hook-form';
import { IOption } from '../model/measure.interface';
import { FC } from 'react';

interface IProps {
  register: UseFormRegister<IIngredientForm>;
  error?: FieldError;
}

const options: IOption[] = [
  { value: 'KG', label: 'кг' },
  { value: 'N', label: 'шт' },
  { value: 'G', label: 'грамм' },
  { value: 'ML', label: 'милилитр' },
  { value: 'L', label: 'литр' },
];

export const MeasureOptions: FC<IProps> = ({ register, error }) => {
  return (
    <div>
      <select className="border-2" {...register('measure')}>
        <option disabled selected>
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
