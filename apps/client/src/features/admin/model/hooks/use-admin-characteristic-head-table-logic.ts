import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import {
  isHeadCheckboxCheckedAtom,
  selectedCharacteristicsIdsAtom,
  characteristicsAtom,
} from 'src/application/providers/characteristics-provider';

export const useAdminCharacteristicHeadTableLogic = () => {
  const [isHeadCheckboxChecked, setIsHeadCheckboxChecked] = useAtom(
    isHeadCheckboxCheckedAtom
  );

  const [selectedCharacteristics, setSelectedCharacteristics] = useAtom(
    selectedCharacteristicsIdsAtom
  );

  const characteristics = useAtomValue(characteristicsAtom);

  const handleSelectAllCharacteristics = useCallback(() => {
    if (selectedCharacteristics?.length === selectedCharacteristics.length) {
      setSelectedCharacteristics([]);
      setIsHeadCheckboxChecked(false);
    } else if (
      characteristics &&
      selectedCharacteristics?.length !== characteristics.length
    ) {
      setSelectedCharacteristics(characteristics.map((el) => el.id));
      setIsHeadCheckboxChecked(true);
    }
  }, [
    characteristics,
    selectedCharacteristics.length,
    setIsHeadCheckboxChecked,
    setSelectedCharacteristics,
  ]);

  return {
    isHeadCheckboxChecked,
    onSelectAllCharacteristics: handleSelectAllCharacteristics,
  };
};
