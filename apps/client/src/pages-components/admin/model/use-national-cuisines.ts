import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  usePutNationalCuisine,
  useDeleteNationalCuisine,
  useDeleteManyNationalCuisine,
  useGetNationalCuisines,
  usePostNationalCuisine,
} from 'apps/client/src/shared';

export const useNationalCuisines = ({
  initialTitle,
  initialPage,
  initialLimit,
}: {
  initialTitle: string;
  initialPage: number;
  initialLimit: number;
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [value] = useDebounce(title, 500);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const {
    putNationalCuisine,
    putNationalCuisineIsLoading,
    putNationalCuisineIsError,
    putNationalCuisineIsSuccess,
  } = usePutNationalCuisine();
  const {
    deleteNationalCuisine,
    deleteNationalCuisineIsError,
    deleteNationalCuisineIsLoading,
    deleteNationalCuisineIsSuccess,
  } = useDeleteNationalCuisine();
  const {
    deleteManyNationalCuisines,
    deleteManyNationalCuisinesIsError,
    deleteManyNationalCuisinesIsLoading,
    deleteManyNationalCuisinesIsSuccess,
  } = useDeleteManyNationalCuisine();

  const {
    nationalCuisines,
    nationalCuisinesIsLoading,
    nationalCuisinesIsError,
    nationalCuisinesIsSuccess,
    refetchNationalCuisines,
  } = useGetNationalCuisines({ title: value, page: currentPage, limit });

  const {
    postNationalCuisine,
    postNationalCuisineIsError,
    postNationalCuisineIsLoading,
    postNationalCuisineIsSuccess,
  } = usePostNationalCuisine();

  useEffect(() => {
    if (
      postNationalCuisineIsSuccess ||
      deleteManyNationalCuisinesIsError ||
      putNationalCuisineIsSuccess
    ) {
      refetchNationalCuisines();
    }
  }, [
    refetchNationalCuisines,
    postNationalCuisineIsSuccess,
    deleteManyNationalCuisinesIsSuccess,
    putNationalCuisineIsSuccess,
  ]);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeLimit = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return {
    title,
    currentPage,
    handleChangePage,
    limit,
    setLimit,
    putNationalCuisine,
    putNationalCuisineIsLoading,
    putNationalCuisineIsError,
    putNationalCuisineIsSuccess,
    deleteNationalCuisine,
    deleteNationalCuisineIsLoading,
    deleteNationalCuisineIsError,
    deleteNationalCuisineIsSuccess,
    deleteManyNationalCuisines,
    deleteManyNationalCuisinesIsError,
    deleteManyNationalCuisinesIsLoading,
    deleteManyNationalCuisinesIsSuccess,
    nationalCuisines,
    nationalCuisinesIsLoading,
    nationalCuisinesIsError,
    nationalCuisinesIsSuccess,
    postNationalCuisine,
    postNationalCuisineIsError,
    postNationalCuisineIsLoading,
    postNationalCuisineIsSuccess,
    handleChangeTitle,
    handleChangeLimit,
  };
};
