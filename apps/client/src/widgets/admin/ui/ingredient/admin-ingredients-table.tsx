import { useCharacteristics } from 'apps/client/src/shared';

import { Paper, Table, TableContainer, TablePagination } from '@mui/material';

import { FC } from 'react';
import {
  AdminCharacteristicHeadTable,
  AdminCharacteristictsBodyTable,
  AdminIngredientBodyTable,
  AdminIngredientHeadTable,
  AdminIngredientToolbarTable,
} from 'apps/client/src/features/admin';

interface IProps {
  onPut: () => void;
  onDeleteMany: () => void;
  count?: number | null;
  limit: number;
  currentPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  onChangeLimit: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const AdminIngredientsTable: FC<IProps> = ({
  limit,
  currentPage,
  count,
  onChangeLimit,
  onChangePage,
}) => {
  const {
    onTogglePostCharacteristicModalVisibility,
    isHeadCheckboxChecked,
    onToggleAllCharacteristics,
    onSelectCharacteristic,
    selectedCharacteristics,
    characteristics,
  } = useCharacteristics();

  return (
    <Paper>
      <AdminIngredientToolbarTable
        onToggleIngredientModalVisibility={
          onTogglePostCharacteristicModalVisibility
        }
      />
      <TableContainer sx={{ height: 440, width: 900 }}>
        <Table stickyHeader>
          <AdminCharacteristicHeadTable hasMeasure={true} />
          <AdminCharacteristictsBodyTable />
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
