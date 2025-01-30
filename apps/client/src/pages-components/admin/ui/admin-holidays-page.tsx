'use client';

import { InputSearch, useCharacteristics } from '../../../shared';
import { AdminCharacteristicsTable } from '../../../widgets/admin';
import { AdminPostCharacteristic } from '../../../features/admin';
import { MessageModal } from '../../../features/message';
import { FC } from 'react';
import { useHolidays } from '../model/use-holidays';
import { CharactersticsLayout } from 'apps/client/src/application';
export const AdminHolidaysPage: FC = () => {
  const { newCharacteristicValue, selectedCharacteristics } =
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

  const handleDeleteTypes = () =>
    selectedCharacteristics
      ? holidaysProps.deleteManyHoliday(selectedCharacteristics)
      : alert('Wait!');

  return (
    <>
      <CharactersticsLayout>
        <AdminPostCharacteristic
          onPost={(data) => holidaysProps.postHoliday(data)}
          label="type"
        />
        <InputSearch
          value={holidaysProps.title}
          onChange={holidaysProps.handleChangeTitle}
        />
        <AdminCharacteristicsTable
          onDeleteMany={handleDeleteTypes}
          onPut={handlePutType}
          onChangePage={(e, newPage) => holidaysProps.handleChangePage(e, newPage)}
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
    </>
  );
};
