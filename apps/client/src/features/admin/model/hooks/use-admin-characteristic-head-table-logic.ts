import { useAtom, useAtomValue } from 'jotai';
import { isHeadCheckboxCheckedAtom, selectedCharacteristicsIdsAtom, characteristicsAtom } from 'src/application/stores/characteristics.store';

export const useAdminCharacteristicHeadTableLogic = () => {
  const [isHeadCheckboxChecked, setIsHeadCheckboxChecked] = useAtom(
    isHeadCheckboxCheckedAtom
  );

  const [selectedCharacteristics, setSelectedCharacteristics] = useAtom(
    selectedCharacteristicsIdsAtom
  );

  const characteristics = useAtomValue(characteristicsAtom);

  const handleSelectAllCharacteristics = () => {
    
    if (characteristics?.length !== selectedCharacteristics.length) {
      setSelectedCharacteristics(characteristics.map((el) => el.id));
      setIsHeadCheckboxChecked(true);
    } else {
      setSelectedCharacteristics([]);
      setIsHeadCheckboxChecked(false);
    }
  };

  return {
    isHeadCheckboxChecked,
    onSelectAllCharacteristics: handleSelectAllCharacteristics,
  };
};
