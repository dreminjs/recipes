import {} from 'apps/client/src/shared';

import { Paper, Table, TableContainer, TablePagination } from '@mui/material';

import { FC, ReactNode } from 'react';
import {
  AdminIngredientHeadTable,
  AdminIngredientToolbarTable,
} from 'apps/client/src/features/admin';

export const AdminIngredientsTable = () => {
  return (
    <Paper>
      <TableContainer sx={{ height: 440, width: 900 }}>
        <AdminIngredientToolbarTable
          onToggleIngredientModalVisibility={onToggleIngredientModalVisibility}
        />
        <Table>
          <AdminIngredientHeadTable
            isHeadcheckboxChecked={isHeadcheckboxChecked}
            onSelectAllItems={onSelectAllItems}
          />
          <AdminIngredientBodyTable
            onSelectItemId={onSelectItemId}
            selectedItems={selectedItems}
            items={ingredients?.items || []}
          />
        </Table>
        <TablePagination
          count={count || 0}
          rowsPerPage={limit}
          component={'div'}
          page={currentPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeLimit}
          rowsPerPageOptions={[5, 10, 15, 25]}
        />
      </TableContainer>
    </Paper>
  );
};
