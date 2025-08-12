/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ingredientsAtom } from '@/app';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ChoosedIngredientsItem } from './choosed-ingredients-item';

export const ChoosedIngredientsList = () => {
  const [ingredients, setIngredients] = useAtom(ingredientsAtom);

  const [choosedItemId, setChoosedItemId] = useState<string | null>(null);

  return (
    <ul className="list-none h-[350px] overflow-y-scroll p-0 pr-2">
      {ingredients.map((el) => {
        return (
          <ChoosedIngredientsItem
            key={el.id}
            id={el.id}
            title={el.title}
            measure={el.measure}
            choosed={el.id === choosedItemId}
            onUpdate={(data) => setChoosedItemId(data)}
            onDelete={() =>
              setIngredients((prev) =>
                prev.filter((filterEl) => filterEl.id !== el.id)
              )
            }
            amount={el.amount}
          />
        );
      })}
    </ul>
  );
};
