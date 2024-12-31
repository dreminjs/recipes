import { zodResolver } from '@hookform/resolvers/zod';
import {
  IPostCharacteristicForm,
  PostCharacteristicFormSchema,
} from '../../../shared/';
import { characteristics } from 'interfaces';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  label: characteristics;
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

  return (
    <form
      onSubmit={handleSubmit((data) => onPost({ ...data }))}
      className="flex gap-5"
    >
      <div>
        <input
          {...register('title')}
          type="text"
          className="text-[25px] outline-none border-b-2 pb-2"
          placeholder={label}
        />
        {errors.title && <p>{errors.title.message?.toString()}</p>}
      </div>
      <button type="submit" className=" text-[25px] border-2 rounded-xl">
        Post {label}
      </button>
    </form>
  );
};