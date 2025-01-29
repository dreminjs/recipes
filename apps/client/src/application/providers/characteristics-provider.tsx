import { ChangeEvent, FC, ReactNode, useState } from 'react';
import {
  CharacteristicsContext,
  CharacteristicsPayload,
  ICharacteristicsTableCoordinats,
} from 'apps/client/src/shared';

interface IProps {
  children: ReactNode;
}

export const CharacteristicsProvider: FC<IProps> = ({ children }) => {
  const [characteristics, setCharacteristics] =
    useState<CharacteristicsPayload | null>(null);

  const [selectedCharacteristics, setSelectAllCharacteristics] = useState<
    string[] | undefined
  >([]);

  const [isHeadCheckboxChecked, setIsHeadCheckboxChecked] = useState(false);

  const [activeCell, setActiveCell] =
    useState<ICharacteristicsTableCoordinats>(null);

  const [newCharacteristicValue, setNewCharacteristicValue] = useState<{
    payload: string | boolean;
    id: string;
  } | null>(null);

  const handleSetCharacteristicValue = ({
    payload,
    id,
  }: {
    payload: string | boolean;
    id: string;
  }) => {
    setNewCharacteristicValue({ payload, id });
  };

  const handleShowInput = (payload: ICharacteristicsTableCoordinats) => {
    setActiveCell(payload);
  };

  const handelHideInput = () => {
    setActiveCell(null);
  };

  const handleSelectAllCharacteristics = () => {
    if (selectedCharacteristics?.length === characteristics?.items.length) {
      setSelectAllCharacteristics([]);
      setIsHeadCheckboxChecked(false);
    } else {
      setSelectAllCharacteristics(characteristics?.items.map((el) => el.id));
      setIsHeadCheckboxChecked(true);
    }
  };

  const handleSelectCharacteristic = (id: string) => {
    if (selectedCharacteristics?.includes(id)) {
      setSelectAllCharacteristics(
        selectedCharacteristics.filter((selectedId) => selectedId !== id)
      );
      setIsHeadCheckboxChecked(false);
    } else {
      setSelectAllCharacteristics((prev) => prev && [...prev, id]);
      setIsHeadCheckboxChecked(false);
    }

    const totalSelected = selectedCharacteristics?.includes(id)
      ? selectedCharacteristics.length - 1
      : selectedCharacteristics && selectedCharacteristics.length + 1;

    if (
      totalSelected === 5 ||
      totalSelected === characteristics?.items.length
    ) {
      setIsHeadCheckboxChecked(true);
    }
  };

  const onChangeCharacteristicValue = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { type, value, checked, id } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewCharacteristicValue({ payload: newValue, id });
  };

  return (
    <CharacteristicsContext.Provider
      value={{
        characteristics,
        onSetCharacterstics: setCharacteristics,
        selectedCharacteristics,
        onSelectCharacteristic: handleSelectCharacteristic,
        onToggleAllCharacteristics: handleSelectAllCharacteristics,
        isHeadCheckboxChecked: isHeadCheckboxChecked,
        activeCell,
        onShowInputCell: handleShowInput,
        newCharacteristicValue: newCharacteristicValue,
        onChangeCharactersticValue: onChangeCharacteristicValue,
        onSetCharactersticValue: handleSetCharacteristicValue,
        onHideInputCell: handelHideInput,
      }}
    >
      {children}
    </CharacteristicsContext.Provider>
  );
};
