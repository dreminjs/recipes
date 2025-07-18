import { QUERY_KEYS } from '@/shared*';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Prisma } from '@prisma/client';
import { typeService } from './service';
import { useSetAtom } from 'jotai';
import {
  activeCellAtom,
} from 'src/application/stores/characteristics.store';

const QUERY_KEY = QUERY_KEYS.type;

export const useGetTypes = ({
  title,
  page,
  limit,
}: {
  title?: string;
  page: number;
  limit: number;
}) => {
  
  const {
    data: types,
    isLoading: typesIsLoading,
    isSuccess: typesIsSuccess,
    isError: typesIsError,
    refetch: refetchTypes,
  } = useQuery({
    queryKey: [page, title, limit],
    queryFn: () => typeService.findMany({ limit, page, title }),
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
   isPending: postTypeIsLoading,
    isError: postTypeIsError,
    isSuccess: postTypeIsSuccess,
  } = useMutation({
    mutationFn: (data: Prisma.TypeCreateInput) =>
      typeService.createOne({ ...data }),
    mutationKey: [QUERY_KEY],
  });

  return { postType, postTypeIsLoading, postTypeIsError, postTypeIsSuccess };
};

export const useDeleteType = () => {
  const {
    mutate: deleteType,
    isPending: deleteTypeIsLoading,
    isError: deleteTypeIsError,
    isSuccess: deleteTypeIsSuccess,
  } = useMutation({
    mutationFn: (id: string) => typeService.deleteOne({ id }),
    mutationKey: [QUERY_KEY],
  });
  return {
    deleteTypeIsSuccess,
    deleteTypeIsError,
    deleteTypeIsLoading,
    deleteType,
  };
};

export const usePutType = () => {
  const setActiveCell = useSetAtom(activeCellAtom);

  const {
    mutate: putType,
    isPending: putTypeIsLoading,
    isError: putTypeIsError,
    isSuccess: putTypeIsSuccess,
  } = useMutation({
    mutationFn: ({ data, id }: { data: Prisma.TypeUpdateInput; id: string }) =>
      typeService.updateOne({ id }, data),
    mutationKey: [QUERY_KEY],
    onSuccess: () => {
      setActiveCell(null);
    },
  });

  return { putType, putTypeIsLoading, putTypeIsError, putTypeIsSuccess };
};

export const useDeleteManyTypes = () => {
  const {
    mutate: deleteTypes,
    isPending: deleteTypesIsLoading,
    isSuccess: deleteTypesIsSuccess,
    isError: deleteTypesIsError,
  } = useMutation({
    mutationFn: (ids: string[]) => typeService.deleteMany(ids),
    mutationKey: [QUERY_KEY],
  });

  return {
    deleteTypes,
    deleteTypesIsSuccess,
    deleteTypesIsLoading,
    deleteTypesIsError,
  };
};
