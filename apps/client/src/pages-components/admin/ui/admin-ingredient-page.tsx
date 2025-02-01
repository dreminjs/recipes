import Link from 'next/link';
import {
  AdminCharacteristicsTable,
  AdminIngredientsTable,
  AdminPostIngredientModal,
} from 'apps/client/src/widgets/admin';
import { useIngredients } from '../model/hooks/use-ingredients';
import { CharactersticsLayout } from 'apps/client/src/application';
import {
  InputSearch,
  IPostCharacteristicForm,
  IPostIngredientForm,
  useCharacteristics,
} from 'apps/client/src/shared';

export const AdminIngredientPage = () => {
  const {
    newCharacteristicValue,
    selectedCharacteristics,
    onTogglePostCharacteristicModalVisibility,
    isPostCharacteristicModalVisible,
  } = useCharacteristics();

  const ingredientsProps = useIngredients({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  const handlePutIngredient = () => {
    
    if (newCharacteristicValue) {

      console.log('hello')

      if (typeof newCharacteristicValue.payload === 'boolean') {
        ingredientsProps.put({
          data: { isVisible: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      } else if (
        newCharacteristicValue.payload === 'ML' ||
        newCharacteristicValue.payload === 'L' ||
        newCharacteristicValue.payload === 'KG' ||
        newCharacteristicValue.payload === 'G' ||
        newCharacteristicValue.payload === 'N'
      ) {
        ingredientsProps.put({
          data: { measure: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      } else {
        ingredientsProps.put({
          data: { title: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      }
    }
  };

  const handleDeleteIngredients = () =>
    selectedCharacteristics
      ? ingredientsProps.deleteMany(selectedCharacteristics)
      : alert('Wait!');

  const handlePostIngredient = (data: IPostIngredientForm) => {
    ingredientsProps.post(data);
    onTogglePostCharacteristicModalVisibility();
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
          hasMeasure
          onPut={handlePutIngredient}
          onDeleteMany={handleDeleteIngredients}
          limit={ingredientsProps.limit}
          currentPage={ingredientsProps.currentPage}
          onChangePage={ingredientsProps.onChangePage}
          onChangeLimit={ingredientsProps.onChangeLimit}
        />
      </CharactersticsLayout>
      <AdminPostIngredientModal
        onToggleVisibility={onTogglePostCharacteristicModalVisibility}
        onPost={handlePostIngredient}
        isOpen={isPostCharacteristicModalVisible}
      />
    </>
  );
};
