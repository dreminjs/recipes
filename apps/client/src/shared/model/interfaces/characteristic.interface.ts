import {
  Measure,
  Type,
} from '@prisma/client';
import { PostCharacteristicFormSchema } from '../schemas/characteristic.schema';
import { z } from 'zod';

export interface IGetCharacteristicsQueryParameters {
  title?: string;
  page: number;
  limit: number;
}

export type IPostCharacteristicForm = z.infer<
  typeof PostCharacteristicFormSchema
>;

export interface ICharacteristic extends Type {
  measure?: Measure
}


export interface UpdateCharacteristicDto {
  payload: string | boolean
  id: string 
}

export type ICharacteristicPayload = Omit<ICharacteristic, 'createdAt' | 'isVisible'>


export type ICharacteristicsTableCoordinats = {
  coloumnIdx: number;
  rowIdx: number;
}

