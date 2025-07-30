import { ChangeEventHandler, FC } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { Paper } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { Characteristics } from '@/interfaces*';
import { useSetAtom } from 'jotai';
import { AdminCharacteristicToolBarTable } from './admin-characteristic-toolbar-table';
import { selectedCharacteristicsIdsAtom } from 'src/app/stores/characteristics.store';
import { AdminCharacteristicHeadTable } from './admin-characteristic-head-table';
import { AdminCharacteristictsBodyTable } from './admin-characteristic-body-table';

interface IProps {
  onPut: () => void;
  onDeleteMany: () => void;
  count: number;
  addiotionalColoumns?: string[];
  type: Characteristics;
  currentPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  limit: number;
  onChangeLimit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const AdminCharacteristicsTable: FC<IProps> = 
  function ({
    onPut,
    onDeleteMany,
    count,
    type,
    addiotionalColoumns,
    currentPage,
    limit,
    onChangePage,
    onChangeLimit,
  }) {
    const setSelectedCharacteristicsIds = useSetAtom(
      selectedCharacteristicsIdsAtom
    );
    return (
      <Paper>
        <AdminCharacteristicToolBarTable
          type={type}
          onPut={onPut}
          onDeleteMany={() => {
            onDeleteMany();
            setSelectedCharacteristicsIds([]);
          }}
        />
        <TableContainer sx={{ height: 440, width: 900 }}>
          <Table stickyHeader>
            <AdminCharacteristicHeadTable
              limit={limit}
              addiotionalColoumns={addiotionalColoumns}
            />
            <AdminCharacteristictsBodyTable  />
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
          id="table-pagination"
        />
      </Paper>
    );
  }

