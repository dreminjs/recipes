import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, IPostIngredientForm, IngredientFormSchema, measuresOptions } from '@/shared';
import { FC } from 'react';
import {
  useForm,
} from 'react-hook-form';
import { FormTitle } from 'src/modules/admin/ui/characteristics/post-form/form-title';
import { FormSubmit } from 'src/modules/admin/ui/characteristics/post-form/form-submit';
import { FormLabel } from './post-form/form-label';

interface IProps {
  onPost: (data: IPostIngredientForm) => void;
}

export const AdminPostIngredientForm: FC<IProps> = ({ onPost }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostIngredientForm>({
    resolver: zodResolver(IngredientFormSchema),
  });

  const onSubmit = (data: IPostIngredientForm) => {
    onPost({ ...data });
    reset();
  };

  return (
    <>
      <FormTitle title="добавь новый ингредиент" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-2">
        <fieldset>
          <FormLabel content="имя ингредиента" />
          <FormField<IPostIngredientForm>
            register={register}
            type={"title"}
            placeholder={'Введите текст...'}
            variant="default"
            error={errors.title?.message}
          />
        </fieldset>

        <div className="flex items-end gap-4">
          <fieldset className="flex-1">
            <FormLabel content="единица измерения" />
            <select
              {...register('measure')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              defaultValue=""
            >
              <option disabled value="">
                Выберите ед. измерения
              </option>
              {measuresOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </fieldset>

          <FormSubmit content={'submit'} />
        </div>
      </form>
    </>
  );
};
