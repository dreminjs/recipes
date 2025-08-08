import { IStep } from 'interfaces';
import { FC, useEffect, useRef } from 'react';
import { UpdateStepItemForm } from './update-step-item-form';

type Props = IStep & {
  choosed: boolean;
  onUpdate: (index: number | null) => void;
  onDelete: () => void;
  idx: number;
};

export const StepsItem: FC<Props> = ({
  content,
  choosed,
  onUpdate,
  onDelete,
  idx,
}) => {
  const containerRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!choosed) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onUpdate(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [choosed, onUpdate]);

  return (
    <li
      ref={containerRef}
      className="w-full flex items-center justify-between py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      {choosed ? (
        <UpdateStepItemForm
          currentItemIdx={idx}
          defualtContentValue={content}
          handleHideInput={() => onUpdate(null)}
        />
      ) : (
        <>
          <div className="py-2 px-3 text-gray-700 flex-1 truncate">
            {content}
          </div>
          <div className="flex gap-1">
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
