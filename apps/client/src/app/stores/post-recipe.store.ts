import { TCharacteristicPayload, TIngredientPayload, TStep } from '@/shared';
import { atom, createStore } from 'jotai';

export const nationalCuisineAtom = atom<TCharacteristicPayload | null>(null);
export const typeAtom = atom<TCharacteristicPayload | null>(null);

export const holidayAtom = atom<TCharacteristicPayload | null>(null);
export const ingredientsAtom = atom<TIngredientPayload[]>([]);
export const stepsAtom = atom<TStep[]>([])
export const postRecipeStore = createStore();
                                                                
postRecipeStore.set(nationalCuisineAtom, null);
postRecipeStore.set(typeAtom, null);
postRecipeStore.set(holidayAtom, null);
postRecipeStore.set(ingredientsAtom, []);
