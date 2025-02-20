import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import { ICharacteristic,measuresObj } from '@/shared/';
import { FC } from 'react';
import { AdminCharacteristicCell } from '@/entities/admin';

interface IProps {
  items?: ICharacteristic[];
  selectedItems?: string[];
  onSelectItemId: (id: string) => void;
}

export const AdminIngredientBodyTable: FC<IProps> = ({
  items,
  selectedItems,
  onSelectItemId,
}) => (
  <TableBody>
    {items?.map((item) => {
      const isChecked =
        selectedItems && selectedItems.some((id) => item.id === id);
      return (
        <TableRow key={item.id}>
          <TableCell>
            <Checkbox
              onClick={() => onSelectItemId(item.id)}
              checked={isChecked}
              color="primary"
            />
          </TableCell>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.title}</TableCell>
          {item.measure && <TableCell>{measuresObj[item.measure]}</TableCell>}
          <AdminCharacteristicCell
            payload={item.isVisible}
            type={'checkbox'}
            id={item.id}
            cellCoordinates={{ rowIdx: 1, coloumnIdx: 1 }}
          />
        </TableRow>
      );
    })}
  </TableBody>
);
