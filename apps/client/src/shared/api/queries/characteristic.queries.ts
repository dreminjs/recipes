import { useQuery } from '@tanstack/react-query';
import { characteristicService } from '../services/characteristic.service';
import { QUERY_KEYS, SERVICE_KEYS } from '../../model/constants';
import { CharacteristicType } from '../../model/interfaces/characteristic.interface';

export const useGetRandomCharacteristic = ({
  idx,
  type
}: {
  idx: number;
  type: CharacteristicType;
}) => {
  const { isLoading: characteristicIsLoading, data: characteristic } = useQuery(
    {
      queryFn: () => characteristicService.findRandom({type}),
      queryKey: [QUERY_KEYS.characteristic, SERVICE_KEYS.random, idx],
    }
  );

  return { characteristicIsLoading, characteristic };
};
