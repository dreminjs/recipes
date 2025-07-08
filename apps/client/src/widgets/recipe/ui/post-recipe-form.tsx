import { RecipeFieldForm, RecipeTextareaForm } from '@/features/recipe';
import { useForm } from 'react-hook-form';
import { IPostRecipeForm, PostRecipeFormSchema } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { UploadRecipePhotoModal } from '@/featuresrecipe/ui/upload-recipe-photo-modal';
import { Button } from '@mui/material';
import { usePostRecipe } from '../model/api/queries';
import { useAtomValue } from 'jotai';
import {
  typeAtom,
  nationalCuisineAtom,
  holidayAtom,
} from 'src/application/stores/post-recipe.store';

interface IProps {
  onOpen: () => void;
}

export const PostRecipeForm: FC<IProps> = ({ onOpen }) => {
  const type = useAtomValue(typeAtom);
  const nationalCuisine = useAtomValue(nationalCuisineAtom);
  const holiday = useAtomValue(holidayAtom);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IPostRecipeForm>({
    resolver: zodResolver(PostRecipeFormSchema),
  });

  const { mutate } = usePostRecipe();

  const onSubmit = (data: IPostRecipeForm) => {
    if (type?.id && nationalCuisine?.id && holiday?.id) {
      mutate({
        ...data,
        photos: data.photos,
        nationalCuisineId: nationalCuisine.id,
        typeId: type.id,
        holidayId: holiday.id
      });
    }
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
        error={errors.photos?.message?.toString()}
        isOpen={isUploadFileModalVisible}
        onClose={handleToggleModalVisiblity}
        setValue={setValue}
      />
    </>
  );
};
