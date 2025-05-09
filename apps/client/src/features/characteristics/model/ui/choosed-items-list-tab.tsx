import { ICharacteristic, measuresObj } from '@/shared*';
import { FC } from 'react';

type IProps = {
  onRemove: () => void;
  id?: string;
} & Partial<ICharacteristic>;

export const ChoosedItemsListTab: FC<IProps> = ({
  onRemove,
  title,
  measure,
  id,
}) => {
  return (
    <li className="flex items-center justify-between bg-gray-50 rounded-lg p-3 transition-colors hover:bg-gray-100 max-w-full">
      {!title ? (
        <p className="text-gray-400 italic">Не выбрано</p>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">{title}</span>
            {measure && (
              <span className="text-sm text-gray-500">
                {measuresObj[measure]}
              </span>
            )}
          </div>
          <button
            {...(id && { id })}
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-200"
            aria-label="Удалить"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      )}
    </li>
  );
};
