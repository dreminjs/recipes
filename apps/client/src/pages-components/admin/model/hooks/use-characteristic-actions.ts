import { useSetAtom, useAtomValue } from "jotai";
import { activeCellAtom, selectedCharacteristicsIdsAtom, newCharacteristicAtom, isPostCharacteristicModalVisibleAtom } from "src/application/providers/characteristics-provider";



export function useCharacteristicActions() {
    const setActiveCell = useSetAtom(activeCellAtom);
    const selectedCharacteristics = useAtomValue(selectedCharacteristicsIdsAtom);
    const newCharacteristic = useAtomValue(newCharacteristicAtom);
    const setIsPostModalVisible = useSetAtom(isPostCharacteristicModalVisibleAtom);
  
    const handleToggleModalVisibility = () => setIsPostModalVisible(prev => !prev)

    return {
      setActiveCell,
      selectedCharacteristics,
      newCharacteristic,
      setIsPostModalVisible,
      onToggleModalVisibility: handleToggleModalVisibility
    };
  }