import { SERVICE_KEYS } from '@/shared*';
import { IChoosedItemTabContent, IChooseItemTabContent } from './interfaces';

export const CHOOSE_ITEM_TAB_LIST = [
  { label: 'типы', endpoint: SERVICE_KEYS.types },
  { label: 'праздники', endpoint: SERVICE_KEYS.holidays },
  { label: 'нацинональные кухни', endpoint: SERVICE_KEYS['national-cuisines'] },
] as IChooseItemTabContent[];
// 
