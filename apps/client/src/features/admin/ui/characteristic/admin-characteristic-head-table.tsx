import { useAdminCharacteristicHeadTableLogic } from '../../model/hooks/use-admin-characteristic-head-table-logic';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';

interface IProps {
  addiotionalColoumns?: string[];
}

export const AdminCharacteristicHeadTable: FC<IProps> = ({
  addiotionalColoumns,
}) => {
  const headers = [
    'id',
    'title',
    'is visible',
    ...(addiotionalColoumns ? addiotionalColoumns : []),
  ];

  const { isHeadCheckboxChecked, onSelectAllCharacteristics } =
    useAdminCharacteristicHeadTableLogic();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isHeadCheckboxChecked}
            onChange={onSelectAllCharacteristics}
            id="head-checkbox"
          />
        </TableCell>
        {headers.map((item) => (
          <TableCell align="left" key={item}>
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
