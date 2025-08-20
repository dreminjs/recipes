import { useAtomValue } from 'jotai';
import {
  holidaysIdsAtom,
  nationalCuisinesIdsAtom,
  typesIdsAtom,
} from '../ atoms';
import { useState } from 'react';

export const useRecipeFilteration = () => {
  const holidaysIds = useAtomValue(holidaysIdsAtom);
  const typesIds = useAtomValue(typesIdsAtom);
  const nationalCuisinesIds = useAtomValue(nationalCuisinesIdsAtom);

  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearchValue = (newValue: string) =>
    setSearchValue(newValue);

  return {
    holidaysIds,
    typesIds,
    nationalCuisinesIds,
    searchValue,
    onChangeSearchValue: handleChangeSearchValue,
  };
};
