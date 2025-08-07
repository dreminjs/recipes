import { useState } from 'react';
import { PostRecipeForm } from './post-recipe-form';
import { ChooseCharacteristicsModal } from '@/modules/admin/';
import { StepsModal } from './steps/steps-modal';

export const PostRecipePage = () => {
  const [isCharaceteristicModalVisible, setIsCharaceteristicModalVisible] =
    useState(false);

  const [isStepsModalVisible, setIsStepsModalVisible] = useState(false)

  const handleToggleCharacteristicModal = () =>
    setIsCharaceteristicModalVisible((prev) => !prev);

  const handleToggleStepsModal = () => setIsStepsModalVisible(prev => !prev)

  return (
    <>
      <PostRecipeForm onOpenStepsModal={handleToggleStepsModal} onOpenCharacteristicsModal={handleToggleCharacteristicModal} />
      <ChooseCharacteristicsModal
        isVisible={isCharaceteristicModalVisible}
        onClose={handleToggleCharacteristicModal}
      />
      <StepsModal isOpen={isStepsModalVisible} onClose={handleToggleStepsModal} />
    </>
  );
};
