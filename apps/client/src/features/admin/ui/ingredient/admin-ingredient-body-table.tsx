import { TableBody } from '@mui/material';
import { Ingredient } from 'prisma/prisma-client';
import { FC } from 'react';

interface IProps {
  items: Ingredient[];
}

export const AdminIngredientBodyTable: FC<IProps> = ({ items }) => {
  return <TableBody></TableBody>;
};
