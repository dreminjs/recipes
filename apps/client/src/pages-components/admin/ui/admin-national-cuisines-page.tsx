import {
  InputSearch,
  useCharacteristics,
} from '../../../shared';
import { AdminCharacteristicsTable } from '../../../widgets/admin';
import { AdminPostCharacteristic } from '../../../features/admin';
import { MessageModal } from '../../../features/message';
import { useNationalCuisines } from '../model/use-national-cuisines';
import { FC } from 'react';
import { CharactersticsLayout } from 'apps/client/src/application';

export const AdminNationalCuisinesPage: FC = () => {
  const { newCharacteristicValue, selectedCharacteristics } =
    useCharacteristics();

  const nationalCuisinesProps = useNationalCuisines({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  const handlePutNationalCuisine = () => {
    if (newCharacteristicValue) {
      if (typeof newCharacteristicValue.payload === 'boolean') {
        nationalCuisinesProps.putNationalCuisine({
          data: { isVisible: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      } else {
        nationalCuisinesProps.putNationalCuisine({
          data: { title: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      }
    }
  };

  const handleDeleteNationalCuisines = () =>
    selectedCharacteristics
      ? nationalCuisinesProps.deleteManyNationalCuisines(selectedCharacteristics)
      : alert('Wait!');

  return (
    <>
      <CharactersticsLayout>
        <AdminPostCharacteristic
          onPost={(data) => nationalCuisinesProps.postNationalCuisine(data)}
          label="national cuisines"
        />
        <InputSearch
          value={nationalCuisinesProps.title}
          onChange={nationalCuisinesProps.handleChangeTitle}
        />
        <AdminCharacteristicsTable
          onDeleteMany={handleDeleteNationalCuisines}
          onPut={handlePutNationalCuisine}
          onChangePage={(e, newPage) => nationalCuisinesProps.handleChangePage(e, newPage)}
          count={nationalCuisinesProps.nationalCuisines?.countItems}
          limit={nationalCuisinesProps.limit}
          currentPage={nationalCuisinesProps.currentPage}
          onChangeLimit={nationalCuisinesProps.handleChangeLimit}
        />
      </CharactersticsLayout>
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={
          nationalCuisinesProps.postNationalCuisineIsLoading ||
          nationalCuisinesProps.deleteManyNationalCuisinesIsLoading ||
          nationalCuisinesProps.nationalCuisinesIsLoading
        }
        isError={
          nationalCuisinesProps.nationalCuisinesIsError ||
          nationalCuisinesProps.postNationalCuisineIsError ||
          nationalCuisinesProps.deleteManyNationalCuisinesIsError
        }
        isSuccess={
          nationalCuisinesProps.postNationalCuisineIsSuccess ||
          nationalCuisinesProps.deleteManyNationalCuisinesIsSuccess ||
          nationalCuisinesProps.putNationalCuisineIsSuccess
        }
      />
    </>
  );
};
