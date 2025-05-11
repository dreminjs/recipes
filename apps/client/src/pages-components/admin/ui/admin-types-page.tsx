import { InputSearch, IPostCharacteristicForm } from '@/shared';
import { AdminPostCharaceteristicModal } from '@/widgets/admin';
import { MessageModal } from '@/features/message';
import { FC } from 'react';
import { useTypes } from '../model/hooks/use-types';
import { CharactersticsLayout } from '@/application/';
import dynamic from 'next/dynamic';
import { useAdminCharacteristicActions } from '../model/hooks/use-admin-characteristic-actions';

const AdminCharacteristicsTable = dynamic(
  () => import('@/widgets/admin/').then((mod) => mod.AdminCharacteristicsTable),
  { ssr: false }
);

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
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={typesProps.isLoading}
        isError={typesProps.isError}
        isSuccess={typesProps.isSuccess}
      />
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
