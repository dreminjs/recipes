import { QUERY_KEYS, IPostIngredientForm, IGetCharacteristicsQueryParameters } from "@/shared";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";
import { ingredientService } from "./service";
import { useSetAtom } from "jotai";
import { activeCellAtom } from "src/app/stores/characteristics.store";
import { characteristicsAtom } from "src/app/stores/characteristics.store";
import { useEffect } from "react";
import { useNotificationActions } from "@/modules/notifications";

const queryKey = QUERY_KEYS.ingredient;

export const useGetIngredients = ({
  title,
  page,
  limit,
}: IGetCharacteristicsQueryParameters
) => {

  const setCharacteristics = useSetAtom(characteristicsAtom)
  const { isSuccess, ...props } = useQuery({
    queryKey: [queryKey, limit, page, title],
    queryFn: () => ingredientService.findMany({ limit, page, title }),
  });

  useEffect(() => {
    if (isSuccess && props.data?.items) {
      setCharacteristics(props.data?.items)
    }
  }, [isSuccess, props.data?.items])

  return { isSuccess, ...props }
};

export const usePostIngredient = () => {
  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IPostIngredientForm) =>
      ingredientService.createOne({ ...data }),
    mutationKey: [queryKey],
    onMutate: () => addInfo(),
    onError: () => {
      remove("info")
      addError()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey]
      })
      remove("info")
      addSuccess()
    }
  });
};

export const useDeleteIngredient = () => {
  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ingredientService.deleteOne({ id }),
    mutationKey: [queryKey],
    onMutate: () => addInfo(),
    onError: () => {
      remove("info")
      addError()
    },
    onSuccess: () => {
      remove("info")
      queryClient.refetchQueries({
        queryKey: [queryKey]
      })
      addSuccess()
    }
  });
};

export const useDeleteManyIngredients = () => {
  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => ingredientService.deleteMany(ids),
    mutationKey: [queryKey],
    onMutate: () => addInfo(),
    onError: () => {
      remove("info")
      addError()
    },
    onSuccess: () => {
      remove("info")
      queryClient.invalidateQueries({
        queryKey: [queryKey]
      })
      addSuccess()
    }
  });
};

export const usePutIngredient = () => {

  const setActiveCell = useSetAtom(activeCellAtom)

  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Prisma.IngredientUpdateInput;
      id: string;
    }) => ingredientService.updateOne({ id }, data),
    mutationKey: [queryKey],
    onMutate: () => addInfo(),
    onError: () => {
      remove("info")
      addError()
    },
    onSuccess: () => {
      setActiveCell(null)
      remove("info")
      queryClient.invalidateQueries({
        queryKey: [queryKey]
      })
      addSuccess()
    }
  });
};
