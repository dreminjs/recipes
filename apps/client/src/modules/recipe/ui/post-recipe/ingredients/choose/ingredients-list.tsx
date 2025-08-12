import { PaginatedList } from '@/shared';
import { IngredientItem } from './ingredient-item';
import { useIngredients } from '@/modules/ingredients/';
import { useState } from 'react';

export const IngredietsList = () => {
  const {
    apiStates: { data, isLoading, error },
    pagination: { onChangePage, currentPage },
    filter: { searchValue, onChangeSearchValue },
    choosedIngredients,
  } = useIngredients();

  const [ingredientIdToAdd, setIngredientIdToAdd] = useState<string | null>(
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
          isAlreadyAdded={choosedIngredients.some(
            (choosedEl) => choosedEl.id === el.id
          )}
          choosed={el.id === ingredientIdToAdd}
          onChoose={(data) => setIngredientIdToAdd(data)}
          key={el.id}
          {...el}
        />
      ))}
    </PaginatedList>
  );
};
