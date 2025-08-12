import { FC } from 'react';
import { CharacteristicItemInfo } from '../../characteristic-item-info';
import { UpdateIngredientInfoForm } from './update-ingredient-info-form';
import { measuresObj, TIngredientPayload } from '@/shared';

type Props = TIngredientPayload & {
  choosed: boolean;
  onUpdate: (data: string | null) => void;
  onDelete: () => void;
};

export const ChoosedIngredientsItem: FC<Props> = (props) => {
  return (
    <li className="flex mb-4 border-b border-gray-100 hover:bg-gray-50 transition-colors py-2">
      {!props.choosed ? (
        <>
          <CharacteristicItemInfo
            choosed={props.choosed}
            content={`${props.title} - ${props.amount} ${
              measuresObj[props.measure]
            }.`}
            onUpdate={() => props.onUpdate(props.id)}
            onDelete={props.onDelete}
          />
        </>
      ) : (
        <UpdateIngredientInfoForm
          amount={props.amount}
          ingredientName={props.title}
          measure={props.measure}
          currentId={props.id}
          onHideInput={() => props.onUpdate(null)}
        />
      )}
    </li>
  );
};
