import { ICharacteristic } from '@/shared*';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import {
  holidayAtom,
  nationalCuisineAtom,
  typeAtom,
} from 'src/application/stores/post-recipe.store';

type IProps = {
  onClick: () => void;
} & ICharacteristic;

export const CharacteristicItem: FC<IProps> = ({ title, id, onClick }) => {
  const nationalCuisine = useAtomValue(nationalCuisineAtom);
  const holiday = useAtomValue(holidayAtom);
  const type = useAtomValue(typeAtom);

  const isItemChoosed =
    type?.id == id || holiday?.id === id || nationalCuisine?.id === id;

  return (
    <li
      className={`flex mb-3 items-center shadow-sm border-amber-300 justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer ${
        isItemChoosed
          ? 'bg-amber-50 border-2  '
          : 'bg-white border border-gray-200 hover:border-amber-200 hover:shadow-xs'
      }`}
    >
      <button
        type="button"
        className={`flex-1 text-left text-base bg-transparent ${
          isItemChoosed ? 'font-semibold text-amber-800' : 'text-gray-800'
        }`}
        onClick={onClick}
        aria-pressed={isItemChoosed}
      >
        {title}
      </button>

      {isItemChoosed && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();                                    
          }}
          className="ml-2 w-6 h-6 flex items-center justify-center rounded-full transition-colors
                      bg-amber-100 text-amber-600 hover:bg-amber-200 hover:text-amber-800
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
          aria-label={`Удалить ${title}`}
        >
          <span className="text-sm leading-none">×</span>
        </button>
      )}
    </li>
  );
};
