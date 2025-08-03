import { useState } from 'react';
import { PostRecipeForm } from './post-recipe-form';
import { ChooseCharacteristicsModal } from '@/modules/admin/';
import {Layout} from '@/app/';

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
