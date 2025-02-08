import {
  InputSearch,
  IPostCharacteristicForm,
  useCharacteristics,
} from 'apps/client/src/shared';
import {

  AdminPostCharaceteristicModal,
} from 'apps/client/src/widgets/admin';
import { MessageModal } from 'apps/client/src/features/message';
import { FC } from 'react';
import { useTypes } from '../model/hooks/use-types';
import { CharactersticsLayout } from 'apps/client/src/application';
import dynamic from 'next/dynamic';

const AdminCharacteristicsTable = dynamic(
  () => import('apps/client/src/widgets/admin/').then((mod) => mod.AdminCharacteristicsTable),
  { ssr: false }
);

export const AdminTypesPage: FC = () => {
  const {
    newCharacteristicValue,
    selectedCharacteristics,
    onTogglePostCharacteristicModalVisibility,
    onChangeLimit
  } = useCharacteristics();

  const typesProps = useTypes({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  
  const handlePutType = () => {
    if (newCharacteristicValue) {
      if (typeof newCharacteristicValue.payload === 'boolean') {
        typesProps.put({
          data: { isVisible: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      } else {
        typesProps.put({
          data: { title: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      }
    }
  };

  const handleDeleteTypes = () => {
    selectedCharacteristics
      ? typesProps.deleteMany(selectedCharacteristics)
      : alert('Wait!');
  };

  const handlePostType = (data: IPostCharacteristicForm) => {
    typesProps.post(data);
    onTogglePostCharacteristicModalVisibility();
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
          onChangePage={(_, newPage) => {
            typesProps.onChangePage(newPage)
          }}
          count={typesProps.items?.countItems ? typesProps.items?.countItems: 1}
          limit={typesProps.limit}
          currentPage={typesProps.currentPage}
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
          typesProps.postIsLoading ||
          typesProps.deleteIsLoading ||
          typesProps.itemsIsLoading
        }
        isError={
          typesProps.postIsError ||
          typesProps.putIsError ||
          typesProps.deleteIsError
        }
        isSuccess={
          typesProps.postIsSuccess ||
          typesProps.deleteManyIsSuccess ||
          typesProps.putIsSuccess
        }
      />
      <AdminPostCharaceteristicModal onPost={handlePostType} />
    </>
  );
};
