import { FC, useContext } from 'react';
import {
  AdminCharacteristicHeadTable,
  AdminCharacteristicToolBarTable,
  AdminCharacteristictsBodyTable,
} from 'apps/client/src/features/admin';
import { Type } from 'prisma/prisma-client';
import { CharacteristicsContext } from 'apps/client/src/shared';
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
}

export const AdminCharacteristicsTable: FC<IProps> = ({
  onPut,
  onDeleteMany,
  onChangePage,
  onChangeLimit,
  count,
  limit,
  currentPage,
}) => {
  const { selectedCharacteristics } = useContext(CharacteristicsContext);

  return (
      <Paper className="">
        <AdminCharacteristicToolBarTable
          onDeleteMany={onDeleteMany}
          onPut={onPut}
          numSelected={
            selectedCharacteristics ? selectedCharacteristics?.length : 0
          }
        />
        <TableContainer className="">
          <Table>
            <AdminCharacteristicHeadTable />
            <AdminCharacteristictsBodyTable />
            <TableFooter >
              <TableRow>
                <TablePagination
                  count={count || 0}
                  rowsPerPage={limit}
                  page={currentPage}
                  onPageChange={onChangePage}
                  onRowsPerPageChange={onChangeLimit}
                  rowsPerPageOptions={[5, 10, 15, 25]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    
  );
};
