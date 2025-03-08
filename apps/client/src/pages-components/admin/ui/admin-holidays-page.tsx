
import {
  InputSearch,
  IPostCharacteristicForm,
  useCharacteristics,
} from '@/shared';
import {
  AdminPostCharaceteristicModal,
} from '@/widgets/admin';
import { MessageModal } from '@/features/message';
import { FC } from 'react';
import { useHolidays } from '../model/hooks/use-holidays';
import dynamic from 'next/dynamic';
import { CharactersticsLayout } from '@/application/';

const AdminCharacteristicsTable = dynamic(
  () => import('@/widgets/admin/').then((mod) => mod.AdminCharacteristicsTable),
  { ssr: false }
);

export const AdminHolidaysPage: FC = () => {
  const {
    newCharacteristicValue,
    selectedCharacteristics,
    onTogglePostCharacteristicModalVisibility,
    onChangeLimit
  } = useCharacteristics();

  const holidaysProps = useHolidays({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  const handlePutType = () => {
    if (newCharacteristicValue) {
      if (typeof newCharacteristicValue.payload === 'boolean') {
        holidaysProps.put({
          data: { isVisible: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      } else {
        holidaysProps.put({
          data: { title: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
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
    onTogglePostCharacteristicModalVisibility();
  };

  return (
    <>
      <CharactersticsLayout>
        <InputSearch
          value={holidaysProps.title}
          onChange={holidaysProps.onChangeTitle}
        />
        <AdminCharacteristicsTable
          onDeleteMany={handleDeleteHolidays}
          onPut={handlePutType}
          onChangePage={(_, newPage) => holidaysProps.onChangePage(newPage)}
          count={holidaysProps.items?.countItems || 0}
          limit={holidaysProps.limit}
          currentPage={holidaysProps.currentPage}
          onChangeLimit={onChangeLimit}
      
        />
      </CharactersticsLayout>
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={
          holidaysProps.postIsLoading ||
          holidaysProps.deleteManyIsLoading ||
          holidaysProps.putIsLoading
        }
        isError={
          holidaysProps.putIsError ||
          holidaysProps.postIsError ||
          holidaysProps.deleteManyIsError
        }
        isSuccess={
          holidaysProps.postIsSuccess ||
          holidaysProps.deleteManyIsSuccess ||
          holidaysProps.putIsSuccess
        }
      />
      <AdminPostCharaceteristicModal onPost={handlePostHoliday} />
    </>
  );
};
