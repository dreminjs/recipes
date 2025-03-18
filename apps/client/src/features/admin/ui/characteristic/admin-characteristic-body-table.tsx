import { FC } from 'react';
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import { AdminCharacteristicCell } from '@/entities/admin';
import {  ICharacteristic,  } from '@/shared';

interface IProps {
  items?: ICharacteristic[];
  selectedItems: string[];
  onSelectItem: (id: string) => void;
}

export const AdminCharacteristictsBodyTable: FC<IProps> = ({
  items,
  selectedItems,
  onSelectItem,
}) => {

  return (
    <TableBody>
      {items?.map((el, rowIdx) => {
        const isChecked = selectedItems?.some((id) => el.id === id);
        return (
          <TableRow
            hover
            role="checkbox"
            key={el.id}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                onClick={() => onSelectItem(el.id)}
                checked={isChecked}
                color="primary"
                id={el.id}
              />
            </TableCell>
            <TableCell>{el.id}</TableCell>
            <AdminCharacteristicCell
              id={el.id}
              cellCoordinates={{ rowIdx, coloumnIdx: 1 }}
              type={'text'}
              payload={el.title}
            />
            <AdminCharacteristicCell
              id={el.id}
              cellCoordinates={{ rowIdx, coloumnIdx: 2 }}
              type={'checkbox'}
              payload={el.isVisible}
            />
            {el.measure && (
              <AdminCharacteristicCell
                type={'options'}
                payload={el.measure}
                id={el.id}
                cellCoordinates={{ rowIdx, coloumnIdx: 3 }}
              />
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
