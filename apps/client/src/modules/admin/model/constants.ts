import { SERVICE_KEYS } from "@/shared";
import { IChoosedItemTabContent, IChooseItemTabContent } from "./interfaces/characteristics.interface";
import { IOption } from "./interfaces/mesure.interface";
export const measureOptions: IOption[] = [
  { value: 'KG', label: 'кг' },
  { value: 'N', label: 'шт' },
  { value: 'G', label: 'грамм' },
  { value: 'ML', label: 'милилитр' },
  { value: 'L', label: 'литр' }
];

export const CHOOSE_ITEM_TAB_LIST = [
  { label: 'типы', endpoint: SERVICE_KEYS.types },
  { label: 'праздники', endpoint: SERVICE_KEYS.holidays },
  { label: 'нацинональные кухни', endpoint: SERVICE_KEYS['national-cuisines'] },
] as IChooseItemTabContent[];

export const ACTION_TABS = [{ label: "Выбрать", value: "1" }, { label: "Выбраное", value: "2" }] as IChoosedItemTabContent[]