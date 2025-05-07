import { InputSearch, IPostCharacteristicForm } from '@/shared';
import { AdminPostCharaceteristicModal } from '@/widgets/admin';
import { MessageModal } from '@/features/message';
import { useNationalCuisines } from '../model/hooks/use-national-cuisines';
import { FC } from 'react';
import { CharactersticsLayout } from '@/application/';
import dynamic from 'next/dynamic';
import { useAdminCharacteristicActions } from '../model/hooks/use-admin-characteristic-actions';

const AdminCharacteristicsTable = dynamic(
  () => import('@/widgets/admin/').then((mod) => mod.AdminCharacteristicsTable),
  { ssr: false }
);

export const AdminNationalCuisinesPage: FC = () => {
  const nationalCuisinesProps = useNationalCuisines({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  const {
    newCharacteristic,
    onToggleModalVisibility,
    selectedCharacteristics,
  } = useAdminCharacteristicActions();

  return (
    <>
      <CharactersticsLayout>
        <InputSearch
          value={nationalCuisinesProps.title}
          onChange={nationalCuisinesProps.onChangeTitle}
        />
        <AdminCharacteristicsTable
          type="national-cuisines"
          onDeleteMany={() =>
            nationalCuisinesProps.deleteMany(selectedCharacteristics)
          }
          onPut={() =>
            newCharacteristic && nationalCuisinesProps.onPut(newCharacteristic)
          }
          onChangePage={(_, newPage) =>
            nationalCuisinesProps.onChangePage(newPage)
          }
          count={nationalCuisinesProps.items?.countItems || 0}
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
        isLoading={nationalCuisinesProps.isLoading}
        isError={nationalCuisinesProps.isError}
        isSuccess={nationalCuisinesProps.isSuccess}
      />
      <AdminPostCharaceteristicModal
        onPost={(data: IPostCharacteristicForm) => {
          nationalCuisinesProps.post(data);
          onToggleModalVisibility();
        }}
        onToggleVisible={onToggleModalVisibility}
      />
    </>
  );
};
