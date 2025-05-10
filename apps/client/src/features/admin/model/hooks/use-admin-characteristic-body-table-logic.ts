import { useAtom, useAtomValue } from 'jotai';

import { selectedCharacteristicsIdsAtom, characteristicsAtom } from 'src/application/stores/characteristics.store';

export const useAdminCharacteristicBodyTableLogic = () => {
  const [selectedCharacteristicsIds, setSelectedCharacteristicsIds] = useAtom(
    selectedCharacteristicsIdsAtom
  );

  const characteristics = useAtomValue(characteristicsAtom);

  const handleSelectCharacteristic = (id: string) => {
    if (!selectedCharacteristicsIds.includes(id)) {
      setSelectedCharacteristicsIds((prev) => [...prev, id]);
    } else {
      setSelectedCharacteristicsIds((prev) => [
        ...prev.filter((el) => el !== id),
      ]);
    }
  };

  return {
    selectedCharacteristicsIds,
    characteristics,
    onSelectCharacteristic: handleSelectCharacteristic,
  };
};
