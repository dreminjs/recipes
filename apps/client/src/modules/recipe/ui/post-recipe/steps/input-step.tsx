import { useAddCharacteristic } from '@/modules/recipe/model/hooks/use-add-characteristic';
import { StepFormSchema } from '@/modules/recipe/model/schemas/step.schema';
import { ICreateStepFormDto } from '@/modules/recipe/model/types/create-step.dto';
import { Button } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const InputStep = () => {
  const { onAddStep } = useAddCharacteristic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateStepFormDto>({
    resolver: zodResolver(StepFormSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onAddStep(data.content))}
      className="flex gap-5"
    >
      <fieldset>
        <input
          {...register('content')}
          className="border-b-2 outline-none"
          type="text"
          placeholder="Введите новый шаг..."
        />
        {errors.content?.message && <p className='text-red'>{errors.content?.message}</p>}
      </fieldset>
      <Button type="submit" variant="ghost">
        Добавить
      </Button>
    </form>
  );
};
