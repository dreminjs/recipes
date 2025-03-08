/* eslint-disable @typescript-eslint/no-empty-function */
import { ICharacteristicPayload } from '@/shared*';
import { createContext } from 'react';

interface IContext {
  nationalCuisines: ICharacteristicPayload[];
  types: ICharacteristicPayload[];
  holidays: ICharacteristicPayload[];
  ingredients: ICharacteristicPayload[]
  onChooseIngredient:(payload:ICharacteristicPayload) => void
  onChooseHoliday:(payload:ICharacteristicPayload) => void
  onChooseType:(payload:ICharacteristicPayload) => void
  onRemoveIngredient:(id:string) => void
  onChooseNationalCuisine:(payload:ICharacteristicPayload) => void
  onRemoveHoliday:(id:string) => void
  onRemoveType:(id:string) => void
  onRemoveNationalCuisine:(id:string) => void
}

export const PostRecipeContext = createContext<IContext>({
  nationalCuisines: [],
  types: [],
  holidays: [],
  ingredients: [],
  onChooseIngredient:(payload) => {},
  onChooseHoliday: (payload) => {},
  onChooseNationalCuisine: (payload) => {},
  onChooseType: (payload) => {},
  onRemoveIngredient:(id: string) => {},
  onRemoveHoliday:(id: string) => {},
  onRemoveNationalCuisine:(id: string) => {},
  onRemoveType:(id: string) => {}
});
