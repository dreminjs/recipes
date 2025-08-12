import { IStep } from 'interfaces';
import { FC, useCallback, useEffect, useRef } from 'react';
import { UpdateStepItemForm } from './update-step-item-form';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CharacteristicItemInfo } from '../characteristic-item-info';

export type Props = {
  id: string;
  content: string;
  choosed: boolean;
  onUpdate: (id: string | null) => void;
  onDelete: (id: string) => void;
} & IStep;

export const StepsItem: FC<Props> = ({
  content,
  choosed,
  onUpdate,
  onDelete,
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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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
          currentItemId={id}
          defualtContentValue={content}
          onHideInput={() => onUpdate(null)}
        />
      ) : (
        <>
          <CharacteristicItemInfo
            {...{choosed, content}}
            attributes={attributes}
            listeners={listeners}
            setCombinedRefs={setCombinedRefs}
            onUpdate={() => onUpdate(id)}
            onDelete={() => onDelete(id)}
          />
        </>
      )}
    </li>
  );
};
