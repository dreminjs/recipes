import { zodResolver } from '@hookform/resolvers/zod';
import {
  IPostIngredientForm,
  IngredientFormSchema,
} from '@/shared';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { measureOptions } from '../../model/constants';

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
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className='mb-5'>
        <input
          {...register('title')}
          type="text"
          className="text-[25px] outline-none border-b-2 pb-2"
          placeholder={'ingredient'}
        />
        {errors.title && <p>{errors.title.message?.toString()}</p>}
      </div>
      <div className='flex gap-5'>
        <div>
          <select className="border-2" {...register('measure')} defaultValue="">
            <option disabled value={''}>
              Выберете единицу
            </option>
            {measureOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* {errors?.message && <p>{errors.message?.toString()}</p>} */}
        </div>
        <button type="submit" className=" text-[25px] border-2 rounded-xl">
          Post {'ingredient'}
        </button>
      </div>
    </form>
  );
};
