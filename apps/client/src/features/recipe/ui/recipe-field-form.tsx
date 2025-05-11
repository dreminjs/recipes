import { FC } from 'react';
import { IPostRecipeForm } from '@/shared';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<IPostRecipeForm>;
  error: FieldError | undefined
}

export const RecipeFieldForm: FC<IProps> = ({ register, error }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-amber-800">Название рецепта</label>
      <input
        {...register('title')}
        placeholder="Вкусный пирог..."
        className={`w-full px-4 py-3 text-lg rounded-lg border outline-none ${
          error ? 'border-red-500' : 'border-amber-200'
        } focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
        type="text"
      />
      {error && <p className="text-red-600 text-sm">{error.message}</p>}
    </div>
  );
};
