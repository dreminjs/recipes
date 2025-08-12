import { Button, Func } from '@/shared';
import { FC } from 'react';

interface IProps {
  onOpenCharacteristicsModal: Func;
  onOpenStepsModal: Func;
  onToggleUploadFileModalVisiblity: Func;
  onOpenIngredientsModal: Func
}

export const ActionsButtons: FC<IProps> = ({
  onOpenCharacteristicsModal,
  onOpenStepsModal,
  onToggleUploadFileModalVisiblity,
  onOpenIngredientsModal
}) => {
  return (
    <>
      <div className="flex gap-2">
        <Button onClick={onOpenCharacteristicsModal}>
          Выбрать характеристики
        </Button>
        <Button onClick={onOpenStepsModal}>Добавить шаги</Button>
        <Button onClick={onOpenIngredientsModal}>
          Добавить ингридиенты
        </Button>
        <Button onClick={onToggleUploadFileModalVisiblity}>
          Загрузить Фото
        </Button>
      </div>
    </>
  );
};
