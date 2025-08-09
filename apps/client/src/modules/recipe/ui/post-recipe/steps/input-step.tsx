import { useAddCharacteristic } from '@/modules/recipe/model/hooks/use-add-characteristic';
import { StepFormSchema } from '@/modules/recipe/model/schemas/step.schema';
import { ICreateStepFormDto } from '@/modules/recipe/model/types/create-step.dto';
import { Button, FormField } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
} from 'react-hook-form';

export const InputStep = () => {
  const { onAddStep } = useAddCharacteristic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateStepFormDto>({
    resolver: zodResolver(StepFormSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onAddStep(data.content);
        reset();
      })}
      className="flex gap-5 mb-4 w-[320px] mx-auto"
    >
      <FormField<ICreateStepFormDto>
        register={register}
        type={'content'}
        placeholder={'Введите значение...'}
        error={errors.content?.message}
        className="w-full"
      />
      <Button type="submit" variant="ghost">
        ✅
      </Button>
    </form>
  );
};
