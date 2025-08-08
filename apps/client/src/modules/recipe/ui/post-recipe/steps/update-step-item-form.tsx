import { stepsAtom } from '@/app';
import { StepFormSchema } from '@/modules/recipe/model/schemas/step.schema';
import { ICreateStepFormDto } from '@/modules/recipe/model/types/create-step.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  defualtContentValue: string;
  currentItemIdx: number;
  handleHideInput: () => void;
}

export const UpdateStepItemForm: FC<IProps> = ({
  defualtContentValue,
  currentItemIdx,
  handleHideInput,
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
      prev.map((el, idx) =>
        currentItemIdx === idx ? { content: data.content } : el
      )
    );
    handleHideInput();
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center w-full gap-2">
        <fieldset>
          <input
            {...methods.register('content')}
            type="text"
            className="flex-1 py-2 px-3 block bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-gray-700"
            autoFocus
          />
          {methods.formState.errors.content?.message && (
            <p className="text-red">
              {methods.formState.errors.content?.message}
            </p>
          )}
        </fieldset>
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
