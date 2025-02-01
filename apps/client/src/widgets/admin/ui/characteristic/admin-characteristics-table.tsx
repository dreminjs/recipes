import { FC } from 'react';
import {
  AdminCharacteristicHeadTable,
  AdminCharacteristicToolBarTable,
  AdminCharacteristictsBodyTable,
} from 'apps/client/src/features/admin';
import { useCharacteristics } from 'apps/client/src/shared';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { Paper, TableFooter, TableRow } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

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
  hasMeasure?: boolean;
}

export const AdminCharacteristicsTable: FC<IProps> = ({
  onPut,
  onDeleteMany,
  onChangePage,
  onChangeLimit,
  count,
  limit,
  currentPage,
  hasMeasure,
}) => {
  const {
    selectedCharacteristics,
    onUnSelectedCharaceteristics,
    activeCell,
    onTogglePostCharacteristicModalVisibility,
    isHeadCheckboxChecked,
    onToggleAllCharacteristics,
  } = useCharacteristics();
  return (
    <Paper>
      <AdminCharacteristicToolBarTable
        selectedCharacteristics={selectedCharacteristics}
        onTogglePostCharacteristicModalVisibility={
          onTogglePostCharacteristicModalVisibility
        }
        activeCell={activeCell}
        onDeleteMany={() => {
          onDeleteMany();
          onUnSelectedCharaceteristics();
        }}
        onPut={onPut}
        numSelected={
          selectedCharacteristics ? selectedCharacteristics?.length : 0
        }
      />
      <TableContainer sx={{ height: 440, width: 900 }}>
        <Table stickyHeader>
          <AdminCharacteristicHeadTable
            isHeadCheckboxChecked={isHeadCheckboxChecked}
            hasMeasure={hasMeasure}
            onToggleAllCharacteristics={onToggleAllCharacteristics}
          />
          <AdminCharacteristictsBodyTable />
        </Table>
      </TableContainer>
      <TablePagination
        count={count || 0}
        rowsPerPage={limit}
        component={'div'}
        page={currentPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeLimit}
        rowsPerPageOptions={[5, 10, 15, 25]}
      />
    </Paper>
  );
};
