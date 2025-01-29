import { AdminCharacteristicCell } from '../../../../entities/admin';
import { FC } from 'react';
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import {
  useCharacteristics,
} from 'apps/client/src/shared';


export const AdminCharacteristictsBodyTable: FC = ({}) => {
  const { characteristics, selectedCharacteristics,onSelectCharacteristic } =
    useCharacteristics();

  return (
    <TableBody>
      {characteristics?.items.map((el, idx) => {
        const isChecked = selectedCharacteristics?.some((id) => el.id === id);
        return (
          <TableRow
            hover
            role="checkbox"
            key={el.id}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                onClick={() => onSelectCharacteristic(el.id)}
                checked={isChecked}
                tabIndex={-1}
                color="primary"
              />
            </TableCell>
            <TableCell>{el.id}</TableCell>
            <AdminCharacteristicCell
              id={el.id}
              cellCoordinates={{ rowIdx: 1, coloumnIdx: idx }}
              type={'text'}
              payload={el.title}
            />
            <AdminCharacteristicCell
              id={el.id}
              cellCoordinates={{ rowIdx: 2, coloumnIdx: idx }}
              type={'checkbox'}
              payload={el.isVisible}
            />
          </TableRow>
        );
      })}
    </TableBody>
  );
};
