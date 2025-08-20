import { Ingredient, Type } from '@prisma/client';
import { PostCharacteristicFormSchema } from '../schemas/characteristic.schema';
import { z } from 'zod';
import { IPaginationQueryParameters } from './api.interface';

export interface IGetCharacteristicsQueryParameters extends IPaginationQueryParameters {
  title?: string;
}

export type IPostCharacteristicForm = z.infer<
  typeof PostCharacteristicFormSchema
>;

export type TCharacteristic = Omit<Type, "createdAt" | "isVisbile">

export type TIngredient = Omit<Ingredient, "createdAt" | "isVisbile">

export interface UpdateCharacteristicDto {
  payload: string | boolean;
  id: string;
}

export type TCharacteristicPayload = Omit<
  TCharacteristic,
  'createdAt' | 'isVisible'
> & {
  amount?: number
}

export type TIngredientPayload = Omit<
  TIngredient,
  'createdAt' | 'isVisible'
> & {
  amount: number
}

export type ICharacteristicsTableCoordinats = {
  coloumnIdx: number;
  rowIdx: number;
};
