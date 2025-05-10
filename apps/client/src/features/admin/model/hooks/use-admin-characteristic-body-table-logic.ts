import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { selectedCharacteristicsIdsAtom, isHeadCheckboxCheckedAtom, characteristicsAtom } from 'src/application/stores/characteristics.store';

export const useAdminCharacteristicBodyTableLogic = (limit: number) => {
  const [selectedCharacteristicsIds, setSelectedCharacteristicsIds] = useAtom(
    selectedCharacteristicsIdsAtom
  );

  const setIsHeadCheckboxChecked = useSetAtom(isHeadCheckboxCheckedAtom);

  const characteristics = useAtomValue(characteristicsAtom);

  const handleSelectCharacteristic = (id: string) => {
    if (!selectedCharacteristicsIds.includes(id)) {
      setSelectedCharacteristicsIds((prev) => [...prev, id]);
    } else {
      setSelectedCharacteristicsIds((prev) => [
        ...prev.filter((el) => el !== id),
      ]);
      setIsHeadCheckboxChecked(false);
    }

    const totalSelected = selectedCharacteristicsIds?.includes(id)
      ? selectedCharacteristicsIds.length - 1
      : selectedCharacteristicsIds && selectedCharacteristicsIds.length + 1;

    if (totalSelected === limit || totalSelected === characteristics.length) {
      setIsHeadCheckboxChecked(true);
    }
  };

  return {
    selectedCharacteristicsIds,
    characteristics,
    onSelectCharacteristic: handleSelectCharacteristic,
  };
};
