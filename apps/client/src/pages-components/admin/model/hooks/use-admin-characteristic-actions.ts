import { useSetAtom, useAtomValue } from 'jotai';
import {
  selectedCharacteristicsIdsAtom,
  newCharacteristicAtom,
  isPostCharacteristicModalVisibleAtom,
} from 'src/application/stores/characteristics.store';

export function useAdminCharacteristicActions() {
  const selectedCharacteristics = useAtomValue(selectedCharacteristicsIdsAtom);
  const newCharacteristic = useAtomValue(newCharacteristicAtom);
  const setIsPostModalVisible = useSetAtom(
    isPostCharacteristicModalVisibleAtom
  );

  const handleToggleModalVisibility = () =>
    setIsPostModalVisible((prev) => !prev);

  return {
    selectedCharacteristics,
    newCharacteristic,
    setIsPostModalVisible,
    onToggleModalVisibility: handleToggleModalVisibility,
  };
}
