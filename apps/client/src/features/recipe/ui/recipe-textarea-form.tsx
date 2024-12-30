import { FC } from 'react';
import { IPostRecipeForm } from '../../../shared';
import { UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<IPostRecipeForm>;
}

export const RecipeTextareaForm: FC<IProps> = ({ register }) => {
  return (
    <div>
      <textarea
        {...register('description')}
        placeholder='описание'
        className="text-[24px] outline-none border-b-2 mb-6"
        
      />
      {}
    </div>
  );
};
