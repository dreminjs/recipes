import { RecipeFieldForm, RecipeTextareaForm } from '@/features/recipe';
import { useForm } from 'react-hook-form';
import { IPostRecipeForm, PostRecipeFormSchema } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadRecipePhoto } from '@/features/recipe/';
import { FC } from 'react';

interface IProps {
  onOpen: () => void
}

export const PostRecipeForm: FC<IProps> = ({onOpen}) => {
  const {
    register,
    formState: { errors },
  } = useForm<IPostRecipeForm>({
    resolver: zodResolver(PostRecipeFormSchema),
  });

  return (
    <form className="">
      <RecipeFieldForm register={register} />
      <RecipeTextareaForm register={register} />
      <button onClick={onOpen} type='button' className='border-2 px-3 py-2 mb-2'>Выберите характеристики</button>
      <UploadRecipePhoto register={register} error={errors.photo} />
      <button className="px-9 py-2">Submit</button>
    </form>
  );
};
