import { useState } from 'react';
import { useGetIngredients } from '../../api/queries';
import { useAtomValue } from 'jotai';
import { ingredientsAtom } from '@/app';

export const useIngredients = () => {
  const [searchValue, setSearchValue] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeSearchValue = (newValue: string) => {
    setSearchValue(newValue);
    setCurrentPage(1);
  };

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchValue('');
  };

  const apiStates = useGetIngredients({
    title: searchValue,
    page: currentPage,
    limit: 10,
  });

  const choosedIngredients = useAtomValue(ingredientsAtom)
  
  return {
    apiStates,
    filter: {
      onChangeSearchValue: handleChangeSearchValue,
      searchValue,
    },
    pagination: {
      currentPage,
      onChangePage: handleChangePage,
    },
    choosedIngredients
  };
};
