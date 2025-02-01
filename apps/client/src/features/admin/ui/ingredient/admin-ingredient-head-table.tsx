import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';

interface IProps {
  onSelectAllItems: () => void
  isHeadcheckboxChecked: boolean
}


export const AdminIngredientHeadTable: FC<IProps> = ({onSelectAllItems,isHeadcheckboxChecked}) => {
  
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            onChange={onSelectAllItems}
            checked={isHeadcheckboxChecked}
          />
        </TableCell>
        {['id', 'title', 'measure', 'is visible'].map((item) => (
          <TableCell align="left" key={item}>
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
