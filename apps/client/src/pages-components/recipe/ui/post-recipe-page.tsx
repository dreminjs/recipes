import { PostRecipeForm } from '@/widgets/recipe';
import { ChooseCharacteristicsModal } from '@/widgets/characteristic';
import { useState } from 'react';
import { Layout } from '../model/ui/layout';

export const PostRecipePage = () => {
  const [isCharaceteristicModalVisible, setIsCharaceteristicModalVisible] =
    useState(false);

  const handleToggleCharacteristicModal = () =>
    setIsCharaceteristicModalVisible((prev) => !prev);

  return (
    <Layout>
      <PostRecipeForm onOpen={handleToggleCharacteristicModal} />
      <ChooseCharacteristicsModal
        isVisible={isCharaceteristicModalVisible}
        onClose={handleToggleCharacteristicModal}
      />
    </Layout>
  );
};
