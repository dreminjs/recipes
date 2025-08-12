import { measuresObj } from '@/shared';
import { Ingredient } from '@prisma/client';
import { FC, useRef } from 'react';
import { InputAmount } from './input-amount';
import { useSetAtom } from 'jotai';
import { ingredientsAtom } from '@/app';

type Props = Ingredient & {
  onChoose: (data: string | null) => void;
  choosed: boolean;
  isAlreadyAdded: boolean;
};

export const IngredientItem: FC<Props> = (props) => {
  const containerRef = useRef<HTMLLIElement>(null);

  const setIngredients = useSetAtom(ingredientsAtom);

  return (
    <li
      ref={containerRef}
      className="text-left px-5 py-2 border border-gray-200 rounded-xl text-xl mb-2"
    >
      {!props.isAlreadyAdded ? (
        <>
          {!props.choosed ? (
            <button
              onClick={() => props.onChoose(props.id)}
              className="bg-transparent w-full text-left"
            >
              {props.title} ({measuresObj[props.measure]})
            </button>
          ) : (
            <InputAmount
              id={props.id}
              title={props.title}
              onHideInput={() => props.onChoose(null)}
              containerRef={containerRef}
              measure={props.measure}
            />
          )}
        </>
      ) : (
        <div className="flex justify-between">
          <p className="bg-transparent w-full text-left">
            {props.title} ({measuresObj[props.measure]})
          </p>
          <button
            onClick={() =>
              setIngredients((prev) =>
                prev.filter((filterEl) => filterEl.id !== props.id)
              )
            }
            className="bg-transparent"
          >
            ❌
          </button>
        </div>
      )}

      {props.isAlreadyAdded && true}
    </li>
  );
};
