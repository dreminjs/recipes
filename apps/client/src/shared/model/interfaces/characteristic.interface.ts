import { IItemsPaginationResponse } from '@/interfaces';
import {
  Measure,
} from 'prisma/prisma-client';
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

export interface ICharacteristic {
  createdAt: Date
  title: string
  id: string
  isVisible: boolean
  measure?: Measure
} 

export type ICharacteristicPayload = Omit<ICharacteristic, 'createdAt' | 'isVisible'>

export type CharacteristicsPayload = IItemsPaginationResponse<ICharacteristic>

export type ICharacteristicsTableCoordinats = {
  coloumnIdx: number;
  rowIdx: number;
} | null;

