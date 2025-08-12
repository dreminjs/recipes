import {
  typeAtom,
  nationalCuisineAtom,
  holidayAtom,
  stepsAtom,
  ingredientsAtom,
} from '@/app';
import { useAtomValue } from 'jotai';

export const useGetRecipeAdditionals = () => {
  const type = useAtomValue(typeAtom);
  const nationalCuisine = useAtomValue(nationalCuisineAtom);
  const holiday = useAtomValue(holidayAtom);
  const steps = useAtomValue(stepsAtom);
  const ingredients = useAtomValue(ingredientsAtom);

  return {
    holiday,
    nationalCuisine,
    type,
    hasSteps: steps.length !== 0,
    hasIngredients: ingredients.length !== 0,
    ingredients: ingredients.map((el) => ({
      ingredientId: el.id,
      amount: el.amount,
    })),
    steps: steps.map((el) => ({ content: el.content })),
  };
};
