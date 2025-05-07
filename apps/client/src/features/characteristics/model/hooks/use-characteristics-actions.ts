import { Characteristics } from '@/interfaces*';
import { ICharacteristicPayload } from '@/shared*';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import {
  holidayAtom,
  nationalCuisineAtom,
  typeAtom,
} from 'src/application/stores/post-recipe.store';
import { useDebounce } from 'use-debounce';

export const useCharacteristicActions = () => {
  const [page, setPage] = useState<number>(1);
  const [searchTitle, setSearchTitle] = useState('');
  const [debouncedSearchTitle] = useDebounce(searchTitle, 600);

  const handleChangePage = (number: number) => {
    setPage(number);
  };

  const handleChangeSearchTitle = (newValue: string) => {
    setSearchTitle(newValue);

    if (page !== 1) {
      setPage(1);
    }
  };

  const setNationalCuisine = useSetAtom(nationalCuisineAtom);

  const setType = useSetAtom(typeAtom);

  const setHoliday = useSetAtom(holidayAtom);


  const handleAddCharacteristic = (
    payload: ICharacteristicPayload,
    characteristicType: Characteristics
  ) => {
    switch (characteristicType) {
      case 'types':
        setType(payload);
        break;
      case 'national-cuisines':
        setNationalCuisine(payload);
        break;
      case 'holidays':
        setHoliday(payload);
        break;
      default:
        console.warn(`Unknown characteristic type: ${characteristicType}`);
    }
  };

  return {
    onChangeSearchTitle: handleChangeSearchTitle,
    page,
    searchTitle: debouncedSearchTitle,
    onChangePage: handleChangePage,
    onAddCharacteristic: handleAddCharacteristic,
  };
};
