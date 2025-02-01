import {
  InputSearch,
  IPostCharacteristicForm,
  useCharacteristics,
} from '../../../shared';
import {
  AdminCharacteristicsTable,
  AdminPostCharaceteristicModal,
} from 'apps/client/src/widgets/admin';
import { AdminPostCharacteristic } from 'apps/client/src/features/admin';
import { MessageModal } from '../../../features/message';
import { useNationalCuisines } from '../model/hooks/use-national-cuisines';
import { FC } from 'react';
import { CharactersticsLayout } from 'apps/client/src/application';

export const AdminNationalCuisinesPage: FC = () => {
  const {
    newCharacteristicValue,
    selectedCharacteristics,
    onTogglePostCharacteristicModalVisibility,
  } = useCharacteristics();

  const nationalCuisinesProps = useNationalCuisines({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  const handlePutNationalCuisine = () => {
    if (newCharacteristicValue) {
      if (typeof newCharacteristicValue.payload === 'boolean') {
        nationalCuisinesProps.put({
          data: { isVisible: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      } else {
        nationalCuisinesProps.put({
          data: { title: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      }
    }
  };

  const handleDeleteNationalCuisines = () =>
    selectedCharacteristics
      ? nationalCuisinesProps.deleteMany(
          selectedCharacteristics
        )
      : alert('Wait!');

  const handlePostNationalCuisine = (data: IPostCharacteristicForm) => {
    nationalCuisinesProps.post(data);
    onTogglePostCharacteristicModalVisibility();
  };

  return (
    <>
      <CharactersticsLayout>
        <InputSearch
          value={nationalCuisinesProps.title}
          onChange={nationalCuisinesProps.onChangeTitle}
        />
        <AdminCharacteristicsTable
          onDeleteMany={handleDeleteNationalCuisines}
          onPut={handlePutNationalCuisine}
          onChangePage={(e, newPage) =>
            nationalCuisinesProps.onChangePage(e, newPage)
          }
          count={nationalCuisinesProps.items?.countItems}
          limit={nationalCuisinesProps.limit}
          currentPage={nationalCuisinesProps.currentPage}
          onChangeLimit={nationalCuisinesProps.onChangeLimit}
        />
      </CharactersticsLayout>
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={
          nationalCuisinesProps.postIsLoading ||
          nationalCuisinesProps.deleteManyIsLoading ||
          nationalCuisinesProps.itemsIsLoading
        }
        isError={
          nationalCuisinesProps.itemsIsError ||
          nationalCuisinesProps.postIsError ||
          nationalCuisinesProps.deleteManyIsError
        }
        isSuccess={
          nationalCuisinesProps.postIsSuccess ||
          nationalCuisinesProps.deleteManyIsSuccess ||
          nationalCuisinesProps.putIsSuccess
        }
      />
      <AdminPostCharaceteristicModal onPost={handlePostNationalCuisine} />
    </>
  );
};
