import { RecipeFieldForm, RecipeTextareaForm } from '@/features/recipe';
import { useForm } from 'react-hook-form';
import { IPostRecipeForm, PostRecipeFormSchema } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadRecipePhoto } from '@/features/recipe/';
import { FC } from 'react';
import { Button } from '../../../shared/ui/button';

interface IProps {
  onOpen: () => void;
}



export const PostRecipeForm: FC<IProps> = ({ onOpen }) => {
  const {
    register,
    formState: { errors },
  } = useForm<IPostRecipeForm>({
    resolver: zodResolver(PostRecipeFormSchema),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
      }}
    >
      <RecipeFieldForm register={register} />
      <RecipeTextareaForm register={register} />
      <Button onClick={onOpen} className='mb-2'>
          Выберите характеристики
      </Button>
      <UploadRecipePhoto register={register} error={errors.photo} />
      <Button type="submit" className="px-9 py-2">
        Submit
      </Button>
    </form>
  );
};
