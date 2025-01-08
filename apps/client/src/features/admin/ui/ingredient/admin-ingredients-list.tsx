import { Ingredient } from 'prisma/prisma-client';
import { AdminIngredientItem } from '../../../../entities/admin';
import { FC } from 'react';
import { InfiniteScrollResponse } from 'interfaces';
import { InfiniteData } from '@tanstack/react-query';

interface IProps {
  ingredients?: InfiniteData<InfiniteScrollResponse<Ingredient>>;
}

export const AdminIngredientsList: FC<IProps> = ({ ingredients }) => {
  return (
    <ul className='list-none'>
      {ingredients?.pages?.map((page) =>
        page?.data?.map((ingredient) => (
          <AdminIngredientItem
            key={ingredient.id}
            measure={ingredient.measure}
            title={ingredient.title}
          />
        ))
      )}
    </ul>
  );
};
