import { InputSearch, IPostCharacteristicForm } from '@/shared';
import { AdminPostCharaceteristicModal } from '@/widgets/admin';
import { MessageModal } from '@/features/message';
import { FC, useCallback } from 'react';
import { useTypes } from '../model/hooks/use-types';
import { CharactersticsLayout } from '@/application/';
import dynamic from 'next/dynamic';
import { useCharacteristicActions } from '../model/hooks/use-characteristic-actions';

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
    setActiveCell,
    onToggleModalVisibility,
    selectedCharacteristics,
  } = useCharacteristicActions();

  const handlePutType = () => {
    if (newCharacteristic) {
      setActiveCell(null);
      if (typeof newCharacteristic.payload === 'boolean') {
        typesProps.put({
          data: { isVisible: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      } else {
        typesProps.put({
          data: { title: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      }
    }
  };

  const handleDeleteTypes = () => {
    setActiveCell(null);

    typesProps.deleteMany(selectedCharacteristics);
  };

  const handlePostType = (data: IPostCharacteristicForm) => {
    typesProps.post(data);
    onToggleModalVisibility();
  };

  return (
    <>
      <CharactersticsLayout>
        <InputSearch
          value={typesProps.title}
          onChange={typesProps.onChangeTitle}
        />
        <AdminCharacteristicsTable
          onDeleteMany={handleDeleteTypes}
          onPut={handlePutType}
          onChangePage={useCallback(
            (_, newPage) => {
              typesProps.onChangePage(newPage);
            },
            [typesProps]
          )}
          type="type"
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
        onToggleVisible={onToggleModalVisibility}
        onPost={handlePostType}
      />
    </>
  );
};
