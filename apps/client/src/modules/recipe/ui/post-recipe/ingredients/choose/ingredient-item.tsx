import { measuresObj } from '@/shared';
import { Ingredient } from '@prisma/client';
import { FC, useRef } from 'react';
import { InputAmount } from './input-amount';

type Props = Ingredient & {
  onChoose: (data: string | null) => void;
  choosed: boolean;
};

export const IngredientItem: FC<Props> = (props) => {
  const containerRef = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={containerRef}
      className="text-left px-5 py-2 border border-gray-200 rounded-xl text-xl mb-2"
    >
      {!props.choosed ? (
        <>
          <button
            onClick={() => props.onChoose(props.id)}
            className="bg-transparent w-full text-left"
          >
            {props.title} ({measuresObj[props.measure]})
          </button>
        </>
      ) : (
        <InputAmount
          id={props.id}
          title={props.title}
          onHideInput={() => props.onChoose(null)}
          containerRef={containerRef}
          measure={props.measure}
        />
      )}
    </li>
  );
};
