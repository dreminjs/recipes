import { PostCharacteristicFormSchema  } from "../schemas/characteristic.schema";

import { z } from "zod";

export interface IGetCharacteristicsQueryParameters {
  title?: string;
  cursor: number;
  limit: number;
}


export type IPostCharacteristicForm =  z.infer<typeof PostCharacteristicFormSchema>;