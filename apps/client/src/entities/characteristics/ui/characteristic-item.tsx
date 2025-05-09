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
      className={`w-full flex justify-between items-center bg-gray-200 rounded-lg py-3 px-4 mb-5 text-xl transition-colors ${
        isItemChoosed ? 'text-gray-600' : 'text-black'
      }`}
    >
      <button
        type="button"
        className="bg-transparent text-left text-lg cursor-pointer flex-1 hover:text-gray-700 focus:outline-none"
        onClick={onClick}
        aria-pressed={isItemChoosed}
      >
        {title}
      </button>
      {isItemChoosed && (
        <button
          type="button"
          className="px-3 rounded-lg text-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={`Удалить ${title}`}
        >
          ×
        </button>
      )}
    </li>
  );
};
