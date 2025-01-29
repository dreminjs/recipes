import { TableCell, TextField, Checkbox } from '@mui/material';
import {
  useState,
  useContext,
  FC,
  ChangeEvent,
  useEffect,
  use,
  useRef,
} from 'react';
import {
  CharacteristicsContext,
  ICharacteristicsTableCoordinats,
} from 'apps/client/src/shared';

interface IProps {
  type: 'checkbox' | 'text';
  payload: string | boolean;
  id: string;
  cellCoordinates: ICharacteristicsTableCoordinats;
}

export const AdminCharacteristicCell: FC<IProps> = ({
  cellCoordinates,
  payload,
  id,
}) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    activeCell,
    onShowInputCell,
    onChangeCharactersticValue,
    onSetCharactersticValue,
    onHideInputCell,
  } = useContext(CharacteristicsContext);

  const isActiveCell =
    cellCoordinates &&
    activeCell &&
    cellCoordinates.rowIdx === activeCell.rowIdx &&
    cellCoordinates.coloumnIdx === activeCell.coloumnIdx;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          const clickedElement = event.target as HTMLElement;
          if (clickedElement.id !== 'confirm-btn') {
            onHideInputCell();
          }
        }
      };
  
      if (isActiveCell) {
        document.addEventListener('mousedown', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isActiveCell, onHideInputCell]);

  return (
    <TableCell
      ref={cellRef}
      onClick={() => cellCoordinates && onShowInputCell({ ...cellCoordinates })}
      align='left'
    >
      {isActiveCell ? (
        typeof payload === 'boolean' ? (
          <input
            type="checkbox"
            onChange={onChangeCharactersticValue}
            defaultChecked={payload}
            id={id}
            ref={inputRef}
          />
        ) : (
          <input
            className="border-b-2 text-xl w-full"
            type="text"
            onChange={onChangeCharactersticValue}
            defaultValue={String(payload)}
            autoFocus
            id={id}
            ref={inputRef}
          />
        )
      ) : (
        <>
          {typeof payload === 'boolean' ? (payload ? 'yes' : 'no') : payload}
        </>
      )}
    </TableCell>
  );
};
