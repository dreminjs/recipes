import { Ingredient } from 'prisma/prisma-client';
import { AdminIngredientItem } from '../../../../entities/admin';
import { FC } from 'react';
import { IInfiniteScrollResponse } from 'interfaces';
import { InfiniteData } from '@tanstack/react-query';

import {} from '../../../../shared';
import { optionsObj } from '../../../../features/measure/model/measure-options';

interface IProps {
  ingredients?: InfiniteData<IInfiniteScrollResponse<Ingredient>> | undefined;
}

export const AdminIngredientsTable: FC<IProps> = ({ ingredients }) => {
  return 123;
};
