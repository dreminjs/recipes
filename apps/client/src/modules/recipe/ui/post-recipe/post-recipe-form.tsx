import { useForm } from 'react-hook-form';
import { Button, IPostRecipeForm, PostRecipeFormSchema } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useAtomValue } from 'jotai';
import { holidayAtom, nationalCuisineAtom, typeAtom } from '@/app';
import { usePostRecipe } from '../../model/api/queries';
import { RecipeFieldForm } from './recipe-field-form';
import { RecipeTextareaForm } from './recipe-textarea-form';
import { UploadRecipePhotoModal } from './upload-recipe-photo-modal';

interface IProps {
  onOpenCharacteristicsModal: () => void;
  onOpenStepsModal: () => void
}

export const PostRecipeForm: FC<IProps> = ({ onOpenCharacteristicsModal, onOpenStepsModal }) => {
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
            onClick={onOpenCharacteristicsModal}
            type="button"
          >
            Выбрать характеристики
          </Button>
          <Button onClick={onOpenStepsModal}>
            Добавить шаги
          </Button>
          <Button
            onClick={handleToggleModalVisiblity}
          >
            Загрузить Фото
          </Button>
        </div>
        <Button
          type="submit"
          size='md'
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
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
