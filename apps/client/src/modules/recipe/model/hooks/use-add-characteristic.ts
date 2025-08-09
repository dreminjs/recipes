import { stepsAtom } from '@/app';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';

export const useAddCharacteristic = () => {
  const [steps, setSteps] = useAtom(stepsAtom);

  const handleAddStep = (content: string) => {
    setSteps((prev) => [...prev, { content, id: nanoid() }]);
  };

  return { onAddStep: handleAddStep, steps };
};
