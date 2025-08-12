/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useForm } from 'react-hook-form';
import { Button, Func } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { usePostRecipe } from '../../model/api/queries';
import { RecipeFieldForm } from './recipe-field-form';
import { RecipeTextareaForm } from './recipe-textarea-form';
import { UploadRecipePhotoModal } from './upload-files/upload-recipe-photo-modal';
import { IPostRecipeForm } from '../../model/types/create-recipe.dto';
import { PostRecipeFormSchema } from '../../model/schemas/recipe.schema';
import { validateCharacteristics } from '../../model/lib/validate-characteristics';
import { useNotificationActions } from '@/modules/notifications';
import { useGetRecipeAdditionals } from '../../model/hooks/use-get-recipe-additionals';
import { ActionsButtons } from './actions-buttons';

interface IProps {
  onOpenCharacteristicsModal: Func;
  onOpenStepsModal: Func;
  onOpenIngredientsModal: Func;
}

export const PostRecipeForm: FC<IProps> = ({
  onOpenCharacteristicsModal,
  onOpenStepsModal,
  onOpenIngredientsModal,
}) => {
  const {
    nationalCuisine,
    type,
    holiday,
    hasSteps,
    hasIngredients,
    ingredients,
    steps,
  } = useGetRecipeAdditionals();

  const notificationActions = useNotificationActions();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm<IPostRecipeForm>({
    resolver: zodResolver(PostRecipeFormSchema),
  });

  const { mutate } = usePostRecipe();

  const onSubmit = (data: IPostRecipeForm) => {
    if (
      validateCharacteristics(
        {
          typeId: type?.id,
          hasSteps,
          hasIngredients,
        },
        notificationActions
      )
    ) {
      mutate({
        ...data,
        photos: data.photos,
        nationalCuisineId: nationalCuisine!.id,
        typeId: type!.id,
        holidayId: holiday!.id,
        ingredients,
        steps,
      });
    }
  };

  const [isUploadFileModalVisible, setIsUploadFileModalVisible] =
    useState(false);

  const handleToggleUploadFileModalVisiblity = () =>
    setIsUploadFileModalVisible((prev) => !prev);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <RecipeFieldForm register={register} error={errors.title} />
        <RecipeTextareaForm register={register} error={errors.description} />
        <ActionsButtons
          onOpenCharacteristicsModal={onOpenCharacteristicsModal}
          onOpenStepsModal={onOpenStepsModal}
          onToggleUploadFileModalVisiblity={
            handleToggleUploadFileModalVisiblity
          }
          onOpenIngredientsModal={onOpenIngredientsModal}
        />
        <Button
          type="submit"
          size="md"
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
        >
          Опубликовать рецепт
        </Button>
      </form>
      <UploadRecipePhotoModal
        register={register}
        error={errors.photos?.message?.toString()}
        isOpen={isUploadFileModalVisible}
        onClose={handleToggleUploadFileModalVisiblity}
        setValue={setValue}
        clearErrors={clearErrors}
      />
    </>
  );
};
