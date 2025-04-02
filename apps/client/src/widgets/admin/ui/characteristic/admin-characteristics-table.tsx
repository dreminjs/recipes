import { FC } from 'react';
import {
  AdminCharacteristicHeadTable,
  AdminCharacteristicToolBarTable,
  AdminCharacteristictsBodyTable,
} from '@/features/admin';
import { useCharacteristics } from '@/shared';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { Paper } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { Characteristics } from '@/interfaces*';

interface IProps {
  onPut: () => void;
  onDeleteMany: () => void;
  count: number;
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
  type: Characteristics;
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
  type,
}) => {
  const {
    selectedCharacteristics,
    onUnSelectedCharaceteristics,
    onTogglePostCharacteristicModalVisibility,
    isHeadCheckboxChecked,
    onToggleAllCharacteristics,
    newCharacteristicValue,
    onSetCharactersticValue,
    onSelectCharacteristic,
    ...props
  } = useCharacteristics();
  return (
    <Paper>
      <AdminCharacteristicToolBarTable
        type={type}
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
          <AdminCharacteristictsBodyTable
            items={props.characteristics?.items}
            selectedItems={selectedCharacteristics}
            onSelectItem={onSelectCharacteristic}
          />
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
};
