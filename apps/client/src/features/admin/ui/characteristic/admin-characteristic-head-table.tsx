import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { CharacteristicsContext } from 'apps/client/src/shared';
import { FC, useContext, useEffect } from 'react';


export const AdminCharacteristicHeadTable = () => {
  const { onToggleAllCharacteristics, isHeadCheckboxChecked } = useContext(
    CharacteristicsContext
  );
  return (
    <TableHead className=''>
      <TableRow className=''>
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
