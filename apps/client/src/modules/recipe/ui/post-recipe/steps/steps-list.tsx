import { stepsAtom } from '@/app';
import { useAtom } from 'jotai';
import { StepsItem } from './steps-item';
import { useState } from 'react';
import { nanoid } from 'nanoid';

export const StepsList = () => {
  const [steps, setSteps] = useAtom(stepsAtom);

  const [choosedItemIndex, setChoosedItemIndex] = useState<number | null>(null);

  return (
    <ol className="h-[350px] overflow-y-scroll p-0 pr-2">
      {steps.map((el, itemIdx) => (
        <StepsItem
          idx={itemIdx}
          onDelete={() =>
            setSteps((prev) => prev.filter((el, idx) => itemIdx !== idx))
          }
          key={nanoid()}
          choosed={choosedItemIndex === itemIdx}
          onUpdate={(data) => setChoosedItemIndex(data)}
          {...el}
        />
      ))}
    </ol>
  );
};
