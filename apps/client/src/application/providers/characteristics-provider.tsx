import { FC, PropsWithChildren } from 'react';
import {
  ICharacteristic,
  ICharacteristicPayload,
  ICharacteristicsTableCoordinats,
} from '@/shared';
import { atom, createStore, Provider } from "jotai"
import { UpdateCharacteristicDto } from 'src/shared/model/interfaces/characteristic.interface';

const store = createStore()

export const limitAtom = atom(0)

export const characteristicsAtom = atom<ICharacteristic[]>([])

export const selectedCharacteristicsIdsAtom = atom<string[]>([])
 
export const isHeadCheckboxCheckedAtom = atom(false)

export const isPostCharacteristicModalVisibleAtom = atom(false)

export const activeCellAtom = atom<ICharacteristicsTableCoordinats | null>(null)

export const updatedCharacteristicsAtom = atom<ICharacteristicPayload[]>([])

export const newCharacteristicAtom = atom<UpdateCharacteristicDto | null>(null)

export const CharacteristicsProvider: FC<PropsWithChildren> = ({children}) => {
    return (
      <Provider store={store}>{children}</Provider>
    )
}

// export const CharacteristicsProvider: FC<IProps> = ({ children }) => {

//   const handleTogglePostCharacteristicModalVisibility = () => {
//     setIsPostCharaceteresticModalVisible((prev) => !prev);
//   };

//   const handleSetCharacteristicValue = (
//     args: {
//       payload: string | boolean;
//       id: string;
//       measure?: Measure;
//     } | null
//   ) => {
//     if (args !== null && args.measure) {
//       const { payload, id, measure } = args;
//       setNewCharacteristicValue({ payload, id, measure });
//     } else {
//       setNewCharacteristicValue(args);
//     }
//   };

//   const handleShowInput = (payload: ICharacteristicsTableCoordinats) => {
//     setActiveCell(payload);
//   };

//   const handelHideInput = () => {
//     setActiveCell(null);
//   };

//   const handleSelectAllCharacteristics = () => {
//     if (selectedCharacteristics?.length === characteristics?.items.length) {
//       setSelectedCharacteristics([]);
//       setIsHeadCheckboxChecked(false);
//     } else if (
//       characteristics &&
//       selectedCharacteristics?.length !== characteristics?.items.length
//     ) {
//       setSelectedCharacteristics(characteristics?.items.map((el) => el.id));
//       setIsHeadCheckboxChecked(true);
//     }
//   };

//   const handleSelectCharacteristic = (id: string) => {
//     if (selectedCharacteristics?.includes(id)) {
//       setSelectedCharacteristics(
//         (prev) => prev && prev.filter((selectedId) => selectedId !== id)
//       );
//       setIsHeadCheckboxChecked(false);
//     } else {
//       setSelectedCharacteristics((prev) => prev && [...prev, id]);
//       setIsHeadCheckboxChecked(false);
//     }

//     const totalSelected = selectedCharacteristics?.includes(id)
//       ? selectedCharacteristics.length - 1
//       : selectedCharacteristics && selectedCharacteristics.length + 1;

//     if (
//       totalSelected === limit ||
//       totalSelected === characteristics?.items.length
//     ) {
//       setIsHeadCheckboxChecked(true);
//     }
//   };

//   const onChangeCharacteristicValue = (
//     event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
//   ) => {
//     const { type, value, id } = event.target;
//     const newValue = type === 'checkbox' ? event.target.checked : value;
//     setNewCharacteristicValue({ payload: newValue, id });
//   };

//   const handleUnSelectedCharaceteristics = () => {
//     setSelectedCharacteristics([]);
//     setIsHeadCheckboxChecked(false);
//   };

//   return (
//     <CharacteristicsContext.Provider
//       value={{
//         characteristics,
//         onSetCharacterstics: setCharacteristics, // TODO: its useless
//         selectedCharacteristics,
//         onSelectCharacteristic: handleSelectCharacteristic,
//         onToggleAllCharacteristics: handleSelectAllCharacteristics,
//         isHeadCheckboxChecked: isHeadCheckboxChecked,
//         activeCell,
//         onShowInputCell: handleShowInput,
//         newCharacteristicValue: newCharacteristicValue,
//         onChangeCharactersticValue: onChangeCharacteristicValue,
//         onSetCharactersticValue: handleSetCharacteristicValue,
//         onHideInputCell: handelHideInput,
//         onUnSelectedCharaceteristics: handleUnSelectedCharaceteristics,
//         onTogglePostCharacteristicModalVisibility:
//           handleTogglePostCharacteristicModalVisibility,
//         isPostCharacteristicModalVisible,
//         onChangeLimit: handleChangeLimit,
//         limit,
//       }}
//     >
//       {children}
//     </CharacteristicsContext.Provider>
//   );
// };
