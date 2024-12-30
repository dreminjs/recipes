import { RecipeFieldForm, RecipeTextareaForm } from '../../../features/recipe';

import { useForm } from 'react-hook-form';

import { IPostRecipeForm, PostRecipeFormSchema } from '../../../shared';

import { zodResolver } from '@hookform/resolvers/zod';

import { UploadRecipePhoto } from '../../../features/recipe/';
import { useEffect } from 'react';

export const PostRecipeForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPostRecipeForm>({
    resolver: zodResolver(PostRecipeFormSchema),
  });

  useEffect(() => {
    if(watch().photo){
      console.log(watch().photo)
    }
  },[watch().photo])

  return (
    <form className=''>
      <RecipeFieldForm register={register} />
      <RecipeTextareaForm register={register} />
      <UploadRecipePhoto register={register} error={errors.photo} />
      <button className='px-9 py-2'>Submit</button>
    </form>
  );
};
