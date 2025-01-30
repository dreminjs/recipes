import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { useCharacteristics } from 'apps/client/src/shared';
import { FC } from 'react';


interface IProps {
  limit: number
}

export const AdminCharacteristicHeadTable: FC<IProps> = ({limit}) => {
  const { isHeadCheckboxChecked, onToggleAllCharacteristics,selectedCharacteristics } =
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
          <TableCell align='left' key={item}>{item}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
