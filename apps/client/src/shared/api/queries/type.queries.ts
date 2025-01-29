import { useMutation, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { typeService } from '../services/type.service';
import { Prisma } from 'prisma/prisma-client';
import { useContext } from 'react';
import { CharacteristicsContext } from '../../model/context/characteristics.context';
import { useCharacteristics } from '../../model/hooks/use-characteristics';

export const useGetTypes = ({
  title,
  page,
  limit,
}: {
  title?: string;
  page: number;
  limit: number;
}) => {
  const { onSetCharacterstics } = useCharacteristics()

  const {
    data: types,
    isLoading: typesIsLoading,
    isSuccess: typesIsSuccess,

    isError: typesIsError,
    refetch: refetchTypes,
  } = useQuery({
    queryKey: [QUERY_KEYS.type, page, title, limit],
    queryFn: () => typeService.findMany({ limit, page, title }),
    onSuccess: (data) =>
      onSetCharacterstics({
        items: [...data.items],
        countItems: data.countItems,
        currentPage: data.currentPage,
      }),
  });

  return {
    types,
    typesIsLoading,
    typesIsError,
    typesIsSuccess,
    refetchTypes,
  };
};

export const usePostType = () => {
  const {
    mutate: postType,
    isLoading: postTypeIsLoading,
    isError: postTypeIsError,
    isSuccess: postTypeIsSuccess,
  } = useMutation({
    mutationFn: (data: Prisma.TypeCreateInput) =>
      typeService.createOne({ ...data }),
    mutationKey: [QUERY_KEYS.type],
  });

  return { postType, postTypeIsLoading, postTypeIsError, postTypeIsSuccess };
};

export const useDeleteType = () => {
  const {
    mutate: deleteType,
    isLoading: deleteTypeIsLoading,
    isError: deleteTypeIsError,
    isSuccess: deleteTypeIsSuccess,
  } = useMutation({
    mutationFn: (id: string) => typeService.deleteOne({ id }),
    mutationKey: [QUERY_KEYS.type],
  });
  return {
    deleteTypeIsSuccess,
    deleteTypeIsError,
    deleteTypeIsLoading,
    deleteType,
  };
};

export const usePutType = () => {
  const { onHideInputCell } = useCharacteristics()

  const {
    mutate: putType,
    isLoading: putTypeIsLoading,
    isError: putTypeIsError,
    isSuccess: putTypeIsSuccess,
  } = useMutation({
    mutationFn: ({ data, id }: { data: Prisma.TypeUpdateInput; id: string }) =>
      typeService.updateOne({ id }, data),
    mutationKey: [QUERY_KEYS.type],
    onSuccess: () => onHideInputCell(),
  });

  return { putType, putTypeIsLoading, putTypeIsError, putTypeIsSuccess };
};

export const useDeleteManyTypes = () => {
  const { onToggleAllCharacteristics } = useCharacteristics()

  const {
    mutate: deleteTypes,
    isLoading: deleteTypesIsLoading,
    isSuccess: deleteTypesIsSuccess,
    isError: deleteTypesIsError,
  } = useMutation({
    mutationFn: (ids: string[]) => typeService.deleteMany(ids),
    mutationKey: [QUERY_KEYS.type],
    onSuccess:() => {
      // onToggleAllCharacteristics()
    }
  });

  return {
    deleteTypes,
    deleteTypesIsSuccess,
    deleteTypesIsLoading,
    deleteTypesIsError,
  };
};
