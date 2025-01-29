import { IItemsPaginationResponse } from "interfaces";
import { NationalCuisine, Holiday, Type } from "prisma/prisma-client";
import { PostCharacteristicFormSchema  } from "../schemas/characteristic.schema";

import { z } from "zod";

export interface IGetCharacteristicsQueryParameters {
  title?: string;
  page: number;
  limit: number;
}


export type IPostCharacteristicForm =  z.infer<typeof PostCharacteristicFormSchema>;

export type CharacteristicsPayload = IItemsPaginationResponse<Type> | IItemsPaginationResponse<NationalCuisine> | IItemsPaginationResponse<Holiday> | undefined

export type ICharacteristicsTableCoordinats = {
  coloumnIdx: number 
  rowIdx: number 
} | null