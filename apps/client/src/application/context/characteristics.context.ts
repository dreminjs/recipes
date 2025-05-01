/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeEvent, createContext, Dispatch, SetStateAction } from 'react';
import {
  ICharacteristicPayload,
  ICharacteristicsTableCoordinats,
} from '@/shared/model/interfaces/characteristic.interface';
import { Measure } from 'prisma/prisma-client';

interface IContext {
  characteristics?: ICharacteristicPayload| null;
  onSetCharacterstics: Dispatch<SetStateAction<ICharacteristicPayload | null>>;
  selectedCharacteristics: string[]
  onToggleAllCharacteristics: () => void;
  onSelectCharacteristic: (id: string) => void;
  isHeadCheckboxChecked: boolean;
  activeCell: ICharacteristicsTableCoordinats;
  onShowInputCell: (payload: ICharacteristicsTableCoordinats) => void;
  newCharacteristicValue: {
    id: string;
    payload: boolean | string;
  } | null;
  onChangeCharactersticValue: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  onSetCharactersticValue: ({}: {
    payload: string | boolean;
    id: string;
    measure?: Measure;
  } | null) => void;
  onHideInputCell: () => void;
  onUnSelectedCharaceteristics: () => void;
  onTogglePostCharacteristicModalVisibility: () => void;
  isPostCharacteristicModalVisible: boolean;
  onChangeLimit: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  limit: number;
}


export const CharacteristicsContext = createContext<IContext>({
  //characteristics: { items: [], countItems: 0, currentPage: 0 },
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
  onTogglePostCharacteristicModalVisibility: () => {},
  isPostCharacteristicModalVisible: false,
  onChangeLimit(payload) {},
  limit: 5,
});
