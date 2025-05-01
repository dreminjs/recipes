import { TableCell } from '@mui/material';
import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { ICharacteristicsTableCoordinats, measuresArray } from '@/shared';
import { useAtom, useSetAtom } from 'jotai';
import {
  activeCellAtom,
  newCharacteristicAtom,
} from 'src/application/providers/characteristics-provider';

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
  const [activeCell, setActiveCell] = useAtom(activeCellAtom);

  const setNewCharacteristic = useSetAtom(
    newCharacteristicAtom
  );

  const onChangeCharacteristicValue = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { type, value, id } = event.target;
    const newValue = type === 'checkbox' ? event.target.checked : value;
    setNewCharacteristic({ payload: newValue, id });
  };

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
          setActiveCell(null);
        }
      }
    };

    if (isActiveCell) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      setNewCharacteristic(null)
    };
  }, [isActiveCell, setActiveCell,setNewCharacteristic]);

  return (
    <TableCell
      ref={cellRef}
      onClick={() => setActiveCell({ ...cellCoordinates })}
      align="left"
    >
      {isActiveCell ? (
        type === 'checkbox' ? (
          <input
            type="checkbox"
            onChange={onChangeCharacteristicValue}
            defaultChecked={Boolean(payload)}
            id={id}

            ref={inputRef as React.RefObject<HTMLInputElement>}
          />
        ) : type === 'options' ? (
          <select
            onChange={() => console.log('hello')}
            defaultValue={String(payload)}
            autoFocus
          >
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
            onChange={onChangeCharacteristicValue}
            defaultValue={String(payload)}
            autoFocus
            id={id}
            ref={inputRef as React.RefObject<HTMLInputElement>}
          />
        )
      ) : (
        <>
          {(() => {
            if (type === 'checkbox') {
              return payload ? 'yes' : 'no';
            } else if (type === 'options') {
              return (
                measuresArray.find((option) => option.value === payload)
                  ?.label || payload
              );
            }
            return payload;
          })()}
        </>
      )}
    </TableCell>
  );
};
