import { RecipesItem, useGetRecipes } from '@/modules/recipe';
import { PaginatedList, usePagination } from '@/shared';
import { useRecipeFilteration } from '../../model/hooks/use-recipe-filteration';

export const AdminRecipesList = () => {
  const {
    holidaysIds,
    typesIds,
    nationalCuisinesIds,
    onChangeSearchValue,
    searchValue,
  } = useRecipeFilteration();

  const { page, onChangePage } = usePagination();

  const { data, isLoading } = useGetRecipes({
    types: typesIds,
    holidays: holidaysIds,
    nationalCuisines: nationalCuisinesIds,
    title: searchValue,
    page,
    limit: 15,
  });

  return (
    <PaginatedList
      {...{ isLoading }}
      fitler={{
        searchValue,
        onChangeSearchValue,
      }}
      pagination={{
        itemsCount: data?.itemsCount,
        length: data?.items.length,
        onChangePage,
        currentPage: page,
      }}
      divHeight='70vh'
    >
      {data?.items.map((el) => (
        <RecipesItem key={el.id} {...el} />
      ))}
    </PaginatedList>
  );
};
