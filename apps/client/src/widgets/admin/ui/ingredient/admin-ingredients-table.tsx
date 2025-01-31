import {} from 'apps/client/src/shared';

import { Paper, Table, TableContainer } from '@mui/material';

import { FC, ReactNode } from 'react';
import { AdminIngredientToolbarTable } from 'apps/client/src/features/admin';

interface IProps {
  head: ReactNode;
  body: ReactNode;
}

export const AdminIngredientsTable: FC<IProps> = ({ body, head }) => {
  return (
    <Paper>
      <TableContainer sx={{ height: 440, width: 900 }}>
        <AdminIngredientToolbarTable />
        <Table>
          {head}
          {body}
        </Table>
      </TableContainer>
    </Paper>
  );
};
