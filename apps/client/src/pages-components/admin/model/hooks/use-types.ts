import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  usePutType,
  useDeleteType,
  useDeleteManyTypes,
  useGetTypes,
  usePostType,
} from '../../api/type/queries';

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
    
  const handleChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value),[])

  const handleChangePage = useCallback((newPage: number) => {
    if (newPage >= 0 && newPage < Math.ceil((types?.countItems || 0) / limit)) {
      setCurrentPage(newPage);
    }
  },[limit, types?.countItems])

  useEffect(() => {
    if (typesIsSuccess && types?.countItems === 0 && currentPage > 0) {
      setCurrentPage(0);
    }
  }, [types, typesIsSuccess, currentPage]);

  useEffect(() => {
    if (postTypeIsSuccess || deleteTypesIsSuccess || putTypeIsSuccess) {
      refetchTypes();
    }
  }, [refetchTypes, postTypeIsSuccess, deleteTypesIsSuccess, putTypeIsSuccess]);

  const handleChangeLimit = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  },[])

  const isLoading = deleteTypeIsLoading || putTypeIsLoading || postTypeIsLoading || deleteTypesIsLoading

  const isSuccess = deleteTypeIsSuccess || putTypeIsSuccess || postTypeIsSuccess || deleteTypesIsSuccess

  const isError = deleteTypeIsSuccess || putTypeIsSuccess || postTypeIsSuccess || deleteTypeIsError || postTypeIsError || putTypeIsError

  return {
    title,
    currentPage: Math.min(currentPage, Math.max(0, Math.ceil((types?.countItems || 0) / limit) - 1)),
    onChangePage: handleChangePage,
    limit,
    setLimit,
    put: putType,
    deleteOne: deleteType,
    deleteMany:deleteTypes,
    deleteManyIsError: deleteTypesIsError,
    items: types,
    itemsIsLoading: typesIsLoading,
    itemsIsError: typesIsError,
    itemsIsSuccess: typesIsSuccess,
    refetch: refetchTypes,
    post: postType,
    onChangeTitle: handleChangeTitle,
    onChangeLimit: handleChangeLimit,
    isLoading,
    isSuccess,
    isError
  };
};
