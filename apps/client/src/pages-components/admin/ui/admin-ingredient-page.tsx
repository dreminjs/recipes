import Link from 'next/link';
import {
  AdminPostIngredient,
  AdminIngredientsTable,
} from '../../../widgets/admin';
import { useState } from 'react';
import { useGetIngredients } from '../../../shared';
import { useDebounce } from 'use-debounce';

export const AdminIngredientPage = () => {
  const [title, setTitle] = useState('');

  const [value] = useDebounce(title, 500);

  const {
    ingredients,
    fetchNextPage,
    hasNextPage,
    ingredientsIsLoading,
    ingredientsIsError,
    ingredientsIsSuccess,
    refetchIngredients,
  } = useGetIngredients({ title: value });

  return (
    <div className="flex flex-col items-center">
      <Link className="mb-5 underline" href="ingredient/requests">
        Заявки
      </Link>
      <AdminPostIngredient refetch={refetchIngredients} />
      <AdminIngredientsTable ingredients={ingredients} />
    </div>
  );
};
