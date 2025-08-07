import { FC } from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import { AdminCharacteristicCell } from './admin-characteristic-cell';
import { ICharacteristic } from '@/shared';

interface IProps {
  el: ICharacteristic;
  rowIdx: number;
  isChecked: boolean;
  onSelect: (id: string) => void;
}

export const AdminTableRow: FC<IProps> = function({ el, rowIdx, isChecked, onSelect }) {
  const handleCheckboxClick = () => {
    onSelect(el.id);
  }

  return (
    <TableRow hover role="checkbox" key={el.id} sx={{ cursor: 'pointer' }}>
      <TableCell padding="checkbox">
        <Checkbox
          onClick={handleCheckboxClick}
          checked={isChecked}
          color="primary"
          id={el.id}
        />
      </TableCell>
      <TableCell>{el.id}</TableCell>
      <AdminCharacteristicCell
        id={el.id}
        cellCoordinates={{ rowIdx, coloumnIdx: 1 }}
        type="text"
        payload={el.title}
      />
      <AdminCharacteristicCell
        id={el.id}
        cellCoordinates={{ rowIdx, coloumnIdx: 2 }}
        type="checkbox"
        payload={el.isVisible}
      />
      {el.measure && (
        <AdminCharacteristicCell
          type="options"
          payload={el.measure}
          id={el.id}
          cellCoordinates={{ rowIdx, coloumnIdx: 3 }}
        />
      )}
    </TableRow>
  );
}