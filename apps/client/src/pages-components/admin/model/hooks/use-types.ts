import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  usePutType,
  useDeleteType,
  useDeleteManyTypes,
  useGetTypes,
  usePostType,
} from 'apps/client/src/shared';

export const useTypes = ({
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

  const { putType, putTypeIsLoading, putTypeIsError, putTypeIsSuccess } =
    usePutType();
  const {
    deleteType,
    deleteTypeIsLoading,
    deleteTypeIsError,
    deleteTypeIsSuccess,
  } = useDeleteType();
  const {
    deleteTypesIsSuccess,
    deleteTypes,
    deleteTypesIsLoading,
    deleteTypesIsError,
  } = useDeleteManyTypes();

  const { types, typesIsLoading, typesIsError, typesIsSuccess, refetchTypes } =
    useGetTypes({ title: value, page: currentPage, limit });

  const { postType, postTypeIsLoading, postTypeIsError, postTypeIsSuccess } =
    usePostType();

  useEffect(() => {
    if (postTypeIsSuccess || deleteTypesIsSuccess || putTypeIsSuccess) {
      refetchTypes();
    }
  }, [refetchTypes, postTypeIsSuccess, deleteTypesIsSuccess, putTypeIsSuccess]);

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
    onChangePage: handleChangePage,
    limit,
    setLimit,
    put: putType,
    putIsLoading: putTypeIsLoading,
    putIsError: putTypeIsError,
    putIsSuccess: putTypeIsSuccess,
    deleteOne: deleteType,
    deleteIsLoading: deleteTypeIsLoading,
    deleteIsError: deleteTypeIsError,
    deleteIsSuccess: deleteTypeIsSuccess,
    deleteMany:deleteTypes,
    deleteManyIsSuccess: deleteTypesIsSuccess,
    deleteManyIsLoading: deleteTypesIsLoading,
    deleteManyIsError: deleteTypesIsError,
    items: types,
    itemsIsLoading: typesIsLoading,
    itemsIsError: typesIsError,
    itemsIsSuccess: typesIsSuccess,
    refetch: refetchTypes,
    post: postType,
    postIsLoading: postTypeIsLoading,
    postIsError: postTypeIsError,
    postIsSuccess: postTypeIsSuccess,
    onChangeTitle: handleChangeTitle,
    onChangeLimit: handleChangeLimit,
  };
};
