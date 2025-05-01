import { InputSearch, IPostCharacteristicForm } from '@/shared';
import { AdminPostCharaceteristicModal } from '@/widgets/admin';
import { MessageModal } from '@/features/message';
import { FC, useCallback } from 'react';
import { useTypes } from '../model/hooks/use-types';
import { CharactersticsLayout } from '@/application/';
import dynamic from 'next/dynamic';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  isPostCharacteristicModalVisibleAtom,
  selectedCharacteristicsIdsAtom,
} from 'src/application/providers/characteristics-provider';

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

  const selectedCharacteristics = useAtomValue(selectedCharacteristicsIdsAtom);

  const setIsPostModalVisible = useSetAtom(
    isPostCharacteristicModalVisibleAtom
  );

  const handleTogglePostModalVisible = () =>
    setIsPostModalVisible((prev) => !prev);

  const handlePutType = () => {
    // if (newCharacteristicValue) {
    //   if (typeof newCharacteristicValue.payload === 'boolean') {
    //     typesProps.put({
    //       data: { isVisible: newCharacteristicValue.payload },
    //       id: newCharacteristicValue.id,
    //     });
    //   } else {
    //     typesProps.put({
    //       data: { title: newCharacteristicValue.payload },
    //       id: newCharacteristicValue.id,
    //     });
    //   }
    // }
  };

  const handleDeleteTypes = () => {
    selectedCharacteristics
      ? typesProps.deleteMany(selectedCharacteristics)
      : alert('Wait!');
  };

  const handlePostType = (data: IPostCharacteristicForm) => {
    typesProps.post(data);
    handleTogglePostModalVisible();
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
        onToggleVisible={handleTogglePostModalVisible}
        onPost={handlePostType}
      />
    </>
  );
};
