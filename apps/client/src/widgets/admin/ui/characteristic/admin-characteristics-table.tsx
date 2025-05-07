import { ChangeEventHandler, FC } from 'react';
import {
  AdminCharacteristicHeadTable,
  AdminCharacteristicToolBarTable,
  AdminCharacteristictsBodyTable,
} from '@/features/admin';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { Paper } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { Characteristics } from '@/interfaces*';
import { useSetAtom } from 'jotai';
import { selectedCharacteristicsIdsAtom } from 'src/application/stores/characteristics.store';

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
              addiotionalColoumns={addiotionalColoumns}
            />
            <AdminCharacteristictsBodyTable limit={limit} />
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

