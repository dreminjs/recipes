import { zodResolver } from '@hookform/resolvers/zod';
import {
  IPostCharacteristicForm,
  PostCharacteristicFormSchema,
} from '@/shared/';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormTitle } from './form-title';
import { FormSubmit } from './form-submit';
interface IProps {
  label: string;
  onPost: (data: IPostCharacteristicForm) => void;
}

export const AdminPostCharacteristicForm: FC<IProps> = ({ label, onPost }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostCharacteristicForm>({
    resolver: zodResolver(PostCharacteristicFormSchema),
  });

  const onSubmit = (data: IPostCharacteristicForm) => {
    onPost({ ...data });
    reset();
  };

  return (
    <>
      <FormTitle title="добавь новую характеристику" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-5 mb-5">
        <label>
          <input
            {...register('title')}
            type="text"
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="имя"
          />
          {errors.title && <p>{errors.title.message?.toString()}</p>}
        </label>
        <FormSubmit content={'submit'} />
      </form>
    </>
  );
};
