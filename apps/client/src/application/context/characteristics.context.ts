import { ChangeEvent, createContext, Dispatch, SetStateAction } from 'react';
import {
  CharacteristicsPayload,
  ICharacteristicsTableCoordinats,
} from '../../shared/model/interfaces/characteristic.interface';

export const CharacteristicsContext = createContext<{
  characteristics?: CharacteristicsPayload | null;
  onSetCharacterstics: Dispatch<SetStateAction<CharacteristicsPayload | null>>;
  selectedCharacteristics: string[] | undefined;
  onToggleAllCharacteristics: () => void;
  onSelectCharacteristic: (id: string) => void;
  isHeadCheckboxChecked: boolean;
  activeCell: ICharacteristicsTableCoordinats;
  onShowInputCell: (payload: ICharacteristicsTableCoordinats) => void;
  newCharacteristicValue: {
    id: string;
    payload: boolean | string;
  } | null;
  onChangeCharactersticValue: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
  onSetCharactersticValue: ({
    payload,
    id,
  }: {
    payload: string | boolean;
    id: string;
  }) => void;
  onHideInputCell: () => void;
  onUnSelectedCharaceteristics: () => void;
  onTogglePostCharacteristicModalVisibility: () => void
  isPostCharacteristicModalVisible: boolean
}>({
  characteristics: { items: [], countItems: 0, currentPage: 0 },
  onSetCharacterstics(payload) {},
  selectedCharacteristics: [],
  onSelectCharacteristic(id) {},
  onToggleAllCharacteristics() {},
  isHeadCheckboxChecked: false,
  activeCell: null,
  onShowInputCell(payload) {},
  newCharacteristicValue: null,
  onChangeCharactersticValue: (event) => {},
  onSetCharactersticValue: (payload) => {},
  onHideInputCell() {},
  onUnSelectedCharaceteristics() {},
  onTogglePostCharacteristicModalVisibility:() => {},
  isPostCharacteristicModalVisible: false
});
