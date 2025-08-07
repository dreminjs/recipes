import { stepsAtom } from '@/app';
import { useAtom } from 'jotai';

export const useAddCharacteristic = () => {
  const [steps, setSteps] = useAtom(stepsAtom);

  const handleAddStep = (content: string) => {
    if (steps.length === 0) {
      setSteps([{ content, index: 1 }]);
    } else {
      console.log(steps)
      setSteps((prev) => [...prev, { content, index: prev.at(-1)!.index + 1 }]);
    }
  };

  return { onAddStep: handleAddStep, steps };
};
