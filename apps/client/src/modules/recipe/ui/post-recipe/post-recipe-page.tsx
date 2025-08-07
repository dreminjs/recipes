import { useState } from 'react';
import { PostRecipeForm } from './post-recipe-form';
import { ChooseCharacteristicsModal } from '@/modules/admin/';

export const PostRecipePage = () => {
  const [isCharaceteristicModalVisible, setIsCharaceteristicModalVisible] =
    useState(false);

  const handleToggleCharacteristicModal = () =>
    setIsCharaceteristicModalVisible((prev) => !prev);

  return (
    <>
      <PostRecipeForm onOpen={handleToggleCharacteristicModal} />
      <ChooseCharacteristicsModal
        isVisible={isCharaceteristicModalVisible}
        onClose={handleToggleCharacteristicModal}
      />
    </>
  );
};
