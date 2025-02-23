import { FC } from 'react';
import {
  AdminCharacteristicHeadTable,
  AdminCharacteristicToolBarTable,
  AdminCharacteristictsBodyTable,
  // AdminCharacteristictsBodyTable,
} from '@/features/admin';
import { useCharacteristics } from '@/shared';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { Paper } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

interface IProps {
  onPut: () => void;
  onDeleteMany: () => void;
  count: number
  limit: number;
  currentPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  onChangeLimit: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addiotionalColoumns?: string[];
}


export const AdminCharacteristicsTable: FC<IProps> = ({
  onPut,
  onDeleteMany,
  onChangePage,
  onChangeLimit,
  count,
  limit,
  currentPage,
  addiotionalColoumns,
}) => {
  const {
    selectedCharacteristics,
    onUnSelectedCharaceteristics,
    onTogglePostCharacteristicModalVisibility,
    isHeadCheckboxChecked,
    onToggleAllCharacteristics,
    newCharacteristicValue,
    onSetCharactersticValue,
  } = useCharacteristics();
  return (
    <Paper>
      <AdminCharacteristicToolBarTable
        onSetCharactersticValue={onSetCharactersticValue}
        hasNewCharacteristicValue={newCharacteristicValue ? true : false}
        selectedCharacteristics={selectedCharacteristics}
        onTogglePostCharacteristicModalVisibility={
          onTogglePostCharacteristicModalVisibility
        }
        onDeleteMany={() => {
          onDeleteMany();
          onUnSelectedCharaceteristics();
        }}
        onPut={onPut}

      />
      <TableContainer sx={{ height: 440, width: 900 }}>
        <Table stickyHeader>
          <AdminCharacteristicHeadTable
            isHeadCheckboxChecked={isHeadCheckboxChecked}
            addiotionalColoumns={addiotionalColoumns}
            onToggleAllCharacteristics={onToggleAllCharacteristics}
          />
          <AdminCharacteristictsBodyTable />
        </Table>
      </TableContainer>
      <TablePagination
        page={currentPage}
        count={count}
        rowsPerPage={limit}
        component={'div'}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeLimit}
        rowsPerPageOptions={[5, 10, 15, 25]}
        id='table-pagination'
      />
    </Paper>
  );
};
