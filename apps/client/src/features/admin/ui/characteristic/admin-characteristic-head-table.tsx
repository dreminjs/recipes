import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { useCharacteristics } from 'apps/client/src/shared';
import { FC } from 'react';

interface IProps {
  hasMeasure?: boolean;
  isHeadCheckboxChecked: boolean;
  onToggleAllCharacteristics: () => void;
}

export const AdminCharacteristicHeadTable: FC<IProps> = ({
  hasMeasure,
  isHeadCheckboxChecked,
  onToggleAllCharacteristics,
}) => {
  const headers = ['id', 'title', 'is visible'];
  if (hasMeasure) {
    headers.push('measure');
  }

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
        {headers.map((item) => (
          <TableCell align="left" key={item}>
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
