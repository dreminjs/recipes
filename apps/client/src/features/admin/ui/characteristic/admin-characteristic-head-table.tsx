import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { useCharacteristics } from 'apps/client/src/shared';

export const AdminCharacteristicHeadTable = () => {
  const { isHeadCheckboxChecked, onToggleAllCharacteristics } =
    useCharacteristics();
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isHeadCheckboxChecked}
            onClick={() => onToggleAllCharacteristics()}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {['id', 'title', 'is visible'].map((item) => (
          <TableCell key={item}>{item}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
