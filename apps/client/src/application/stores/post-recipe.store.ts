import { ICharacteristicPayload } from '@/shared*';
import { atom, createStore } from 'jotai';

export const nationalCuisineAtom = atom<ICharacteristicPayload | null>(null);
export const typeAtom = atom<ICharacteristicPayload | null>(null);

export const holidayAtom = atom<ICharacteristicPayload | null>(null);
export const ingredientsAtom = atom<ICharacteristicPayload[]>([]);

export const postRecipeStore = createStore();

postRecipeStore.set(nationalCuisineAtom, null);
postRecipeStore.set(typeAtom, null);
postRecipeStore.set(holidayAtom, null);
postRecipeStore.set(ingredientsAtom, []);
