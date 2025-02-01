'use client';

import { InputSearch, IPostCharacteristicForm, useCharacteristics } from 'apps/client/src/shared';
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
  const { newCharacteristicValue, selectedCharacteristics, onTogglePostCharacteristicModalVisibility } =
    useCharacteristics();

  const holidaysProps = useHolidays({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  const handlePutType = () => {
    if (newCharacteristicValue) {
      if (typeof newCharacteristicValue.payload === 'boolean') {
        holidaysProps.putHoliday({
          data: { isVisible: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      } else {
        holidaysProps.putHoliday({
          data: { title: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      }
    }
  };

  const handleDeleteHolidays = () =>
    selectedCharacteristics
      ? holidaysProps.deleteManyHoliday(selectedCharacteristics)
      : alert('Wait!');

  const handlePostHoliday = (data: IPostCharacteristicForm) => {
    holidaysProps.postHoliday(data)
    onTogglePostCharacteristicModalVisibility()
  }

  return (
    <>
      <CharactersticsLayout>
        <InputSearch
          value={holidaysProps.title}
          onChange={holidaysProps.handleChangeTitle}
        />
        <AdminCharacteristicsTable
          onDeleteMany={handleDeleteHolidays}
          onPut={handlePutType}
          onChangePage={(e, newPage) =>
            holidaysProps.handleChangePage(e, newPage)
          }
          count={holidaysProps.holidays?.countItems}
          limit={holidaysProps.limit}
          currentPage={holidaysProps.currentPage}
          onChangeLimit={holidaysProps.handleChangeLimit}
        />
      </CharactersticsLayout>
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={
          holidaysProps.postHolidayIsLoading ||
          holidaysProps.deleteManyHolidayIsLoading ||
          holidaysProps.putHolidayIsLoading
        }
        isError={
          holidaysProps.putHolidayIsError ||
          holidaysProps.postHolidayIsError ||
          holidaysProps.deleteManyHolidayIsError
        }
        isSuccess={
          holidaysProps.postHolidayIsSuccess ||
          holidaysProps.deleteManyHolidayIsSuccess ||
          holidaysProps.putHolidayIsSuccess
        }
      />
      <AdminPostCharaceteristicModal onPost={handlePostHoliday} />
    </>
  );
};
