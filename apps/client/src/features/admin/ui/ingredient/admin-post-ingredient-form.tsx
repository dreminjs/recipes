import { zodResolver } from '@hookform/resolvers/zod';
import { FormLabel, IPostIngredientForm, IngredientFormSchema } from '@/shared';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { measureOptions } from '../../model/constants';
import { FormTitle } from 'src/shared/ui/admin/form-title';
import { FormSubmit } from 'src/shared/ui/admin/form-submit';
import { FormLayout } from 'src/shared/ui/admin/form-layout';

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
    <FormLayout>
      <FormTitle title="добавь новый ингредиент" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <FormLabel content="имя ингредиента" />
          <input
            {...register('title')}
            type="text"
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="e.g. Flour, Sugar..."
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 animate-fadeIn">
              {errors.title.message?.toString()}
            </p>
          )}
        </div>

        <div className="flex items-end gap-4">
          <div className="flex-1">
            <FormLabel content="единица измерения" />
            <select
              {...register('measure')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              defaultValue=""
            >
              <option disabled value="">
                Select unit
              </option>
              {measureOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <FormSubmit content={'submit'} />
        </div>
      </form>
    </FormLayout>
  );
};
