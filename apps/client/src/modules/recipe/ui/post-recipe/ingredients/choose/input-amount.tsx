import { ingredientsAtom } from '@/app';
import { Func, measuresObj } from '@/shared';
import { Ingredient } from '@prisma/client';
import { useSetAtom } from 'jotai';
import { FC, RefObject, useEffect, useState } from 'react';

type Props = Omit<Ingredient, 'isVisible' | 'createdAt'> & {
  onHideInput: Func;
  containerRef: RefObject<HTMLLIElement>;
};

export const InputAmount: FC<Props> = (props) => {
  const [amount, setAmout] = useState(1);

  const setIngredients = useSetAtom(ingredientsAtom);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        props.containerRef.current &&
        !props.containerRef.current.contains(e.target as Node)
      ) {
        props.onHideInput();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [props]);

  const handleConfirm = () => {
    if (amount) {
      setIngredients((prev) => [
        ...prev,
        { title: props.title, id: props.id, measure: props.measure, amount },
      ]);
      props.onHideInput();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className='basis-4/6'>
        <label className='block text-[14px]' htmlFor="input-form">{`${props.title} - ${
          measuresObj[props.measure]
        }`}</label>
        <input
          type="number"
          value={amount}
          id="input-form"
          onChange={(e) => setAmout(+e.target.value)}
          min={1}
          max={99}
          placeholder="введите кол-во"
          className="w-full border-b-2 outline-none"
        />
      </div>
      <div>
        <button
          onClick={() => handleConfirm()}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
        >
          ✅
        </button>
        <button
          onClick={() => props.onHideInput()}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        >
          ❌
        </button>
      </div>
    </div>
  );
};
