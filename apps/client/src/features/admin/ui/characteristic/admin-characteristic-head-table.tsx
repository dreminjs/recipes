import { useAdminCharacteristicHeadTableLogic } from '../../model/hooks/use-admin-characteristic-head-table-logic';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';

interface IProps {
  addiotionalColoumns?: string[];
  limit: number
}
const headers = ['id', 'title', 'is visible'];
export const AdminCharacteristicHeadTable: FC<IProps> = ({
  addiotionalColoumns,
  limit,

}) => {
  const { selectedCharacteristics, onSelectAllCharacteristics } =
    useAdminCharacteristicHeadTableLogic();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={selectedCharacteristics.length === limit}
            onChange={onSelectAllCharacteristics}
            id="head-checkbox"
          />
        </TableCell>
        {[...headers, ...(addiotionalColoumns ? addiotionalColoumns : [])].map(
          (item) => (
            <TableCell align="left" key={item}>
              {item}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};
