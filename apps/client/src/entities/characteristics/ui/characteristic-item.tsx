import { ICharacteristic } from '@/shared*';
import { FC } from 'react';

type IProps = {
  onClick: () => void;
} & ICharacteristic;

export const CharacteristicItem: FC<IProps> = ({
  title,
  id,
  onClick,
}) => {
  return (
    <li className=''>
      <button className='p-2 mb-5 text-[20px] cursor-pointer' onClick={() => onClick()}>
        {title}
      </button>
    </li>
  );
};
