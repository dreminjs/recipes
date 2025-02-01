import { useForm } from 'react-hook-form';
import { AdminIngredientInput } from '../../../../features/admin';
// import { MeasureOptions } from '../../../../features/measure';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IngredientFormSchema,
  IPostIngredientForm,
  usePostIngredient,
} from '../../../../shared';
import { FC, useEffect } from 'react';
import { MessageModal } from '../../../../features/message';

interface IProps {
  refetch: () => void;
}

export const AdminPostIngredient: FC<IProps> = ({ refetch }) => {
  const {
    postIngredient,
    postIngredientIsLoading,
    postIngredientIsError,
    postIngredientIsSuccess,
  } = usePostIngredient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostIngredientForm>({
    resolver: zodResolver(IngredientFormSchema),
  });

  useEffect(() => {
    if (postIngredientIsSuccess || postIngredientIsError) {
      reset();
    }
  }, [postIngredientIsSuccess, postIngredientIsError, reset]);

  useEffect(() => {
    if (postIngredientIsSuccess) {
      refetch();
    }
  }, [postIngredientIsSuccess, refetch]);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => postIngredient({ ...data }))}
        className="flex flex-col items-start"
      >
        <div className="mb-2 flex gap-4">
          <AdminIngredientInput register={register} error={errors.title} />
          {/* <MeasureOptions register={register} error={errors.measure} /> */}
        </div>
        <button type="submit" className="border-2 px-4 py-2 rounded-md">
          submit
        </button>
      </form>
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка',
          isLoading: 'Загрузка',
        }}
        isError={postIngredientIsError}
        isLoading={postIngredientIsLoading}
        isSuccess={postIngredientIsSuccess}
      />
    </>
  );
};
