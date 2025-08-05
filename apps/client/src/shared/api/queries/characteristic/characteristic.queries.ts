import { useQuery } from '@tanstack/react-query';
import { IGetCharacteristicsQueryParameters } from 'src/shared/model/interfaces/characteristic.interface';
import { findMany, findRandom } from './characteristic.service';
import { Characteristics } from 'interfaces';
import { QUERY_KEYS, SERVICE_KEYS } from '@/shared';

export const useGetCharacteristics = ({
  type,
  ...query
}: {
  type: Characteristics;
} & IGetCharacteristicsQueryParameters) => {
  const {
    data: characteristics,
    isError: characteristicsIsError,
    isLoading: characteristicsIsLoading,
    isSuccess: characteristicsIsSuccess,
  } = useQuery({
    queryFn: () => findMany({ type, ...query }),
    queryKey: [type, query.page, query.title, query.limit],
  });

  return {
    characteristics,
    characteristicsIsError,
    characteristicsIsLoading,
    characteristicsIsSuccess,
  };
};


export const useGetRandomCharacteristic = ({
  idx,
  type,
}: {
  idx: number;
  type: Characteristics;
}) => {
  const { isLoading: characteristicIsLoading, data: characteristic } = useQuery(
    {
      queryFn: () => findRandom({ type }),
      queryKey: [SERVICE_KEYS.characteristics, QUERY_KEYS.random, idx],
    }
  );

  return { characteristicIsLoading, characteristic };
};