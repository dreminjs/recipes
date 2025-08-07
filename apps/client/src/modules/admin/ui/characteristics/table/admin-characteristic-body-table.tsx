import { TableBody } from '@mui/material';
import { FC } from 'react';
import { AdminTableRow } from './admin-table-row';
import { useAdminCharacteristicBodyTableLogic } from 'src/modules/admin/model/hooks/use-admin-characteristic-body-table-logic';

export const AdminCharacteristictsBodyTable: FC = () => {
  const {
    selectedCharacteristicsIds,
    characteristics,
    onSelectCharacteristic,
  } = useAdminCharacteristicBodyTableLogic();
  return (
    <TableBody>
      {characteristics &&
        characteristics.map((el, rowIdx) => {
          const isChecked = selectedCharacteristicsIds?.some(
            (id) => el.id === id
          );
          return (
            <AdminTableRow
              key={el.id}
              el={el}
              rowIdx={rowIdx}
              isChecked={isChecked}
              onSelect={onSelectCharacteristic}
            />
          );
        })}
    </TableBody>
  );
};
