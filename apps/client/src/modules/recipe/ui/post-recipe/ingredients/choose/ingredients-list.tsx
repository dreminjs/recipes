import { PaginatedList } from '@/shared';
import { IngredientItem } from './ingredient-item';
import { useIngredients } from '@/modules/ingredients/';
import { useState } from 'react';

export const IngredietsList = () => {
  const {
    apiStates: { data, isLoading, error },
    pagination: { onChangePage, currentPage },
    filter: { searchValue, onChangeSearchValue },
  } = useIngredients();

  const [choosedIngredientId, setChoosedIngredientId] = useState<string | null>(
    null
  );

  return (
    <PaginatedList
      isLoading={isLoading}
      error={error?.message}
      fitler={{
        searchValue,
        onChangeSearchValue,
      }}
      pagination={{
        itemsCount: data?.itemsCount,
        length: data?.items?.length,
        onChangePage,
        currentPage,
      }}
    >
      {data?.items.map((el) => (
        <IngredientItem
          choosed={el.id === choosedIngredientId}
          onChoose={(data) => setChoosedIngredientId(data)}
          key={el.id}
          {...el}
        />
      ))}
    </PaginatedList>
  );
};
