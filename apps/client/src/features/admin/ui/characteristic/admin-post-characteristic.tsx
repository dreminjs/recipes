import { zodResolver } from '@hookform/resolvers/zod';
import {
  IPostCharacteristicForm,
  PostCharacteristicFormSchema,
} from '@/shared';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  label: string;
  onPost: (data: IPostCharacteristicForm) => void;
}

export const AdminPostCharacteristic: FC<IProps> = ({ label, onPost }) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 mb-5">
      <label>
        <input
          {...register('title')}
          type="text"
          className="text-[25px] outline-none border-b-2 pb-2"
          placeholder={label}
        />
        {errors.title && <p>{errors.title.message?.toString()}</p>}
      </label>
      <button type="submit" className=" text-[25px] border-2 rounded-xl">
        Post {label}
      </button>
    </form>
  );
};
