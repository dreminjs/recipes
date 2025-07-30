import { InputSearch, IPostCharacteristicForm } from '@/shared';
import { FC } from 'react';
import { useNationalCuisines } from '../../model/hooks/use-national-cuisines';
import { useAdminCharacteristicActions } from '../../model/hooks/use-admin-characteristic-actions';
import { CharactersticsLayout } from 'src/app';
import { AdminCharacteristicsTable } from '../characteristics/table/admin-characteristics-table';
import { AdminPostCharaceteristicModal } from '../characteristics/post-form/admin-post-characteristic-modal';

export const AdminNationalCuisinesPage: FC = () => {
  const nationalCuisinesProps = useNationalCuisines({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  const {
    newCharacteristic,
    onToggleModalVisibility,
    selectedCharacteristics,
  } = useAdminCharacteristicActions();

  return (
    <>
      <CharactersticsLayout>
        <InputSearch
          value={nationalCuisinesProps.title}
          onChange={nationalCuisinesProps.onChangeTitle}
        />
        <AdminCharacteristicsTable
          type="national-cuisines"
          onDeleteMany={() =>
            nationalCuisinesProps.deleteMany(selectedCharacteristics)
          }
          onPut={() =>
            newCharacteristic && nationalCuisinesProps.onPut(newCharacteristic)
          }
          onChangePage={(_, newPage) =>
            nationalCuisinesProps.onChangePage(newPage)
          }
          count={nationalCuisinesProps.items?.countItems || 0}
          limit={nationalCuisinesProps.limit}
          currentPage={nationalCuisinesProps.currentPage}
          onChangeLimit={nationalCuisinesProps.onChangeLimit}
        />
      </CharactersticsLayout>

      <AdminPostCharaceteristicModal
        onPost={(data: IPostCharacteristicForm) => {
          nationalCuisinesProps.post(data);
          onToggleModalVisibility();
        }}
        onToggleVisibility={onToggleModalVisibility}
      />
    </>
  );
};
