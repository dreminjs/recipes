import { Measure } from '@prisma/client';
export interface IOption {
  value: Measure;
  label: 'кг' | 'шт' | 'грамм' | 'милилитр' | 'литр';
}
