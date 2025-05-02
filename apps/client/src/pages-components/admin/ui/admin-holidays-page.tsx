import {
  InputSearch,
  IPostCharacteristicForm,
} from '@/shared';
import { AdminPostCharaceteristicModal } from '@/widgets/admin';
import { MessageModal } from '@/features/message';
import { FC } from 'react';
import { useHolidays } from '../model/hooks/use-holidays';
import dynamic from 'next/dynamic';
import { CharactersticsLayout } from '@/application/';
import { useCharacteristicActions } from '../model/hooks/use-characteristic-actions';

const AdminCharacteristicsTable = dynamic(
  () => import('@/widgets/admin/').then((mod) => mod.AdminCharacteristicsTable),
  { ssr: false }
);

export const AdminHolidaysPage: FC = () => {
  const {
    newCharacteristic,
    selectedCharacteristics,
    onToggleModalVisibility,
  } = useCharacteristicActions();

  const holidaysProps = useHolidays({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  const handlePutType = () => {
    if (newCharacteristic) {
      if (typeof newCharacteristic.payload === 'boolean') {
        holidaysProps.put({
          data: { isVisible: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      } else {
        holidaysProps.put({
          data: { title: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      }
    }
  };

  const handleDeleteHolidays = () =>
    selectedCharacteristics
      ? holidaysProps.deleteMany(selectedCharacteristics)
      : alert('Wait!');

  const handlePostHoliday = (data: IPostCharacteristicForm) => {
    holidaysProps.post(data);
    onToggleModalVisibility();
  };

  return (
    <>
      <CharactersticsLayout>
        <InputSearch
          value={holidaysProps.title}
          onChange={holidaysProps.onChangeTitle}
        />
        <AdminCharacteristicsTable
          type="holiday"
          onDeleteMany={handleDeleteHolidays}
          onPut={handlePutType}
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
        onPost={handlePostHoliday}
        onToggleVisible={onToggleModalVisibility}
      />
    </>
  );
};
