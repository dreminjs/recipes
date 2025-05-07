import { ICharacteristic, measuresObj } from '@/shared*';
import { FC } from 'react';

type IProps = {
  onRemove: () => void;
  id?: string;
} & Partial<ICharacteristic>;

export const ChoosedItemsLitsItemTab: FC<IProps> = ({
  onRemove,
  title,
  measure,
  id,
}) => {
  return (
    <li className="w-[200px] flex justify-between mb-5">
      {!title ? (
        <p>вы еще не выбрали!</p>
      ) : (
        <>
          <p className="text-[20px]">{title}</p>
          <>{measure && `- ${measuresObj[measure]}`}</>
          <button
            {...(id && { id: id })}
            onClick={() => onRemove()}
            className="text-[red] text-[20px]"
          >
            X
          </button>
        </>
      )}
    </li>
  );
};
