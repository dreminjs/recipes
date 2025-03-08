import { PostRecipeForm } from '@/widgets/recipe';
import { ChooseCharacteristicsModal } from '@/widgetscharacteristic';
import { useState } from 'react';

export const PostRecipePage = () => {
  const [isCharaceteristicModalVisible, setIsCharaceteristicModalVisible] =
    useState(false);

  const handleToggleCharacteristicModal = () => setIsCharaceteristicModalVisible((prev) => !prev);

  return (
    <div>
      <h3 className="text-3xl">Добавить рецепт</h3>
      <PostRecipeForm onOpen={handleToggleCharacteristicModal}/>
      <ChooseCharacteristicsModal
        isVisible={isCharaceteristicModalVisible}
        onClose={handleToggleCharacteristicModal}
      />
    </div>
  );
};
