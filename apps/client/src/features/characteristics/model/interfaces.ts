import { Characteristics } from '@/interfaces*';

export interface IChooseItemTabContent {
  label: string;
  endpoint: Characteristics;
}

export interface IChoosedItemTabContent {
  label: "другие характеристики" | "ингридиенты"
}
