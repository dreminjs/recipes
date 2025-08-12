import { CharactersticsLayout } from 'src/app';
import { InputSearch, IPostCharacteristicForm } from '@/shared';
import { useAdminCharacteristicActions } from '../../model/hooks/use-admin-characteristic-actions';
import { useHolidays } from '../../model/hooks/use-holidays';
import { AdminCharacteristicsTable } from '../characteristics/table/admin-characteristics-table';
import { AdminPostCharaceteristicModal } from '../characteristics/post-form/admin-post-characteristic-modal';

export const AdminHolidaysPage = () => {

  const {
    newCharacteristic,
    selectedCharacteristics,
    onToggleModalVisibility,
  } = useAdminCharacteristicActions();

  const holidaysProps = useHolidays({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  return (
    <>
      <CharactersticsLayout>
        <InputSearch
          value={holidaysProps.title}
          onChange={holidaysProps.onChangeTitle}
        />
        <AdminCharacteristicsTable
          type="holidays"
          onDeleteMany={() => holidaysProps.deleteMany(selectedCharacteristics)}
          onPut={() =>
            newCharacteristic && holidaysProps.onPut(newCharacteristic)
          }
          onChangePage={(_, newPage) => holidaysProps.onChangePage(newPage)}
          count={holidaysProps.items?.itemsCount || 0}
          limit={holidaysProps.limit}
          currentPage={holidaysProps.currentPage}
          onChangeLimit={holidaysProps.onChangeLimit}
        />
      </CharactersticsLayout>
      <AdminPostCharaceteristicModal
        onPost={(data: IPostCharacteristicForm) => {
          holidaysProps.post(data);
          onToggleModalVisibility();
        }}
        onToggleVisibility={onToggleModalVisibility}
      />
    </>
  );
};
