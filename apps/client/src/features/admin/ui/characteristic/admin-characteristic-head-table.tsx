import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { useCharacteristics } from 'apps/client/src/shared';
import { FC } from 'react';

interface IProps {
  isHeadCheckboxChecked: boolean;
  onToggleAllCharacteristics: () => void;
  addiotionalColoumns?: string[];
}

export const AdminCharacteristicHeadTable: FC<IProps> = ({
  isHeadCheckboxChecked,
  onToggleAllCharacteristics,
  addiotionalColoumns,
}) => {
  const headers = [
    'id',
    'title',
    'is visible',
    ...(addiotionalColoumns ? addiotionalColoumns : []),
  ];

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
