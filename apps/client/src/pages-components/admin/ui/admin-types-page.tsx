'use client';

import {
  CharacteristicsContext,
  InputSearch,
  useDeleteManyTypes,
  useDeleteType,
  useGetTypes,
  usePostType,
  usePutType,
  useTypes,
} from '../../../shared';
import { AdminCharacteristicsTable } from '../../../widgets/admin';
import { AdminPostCharacteristic } from '../../../features/admin';
import { MessageModal } from '../../../features/message';
import { FC, useEffect, useState, createContext, useContext } from 'react';
import { useDebounce } from 'use-debounce';
import { Prisma, Type } from 'prisma/prisma-client';
import { IItemsPaginationResponse } from 'interfaces';
import { CharacteristicsProvider } from 'apps/client/src/application';
import { Pagination, TablePagination } from '@mui/material';

export const AdminTypesPage: FC = () => {
  const { newCharacteristicValue, selectedCharacteristics } = useContext(
    CharacteristicsContext
  );

  const typesProps = useTypes({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  const handlePutType = () => {
    if (newCharacteristicValue) {
      if (typeof newCharacteristicValue.payload === 'boolean') {
        typesProps.putType({
          data: { isVisible: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      } else {
        typesProps.putType({
          data: { title: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      }
    }
  };

  const handleDeleteTypes = () =>
    selectedCharacteristics
      ? typesProps.deleteTypes(selectedCharacteristics)
      : alert('Wait!');

  return (
    <>
      <div className="flex flex-col items-center">
        <AdminPostCharacteristic
          onPost={(data) => typesProps.postType(data)}
          label="type"
        />
        <InputSearch
          value={typesProps.title}
          onChange={typesProps.handleChangeTitle}
        />
        <AdminCharacteristicsTable
          onDeleteMany={handleDeleteTypes}
          onPut={handlePutType}
          onChangePage={(e,newPage) => typesProps.handleChangePage(e,newPage)}
          count={typesProps.types?.countItems}
          limit={typesProps.limit}
          currentPage={typesProps.currentPage}
          onChangeLimit={typesProps.handleChangeLimit}
        />
      
      </div>
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={
          typesProps.postTypeIsLoading ||
          typesProps.deleteTypesIsLoading ||
          typesProps.typesIsLoading
        }
        isError={
          typesProps.postTypeIsError ||
          typesProps.putTypeIsError ||
          typesProps.deleteTypesIsError
        }
        isSuccess={
          typesProps.postTypeIsSuccess ||
          typesProps.deleteTypesIsSuccess ||
          typesProps.putTypeIsSuccess
        }
      />
    </>
  );
};
