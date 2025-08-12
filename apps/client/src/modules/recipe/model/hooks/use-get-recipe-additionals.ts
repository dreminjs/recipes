import { typeAtom, nationalCuisineAtom, holidayAtom, stepsAtom } from '@/app';
import { useAtomValue } from 'jotai';

export const useGetRecipeAdditionals = () => {
  const type = useAtomValue(typeAtom);
  const nationalCuisine = useAtomValue(nationalCuisineAtom);
  const holiday = useAtomValue(holidayAtom);
  const steps = useAtomValue(stepsAtom)


  return {
    holiday,
    nationalCuisine,
    type,
    hasSteps: steps.length !== 0
  };
};
