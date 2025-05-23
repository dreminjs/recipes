import { RecipeFieldForm, RecipeTextareaForm } from '@/features/recipe';
import {
  useForm,
} from 'react-hook-form';
import { IPostRecipeForm, PostRecipeFormSchema } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { Button } from '../../../shared/ui/bradient-button';
import { UploadRecipePhotoModal } from '@/featuresrecipe/ui/upload-recipe-photo-modal';

interface IProps {
  onOpen: () => void;
}

export const PostRecipeForm: FC<IProps> = ({ onOpen }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IPostRecipeForm>({
    resolver: zodResolver(PostRecipeFormSchema),
  });

  const onSubmit = (data: IPostRecipeForm) => {
    console.log(data);
  };

  const [isUploadFileModalVisible, setIsUploadFileModalVisible] =
    useState(false);

  const handleToggleModalVisiblity = () =>
    setIsUploadFileModalVisible((prev) => !prev);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <RecipeFieldForm register={register} error={errors.title} />
        <RecipeTextareaForm register={register} error={errors.description} />
        <div className="flex gap-2">
          <Button
            onClick={onOpen}
            type="button"
            className="bg-amber-100 text-amber-800 hover:bg-amber-200 mb-2"
            disabled={false}
          >
            Выбрать характеристики
          </Button>

          <Button
          onClick={handleToggleModalVisiblity}
            className="bg-amber-100 text-amber-800 hover:bg-amber-200 mb-2"
            disabled={false}
          >
            Загрузить Фото
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
          disabled={false}
        >
          Опубликовать рецепт
        </Button>
      </form>
      <UploadRecipePhotoModal
        register={register}
        error={errors.photo}
        isOpen={isUploadFileModalVisible}
        onClose={handleToggleModalVisiblity}
      />
    </>
  );
};
