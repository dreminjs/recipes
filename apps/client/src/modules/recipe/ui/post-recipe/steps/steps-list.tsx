import { stepsAtom } from '@/app';
import { useAtom } from 'jotai';
import { StepsItem } from './steps-item';
import { useCallback, useState } from 'react';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

export const StepsList = () => {
  const [steps, setSteps] = useAtom(stepsAtom);

  const [choosedItemIndex, setChoosedItemIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setChoosedItemIndex(null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      // setActiveId(null);

      if (over && active.id !== over.id) {
        setSteps((prevSteps) => {
          const oldIndex = prevSteps.findIndex((step) => step.id === active.id);
          const newIndex = prevSteps.findIndex((step) => step.id === over.id);
          return arrayMove(prevSteps, oldIndex, newIndex);
        });
      }
    },
    [setSteps]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={steps.map((step) => step.id)}>
        <ol className="h-[350px] overflow-y-scroll p-0 pr-2">
          {steps.map((el, itemIdx) => (
            <StepsItem
              idx={itemIdx}
              onDelete={() =>
                setSteps((prev) => prev.filter((el, idx) => itemIdx !== idx))
              }
              key={el.id + el.content}
              choosed={choosedItemIndex === itemIdx}
              onUpdate={(data) => setChoosedItemIndex(data)}
              {...el}
            />
          ))}
        </ol>
      </SortableContext>
    </DndContext>
  );
};
