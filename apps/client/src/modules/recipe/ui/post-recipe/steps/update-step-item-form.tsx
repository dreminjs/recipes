import { stepsAtom } from '@/app';
import { StepFormSchema } from '@/modules/recipe/model/schemas/step.schema';
import { ICreateStepFormDto } from '@/modules/recipe/model/types/create-step.dto';
import { FormField } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import { FC } from 'react';
import {
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormRegisterReturn,
} from 'react-hook-form';

interface IProps {
  defualtContentValue: string;
  currentItemId: string;
  onHideInput: () => void;
}

export const UpdateStepItemForm: FC<IProps> = ({
  defualtContentValue,
  currentItemId,
  onHideInput,
}) => {
  
  const methods = useForm<ICreateStepFormDto>({
    resolver: zodResolver(StepFormSchema),
    defaultValues: {
      content: defualtContentValue,
    },
  });

  const setSteps = useSetAtom(stepsAtom);

  const handleSubmit = methods.handleSubmit((data) => {
    setSteps((prev) =>
      prev.map((el) =>
        currentItemId === el.id ? { content: data.content, id: el.id } : el
      )
    );
    onHideInput();
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center w-full gap-2">
        <FormField<ICreateStepFormDto>
          register={methods.register}
          type={"content"}
          variant="default"
        />
        <button
          type="submit"
          className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
        >
          ✅
        </button>
      </form>
    </>
  );
};
