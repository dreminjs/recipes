import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  IPostCharacteristicForm,
  PostCharacteristicFormSchema,
} from '@/shared/';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormTitle } from './form-title';
import { FormSubmit } from './form-submit';
interface IProps {
  onPost: (data: IPostCharacteristicForm) => void;
  onClose: () => void
}

export const AdminPostCharacteristicForm: FC<IProps> = ({ onPost, onClose }) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
        <label className='block mb-2'>
          <input
            {...register('title')}
            type="text"
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="имя"
          />
          {errors.title && <p>{errors.title.message?.toString()}</p>}
        </label>
        <div className='flex gap-2'>
          <Button type="submit" variant="secondary" size="sm">Submit</Button>
          <Button variant="secondary" size="sm" onClick={onClose} type="button">Закрыть</Button>
        </div>
      </form>
    </>
  );
};
