import { useQuery } from '@tanstack/react-query';
import { findRandom } from './characteristic.service';
import { QUERY_KEYS, SERVICE_KEYS } from '../../../model/constants';
import { Characteristics } from '@/interfaces';

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
