import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  usePutNationalCuisine,
  useDeleteNationalCuisine,
  useDeleteManyNationalCuisine,
  useGetNationalCuisines,
  usePostNationalCuisine,
} from '../../api/national-cuisine/queries';

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

  const { putNationalCuisine, putNationalCuisineIsLoading, putNationalCuisineIsError, putNationalCuisineIsSuccess } = usePutNationalCuisine();
  const { deleteNationalCuisine, deleteNationalCuisineIsError, deleteNationalCuisineIsLoading, deleteNationalCuisineIsSuccess } = useDeleteNationalCuisine();
  const { deleteManyNationalCuisines, deleteManyNationalCuisinesIsError, deleteManyNationalCuisinesIsLoading, deleteManyNationalCuisinesIsSuccess } = useDeleteManyNationalCuisine();
  const { nationalCuisines, nationalCuisinesIsLoading, nationalCuisinesIsError, nationalCuisinesIsSuccess, refetchNationalCuisines } = useGetNationalCuisines({ title: value, page: currentPage, limit });
  const { postNationalCuisine, postNationalCuisineIsError, postNationalCuisineIsLoading, postNationalCuisineIsSuccess } = usePostNationalCuisine();

  useEffect(() => {
    if (postNationalCuisineIsSuccess || deleteManyNationalCuisinesIsSuccess || putNationalCuisineIsSuccess) {
      refetchNationalCuisines();
    }
  }, [refetchNationalCuisines, postNationalCuisineIsSuccess, deleteManyNationalCuisinesIsSuccess, putNationalCuisineIsSuccess]);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const onChangePage = (newPage: number) => setCurrentPage(newPage);
  const onChangeLimit = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return {
    title,
    currentPage,
    onChangePage,
    limit,
    setLimit,
    put: putNationalCuisine,
    putIsLoading: putNationalCuisineIsLoading,
    putIsError: putNationalCuisineIsError,
    putIsSuccess: putNationalCuisineIsSuccess,
    deleteOne: deleteNationalCuisine,
    deleteIsLoading: deleteNationalCuisineIsLoading,
    deleteIsError: deleteNationalCuisineIsError,
    deleteIsSuccess: deleteNationalCuisineIsSuccess,
    deleteMany: deleteManyNationalCuisines,
    deleteManyIsLoading: deleteManyNationalCuisinesIsLoading,
    deleteManyIsError: deleteManyNationalCuisinesIsError,
    deleteManyIsSuccess: deleteManyNationalCuisinesIsSuccess,
    items: nationalCuisines,
    itemsIsLoading: nationalCuisinesIsLoading,
    itemsIsError: nationalCuisinesIsError,
    itemsIsSuccess: nationalCuisinesIsSuccess,
    refetch: refetchNationalCuisines,
    post: postNationalCuisine,
    postIsLoading: postNationalCuisineIsLoading,
    postIsError: postNationalCuisineIsError,
    postIsSuccess: postNationalCuisineIsSuccess,
    onChangeTitle,
    onChangeLimit,
  }
}