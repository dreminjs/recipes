import { TableBody } from '@mui/material';
import { useAdminCharacteristicBodyTableLogic } from '@/featuresadmin/model/hooks/use-admin-characteristic-body-table-logic';
import { AdminTableRow } from '@/featuresadmin/model/ui/admin-table-row';
import { FC } from 'react';

interface IProps {
  limit: number;
}

export const AdminCharacteristictsBodyTable: FC<IProps> = ({ limit }) => {
  const {
    selectedCharacteristicsIds,
    characteristics,
    onSelectCharacteristic,
  } = useAdminCharacteristicBodyTableLogic(limit);

  return (
    <TableBody>
      {characteristics &&
        characteristics.map((el, rowIdx) => {
          const isChecked = selectedCharacteristicsIds?.some(
            (id) => el.id === id
          );
          return (
            <AdminTableRow
              key={el.title}
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
