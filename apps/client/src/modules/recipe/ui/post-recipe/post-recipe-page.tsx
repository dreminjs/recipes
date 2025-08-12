import { useState } from 'react';
import { PostRecipeForm } from './post-recipe-form';
import { StepsModal } from './steps/steps-modal';
import { ChooseIngredientsModal } from './ingredients/choose-ingredients-modal';
import { ChooseCharacteristicsModal } from './characteristics/choose-characteristics-modal';

export const PostRecipePage = () => {
  const [isCharaceteristicModalVisible, setIsCharaceteristicModalVisible] =
    useState(false);

  const [isStepsModalVisible, setIsStepsModalVisible] = useState(false);

  const [isIngredientsModalVisible, setIsIngredientsModalVisible] =
    useState(false);

  const handleToggleCharacteristicModal = () =>
    setIsCharaceteristicModalVisible((prev) => !prev);

  const handleToggleStepsModal = () => setIsStepsModalVisible((prev) => !prev);

  const handleToggleIngredientsModal = () =>
    setIsIngredientsModalVisible((prev) => !prev);

  return (
    <>
      <PostRecipeForm
        onOpenStepsModal={handleToggleStepsModal}
        onOpenCharacteristicsModal={handleToggleCharacteristicModal}
        onOpenIngredientsModal={handleToggleIngredientsModal}
      />
      <ChooseCharacteristicsModal
        isVisible={isCharaceteristicModalVisible}
        onClose={handleToggleCharacteristicModal}
      />
      <StepsModal
        isOpen={isStepsModalVisible}
        onClose={handleToggleStepsModal}
      />
      <ChooseIngredientsModal
        isOpen={isIngredientsModalVisible}
        onClose={handleToggleIngredientsModal}
      />
    </>
  );
};
