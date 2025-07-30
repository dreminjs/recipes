import { useAtom, useAtomValue } from 'jotai';
import { selectedCharacteristicsIdsAtom, characteristicsAtom } from 'src/app/stores/characteristics.store';

export const useAdminCharacteristicHeadTableLogic = () => {

  const [selectedCharacteristics, setSelectedCharacteristics] = useAtom(
    selectedCharacteristicsIdsAtom
  );
  const characteristics = useAtomValue(characteristicsAtom);

  const handleSelectAllCharacteristics = () => {
    
    if (characteristics?.length !== selectedCharacteristics.length) {
      setSelectedCharacteristics(characteristics.map((el) => el.id));
    } else {
      setSelectedCharacteristics([]);
    }
  };

  return {
    onSelectAllCharacteristics: handleSelectAllCharacteristics,
    selectedCharacteristics
  };
};
