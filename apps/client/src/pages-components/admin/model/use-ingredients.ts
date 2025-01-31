import { useGetIngredients } from 'apps/client/src/shared';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useIngredients = () => {
  const [title, setTitle] = useState('');

  const [value] = useDebounce(title, 500);

  const { ingredients } = useGetIngredients({ page: 0, limit: 5 });

  return { title, ingredients };
};
