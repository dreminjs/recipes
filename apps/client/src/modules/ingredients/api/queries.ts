import { IGetCharacteristicsQueryParameters, SERVICE_KEYS } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { findMany } from "./services";

export const useGetIngredients = (dto: IGetCharacteristicsQueryParameters) => useQuery({
    queryKey: [SERVICE_KEYS.ingredients],
    queryFn: () => findMany(dto)
})