'use client';

import {
  InputSearch,
  IPostCharacteristicForm,
  useCharacteristics,
} from 'apps/client/src/shared';
import {
  AdminCharacteristicsTable,
  AdminPostCharaceteristicModal,
} from 'apps/client/src/widgets/admin';
import { AdminPostCharacteristic } from 'apps/client/src/features/admin';
import { MessageModal } from 'apps/client/src/features/message';
import { FC } from 'react';
import { useHolidays } from '../model/hooks/use-holidays';
import { CharactersticsLayout } from 'apps/client/src/application';
export const AdminHolidaysPage: FC = () => {
  const {
    newCharacteristicValue,
    selectedCharacteristics,
    onTogglePostCharacteristicModalVisibility,
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
          onChangePage={(e, newPage) => holidaysProps.onChangePage(e, newPage)}
          count={holidaysProps.items?.countItems}
          limit={holidaysProps.limit}
          currentPage={holidaysProps.currentPage}
          onChangeLimit={holidaysProps.onChangeTitle}
          hasMeasure={false}
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
