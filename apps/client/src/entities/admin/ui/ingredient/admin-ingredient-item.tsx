import { Measure } from 'prisma/prisma-client';
import { FC } from 'react';

interface IProps {
  title: string;
  measure: Measure;
}

const measures = {
  KG: 'кг',
  N: 'шт',
  G: 'грамм',
  ML: 'милилитр',
  L: 'литр',
};

export const AdminIngredientItem: FC<IProps> = ({ title, measure }) => {
  return (
    <li className="w-[400px] flex justify-between mb-4 border-2 p-2">
      <p className="text-[32px]">{title}</p>
      <p className="text-[32px]">{measures[measure]}</p>
    </li>
  );
};