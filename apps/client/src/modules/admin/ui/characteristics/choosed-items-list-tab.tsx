import { ICharacteristic, measuresObj } from '@/shared/';
import { Characteristics } from 'interfaces';
import { FC } from 'react';

type IProps = {
  onRemove: () => void;
  id?: string;
  type: Characteristics;
} & Partial<ICharacteristic>;

export const ChoosedItemsListTab: FC<IProps> = ({
  onRemove,
  title,
  measure,
  id,
  type,
}) => {
  const typeLabels = {
    holidays: 'Праздник',
    types: 'Тип блюда',
    'national-cuisines': 'Кухня',
    ingredients: 'ингридиенты',
  };

  return (
    <div className="bg-amber-50 rounded-xl border border-orange-100 overflow-hidden">
      <div className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium">
        {typeLabels[type]}
      </div>

      {/* Содержимое */}
      <div className="p-3">
        {!title ? (
          <p className="text-amber-400 italic">Не выбрано</p>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="font-medium text-amber-900 truncate">
                {title}
              </span>
              {measure && (
                <span className="text-sm text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                  {measuresObj[measure]}
                </span>
              )}
            </div>
            <button
              {...(id && { id })}
              onClick={onRemove}
              className="
    bg-amber-500 hover:bg-amber-600
    text-white
    px-2 py-1
    rounded-full
    text-xs
    transition-colors
  "
              aria-label="Удалить"
            >
              Убрать
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
