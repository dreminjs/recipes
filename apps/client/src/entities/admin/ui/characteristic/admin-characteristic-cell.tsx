import { TableCell } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import {
  ICharacteristicsTableCoordinats,
  measuresArray,
  useCharacteristics,
} from 'apps/client/src/shared';

interface IProps {
  type: 'checkbox' | 'text' | 'options';
  payload: string | boolean;
  id: string;
  cellCoordinates: ICharacteristicsTableCoordinats;
}

export const AdminCharacteristicCell: FC<IProps> = ({
  cellCoordinates,
  payload,
  id,
  type,
}) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    activeCell,
    onShowInputCell,
    onChangeCharactersticValue,
    onHideInputCell,
    isPostCharacteristicModalVisible,
  } = useCharacteristics();

  const isActiveCell =
    cellCoordinates &&
    activeCell &&
    cellCoordinates.rowIdx === activeCell.rowIdx &&
    cellCoordinates.coloumnIdx === activeCell.coloumnIdx;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        const clickedElement = event.target as HTMLElement;
        if (clickedElement.id !== 'confirm-btn') {
          onHideInputCell();
        }
      }
    };

    if (isActiveCell && !isPostCharacteristicModalVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActiveCell, onHideInputCell, isPostCharacteristicModalVisible]);

  return (
    <TableCell
      ref={cellRef}
      onClick={() => cellCoordinates && onShowInputCell({ ...cellCoordinates })}
      align="left"
    >
      {isActiveCell ? (
        type === 'checkbox' ? (
          <input
            type="checkbox"
            onChange={onChangeCharactersticValue}
            defaultChecked={Boolean(payload)}
            id={id}
            ref={inputRef as React.RefObject<HTMLInputElement>}
          />
        ) : type === 'options' ? (
          <select onChange={onChangeCharactersticValue} defaultValue={String(payload)} autoFocus id={id}>
            {measuresArray.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="border-b-2 text-sm"
            type="text"
            onChange={onChangeCharactersticValue}
            defaultValue={String(payload)}
            autoFocus
            id={id}
            ref={inputRef as React.RefObject<HTMLInputElement>}
          />
        )
      ) : (
        <>
          {type === 'checkbox'
            ? payload
              ? 'yes'
              : 'no'
            : type === 'options'
            ? measuresArray.find((option) => option.value === payload)?.label ||
              payload
            : payload}
        </>
      )}
    </TableCell>
  );
};
