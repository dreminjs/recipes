import { ingredientsAtom } from '@/app';
import { UpdateAmountIngredientSchema } from '@/modules/recipe/model/schemas/ingredient.schema';
import { TUpdateIngredientAmountDto } from '@/modules/recipe/model/types/update-ingredient-amount.dto';
import { FormField, measuresObj } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Measure } from '@prisma/client';
import { useSetAtom } from 'jotai';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  amount: number;
  ingredientName: string;
  measure: Measure;
  currentId: string;
  onHideInput: () => void
}

export const UpdateIngredientInfoForm: FC<IProps> = ({
  amount,
  ingredientName,
  measure,
  currentId,
  onHideInput
}) => {
  const methods = useForm<TUpdateIngredientAmountDto>({
    resolver: zodResolver(UpdateAmountIngredientSchema),
    defaultValues: {
      amount,
    },
  });

  const setIngredients = useSetAtom(ingredientsAtom);

  const handleUpdate = (newValue: number) => {
    setIngredients((prev) =>
      prev.map((el) => (el.id === currentId ? { ...el, amount: newValue } : el))
    );

    onHideInput()
  };

  return (
    <form
      onSubmit={methods.handleSubmit((data) => handleUpdate(data.amount))}
      className="flex items-end w-full gap-2"
    >
      <FormField<TUpdateIngredientAmountDto>
        register={methods.register}
        error={methods.formState.errors.amount?.message}
        label={`${ingredientName} (${measuresObj[measure]})`}
        type={'amount'}
        variant="default"
        inputType="number"
      />
      <button
        type="submit"
        className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
      >
        ✅
      </button>
    </form>
  );
};
