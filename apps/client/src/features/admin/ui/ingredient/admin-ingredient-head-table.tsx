import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

export const AdminIngredientHeadTable = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            inputProps={{
              'aria-label': 'select all desserts',
            }}
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
