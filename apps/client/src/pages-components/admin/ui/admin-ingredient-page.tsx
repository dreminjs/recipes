import Link from 'next/link';
import { AdminPostIngredientModal } from '@/widgets/admin';
import { useIngredients } from '../model/hooks/use-ingredients';
import { CharactersticsLayout } from '@/application/';
import { InputSearch, IPostIngredientForm } from '@/shared';
import dynamic from 'next/dynamic';
import { useCharacteristicActions } from '../model/hooks/use-characteristic-actions';
import { MessageModal } from '@/featuresmessage';

const AdminCharacteristicsTable = dynamic(
  () => import('@/widgets/admin/').then((mod) => mod.AdminCharacteristicsTable),
  { ssr: false }
);

export const AdminIngredientPage = () => {
  const {
    newCharacteristic,
    selectedCharacteristics,
    onToggleModalVisibility,
  } = useCharacteristicActions();

  const ingredientsProps = useIngredients({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  const handlePutIngredient = () => {
    if (newCharacteristic) {
      if (typeof newCharacteristic.payload === 'boolean') {
        ingredientsProps.put({
          data: { isVisible: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      } else if (
        newCharacteristic.payload === 'ML' ||
        newCharacteristic.payload === 'L' ||
        newCharacteristic.payload === 'KG' ||
        newCharacteristic.payload === 'G' ||
        newCharacteristic.payload === 'N'
      ) {
        ingredientsProps.put({
          data: { measure: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      } else {
        ingredientsProps.put({
          data: { title: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      }
    }
  };

  return (
    <>
      <CharactersticsLayout>
        <Link className="mb-5 underline" href="ingredient/requests">
          Заявки
        </Link>
        <InputSearch
          value={ingredientsProps.title}
          onChange={ingredientsProps.onChangeTitle}
        />
        <AdminCharacteristicsTable
          addiotionalColoumns={['measure']}
          onPut={handlePutIngredient}
          onDeleteMany={() =>
            ingredientsProps.deleteMany(selectedCharacteristics)
          }
          limit={ingredientsProps.limit}
          currentPage={ingredientsProps.currentPage}
          onChangePage={ingredientsProps.onChangePage}
          onChangeLimit={ingredientsProps.onChangeLimit}
          count={ingredientsProps.items?.countItems || 0}
          type={'ingredient'}
        />
      </CharactersticsLayout>
      <AdminPostIngredientModal
        onToggleVisibility={onToggleModalVisibility}
        onPost={(data: IPostIngredientForm) => {
          ingredientsProps.post(data);
          onToggleModalVisibility();
        }}
      />
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={ingredientsProps.isLoading}
        isError={ingredientsProps.isError}
        isSuccess={ingredientsProps.isSuccess}
      />
    </>
  );
};
