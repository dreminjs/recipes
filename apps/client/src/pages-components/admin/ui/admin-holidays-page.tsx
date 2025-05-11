import { InputSearch, IPostCharacteristicForm } from '@/shared';
import { AdminPostCharaceteristicModal } from '@/widgets/admin';
import { MessageModal } from '@/features/message';
import { FC } from 'react';
import { useHolidays } from '../model/hooks/use-holidays';
import dynamic from 'next/dynamic';
import { CharactersticsLayout } from '@/application/';
import { useAdminCharacteristicActions } from '../model/hooks/use-admin-characteristic-actions';

const AdminCharacteristicsTable = dynamic(
  () => import('@/widgets/admin/').then((mod) => mod.AdminCharacteristicsTable),
  { ssr: false }
);

export const AdminHolidaysPage: FC = () => {
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
          count={holidaysProps.items?.countItems || 0}
          limit={holidaysProps.limit}
          currentPage={holidaysProps.currentPage}
          onChangeLimit={holidaysProps.onChangeLimit}
        />
      </CharactersticsLayout>
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={holidaysProps.isLoading}
        isError={holidaysProps.isError}
        isSuccess={holidaysProps.isSuccess}
      />
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
