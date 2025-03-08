import { FC, PropsWithChildren, useState } from 'react';
import { PostRecipeContext } from '../context/post-recipe.context';
import { ICharacteristicPayload } from '@/shared*';

export const PostRecipeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [nationalCuisines, setNationalCuisines] = useState<
    ICharacteristicPayload[]
  >([]);

  const [types, setTypes] = useState<ICharacteristicPayload[]>([]);

  const [holidays, setHolidays] = useState<ICharacteristicPayload[]>([]);

  const [ingredients, setIngredients] = useState<ICharacteristicPayload[]>([]);

  const handleChooseIngredient = (payload: ICharacteristicPayload) => {
    setIngredients((prev) => [...prev, payload]);
  };

  const handleChooseType = (payload: ICharacteristicPayload) => {
    setTypes((prev) => [...prev, payload]);
  };
  const handleChooseHoliday = (payload: ICharacteristicPayload) => {
    setHolidays((prev) => [...prev, payload]);
  };
  const handleChooseNationalCuisines = (payload: ICharacteristicPayload) => {
    setNationalCuisines((prev) => [...prev, payload]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients((prev) => [...prev.filter((el) => el.id !== id)]);
  };

  const handleRemoveType = (id: string) => {
    setTypes((prev) => [...prev.filter((el) => el.id !== id)]);
  };

  const handleRemoveHoliday = (id: string) => {
    setHolidays((prev) => [...prev.filter((el) => el.id !== id)]);
  };

  const handleRemoveNationalCuisine = (id: string) => {
    setNationalCuisines((prev) => [...prev.filter((el) => el.id !== id)]);
  };

  return (
    <PostRecipeContext.Provider
      value={{
        nationalCuisines,
        types,
        holidays,
        ingredients,
        onChooseIngredient: handleChooseIngredient,
        onChooseType: handleChooseType,
        onChooseHoliday: handleChooseHoliday,
        onChooseNationalCuisine: handleChooseNationalCuisines,
        onRemoveIngredient: handleRemoveIngredient,
        onRemoveType: handleRemoveType,
        onRemoveHoliday: handleRemoveHoliday,
        onRemoveNationalCuisine: handleRemoveNationalCuisine,
      }}
    >
      {children}
    </PostRecipeContext.Provider>
  );
};
