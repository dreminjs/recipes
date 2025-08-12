import { useState } from 'react';
import { useGetIngredients } from '../../api/queries';

export const useIngredients = () => {
  const [searchValue, setSearchValue] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeSearchValue = (newValue: string) => {
    setSearchValue(newValue);
    setCurrentPage(0);
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
  };
};
