import { InputSearch, IPostCharacteristicForm } from '@/shared';
import { FC } from 'react';
import { useTypes } from '../../model/hooks/use-types';
import { useAdminCharacteristicActions } from '../../model/hooks/use-admin-characteristic-actions';
import { CharactersticsLayout } from 'src/app';
import { AdminCharacteristicsTable } from '../characteristics/table/admin-characteristics-table';
import { AdminPostCharaceteristicModal } from '../characteristics/post-form/admin-post-characteristic-modal';

export const AdminTypesPage: FC = () => {
  
  const typesProps = useTypes({
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
          value={typesProps.title}
          onChange={typesProps.onChangeTitle}
        />
        <AdminCharacteristicsTable
          onDeleteMany={() => {
            typesProps.deleteMany(selectedCharacteristics);
          }}
          onPut={() => newCharacteristic && typesProps.onPut(newCharacteristic)}
          onChangePage={(_, newPage) => {
            typesProps.onChangePage(newPage);
          }}
          type="types"
          count={typesProps.items?.countItems ? typesProps.items.countItems : 0}
          limit={typesProps.limit}
          currentPage={typesProps.currentPage}
          onChangeLimit={typesProps.onChangeLimit}
        />
      </CharactersticsLayout>
      <AdminPostCharaceteristicModal
        onToggleVisibility={onToggleModalVisibility}
        onPost={(data: IPostCharacteristicForm) => {
          typesProps.post(data);
          onToggleModalVisibility();
        }}
      />
    </>
  );
};
