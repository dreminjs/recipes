import { useQuery } from '@tanstack/react-query';
import { characteristicService } from '../services/characteristic.service';
import { QUERY_KEYS, SERVICE_KEYS } from '../../model/constants';
import { IGetRecipesSelectionQueryParameters } from '../../model/interfaces/recipe.interface';
import { useMemo } from 'react';

export const useGetRandomCharacteristic = ({ idx }: { idx: number }) => {
  const { isLoading: characteristicIsLoading, data: characteristic } = useQuery(
    {
      queryFn: () => characteristicService.findRandom(),
      queryKey: [QUERY_KEYS.characteristic, SERVICE_KEYS.random, idx],
    }
  );

  return { characteristicIsLoading, characteristic };
};
