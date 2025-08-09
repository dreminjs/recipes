import { IStep } from 'interfaces';
import { FC, useCallback, useEffect, useRef } from 'react';
import { UpdateStepItemForm } from './update-step-item-form';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type Props = {
  id: string;
  content: string;
  choosed: boolean;
  onUpdate: (index: number | null) => void;
  onDelete: () => void;
  idx: number;
} & IStep;

export const StepsItem: FC<Props> = ({
  content,
  choosed,
  onUpdate,
  onDelete,
  idx,
  id,
}) => {
  const internalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!choosed) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        internalRef.current &&
        !internalRef.current.contains(e.target as Node)
      ) {
        onUpdate(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [choosed, onUpdate]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = !choosed
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
      }
    : undefined;

  const setCombinedRefs = useCallback(
    (node: HTMLDivElement | null) => {
      (internalRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node;
      setNodeRef(node);
    },
    [setNodeRef]
  );

  return (
    <li
      className="w-full flex items-center py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
      style={style}
    >
      {choosed ? (
        <UpdateStepItemForm
          currentItemIdx={idx}
          defualtContentValue={content}
          onHideInput={() => onUpdate(null)}
        />
      ) : (
        <>
          <div
            {...(!choosed ? attributes : {})}
            {...(!choosed ? listeners : {})}
            ref={setCombinedRefs}
            className="py-2 px-3 basis-3/4 text-gray-70 w-32"
          >
            {content}
          </div>
          <div className="flex justify-evenly basis-1/4">
            <button
              onClick={() => onUpdate(idx)}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete()}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              ❌
            </button>
          </div>
        </>
      )}
    </li>
  );
};
