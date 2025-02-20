import { FC } from 'react';
import { IPostRecipeForm } from '@/shared';
import { UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<IPostRecipeForm>;
}

export const RecipeFieldForm: FC<IProps> = ({ register }) => {
  return (
    <label>
      <input
        {...register('title')}
        placeholder='заголовок'
        className="text-[24px] outline-none border-b-2 mb-6 pb-2"
        type="text"
      />
      {}
    </label>
  );
};
