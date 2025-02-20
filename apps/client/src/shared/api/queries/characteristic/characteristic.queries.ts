import { useQuery } from '@tanstack/react-query';
import { characteristicService } from './characteristic.service';
import { QUERY_KEYS, SERVICE_KEYS } from '../../../model/constants';
import { Characteristics } from '@/interfaces';

export const useGetRandomCharacteristic = ({
  idx,
  type
}: {
  idx: number;
  type: Characteristics;
}) => {
  const { isLoading: characteristicIsLoading, data: characteristic } = useQuery(
    {
      queryFn: () => characteristicService.findRandom({type}),
      queryKey: [QUERY_KEYS.characteristic, SERVICE_KEYS.random, idx],
    }
  );

  return { characteristicIsLoading, characteristic };
};
