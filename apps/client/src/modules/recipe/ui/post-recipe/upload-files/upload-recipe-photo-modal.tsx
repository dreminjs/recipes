import { FC, useEffect, useRef, useState, useCallback } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { BasicModal } from '@/shared';
import { Button } from '@mui/material';
import {
  FieldError,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { PhotoItem } from './photo-item';
import { IPostRecipeForm } from '../../../model/types/create-recipe.dto';
import { PreviewMessage } from './preview-message';

type ImageItem = {
  id: string;
  preview: string;
  file: File;
};

type PhotosField = [File] | [File, ...File[]];

interface IProps {
  register: UseFormRegister<IPostRecipeForm>;
  isOpen: boolean;
  onClose: () => void;
  error?: string | FieldError;
  setValue: UseFormSetValue<IPostRecipeForm>;
  clearErrors: UseFormClearErrors<IPostRecipeForm>;
}

export const UploadRecipePhotoModal: FC<IProps> = ({
  register,
  isOpen,
  onClose,
  error,
  setValue,
  clearErrors,
}) => {
  const [items, setItems] = useState<ImageItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onClick = () => inputRef.current?.click();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setItems((prev) => [
            ...prev,
            {
              id: `img-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 11)}`,
              preview: reader.result as string,
              file,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    const files = items.map((item) => item.file);

    if (files.length > 0) {
      setValue('photos', files as PhotosField);
      clearErrors('photos');
    } else {
      setValue('photos', [] as unknown as PhotosField);
    }
  }, [clearErrors, items, setValue]);

  return (
    <BasicModal
      sx={{ maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map((item) => item.id)}>
            {items.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {items.map((item) => (
                  <PhotoItem
                    key={item.id}
                    id={item.id}
                    preview={item.preview}
                    removeImage={removeImage}
                  />
                ))}
              </div>
            ) : (
              <PreviewMessage />
            )}
          </SortableContext>
        </DndContext>

        <Button
          onClick={onClick}
          type="button"
          className="w-full bg-amber-100 text-amber-800 hover:bg-amber-200"
        >
          {items.length ? 'Добавить ещё фото' : 'Загрузить фото'}
        </Button>

        <input
          {...register('photos')}
          ref={(e) => {
            register('photos').ref(e);
            inputRef.current = e;
          }}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          multiple
        />

        {error && (
          <p className="text-red-500 text-sm mt-1">{error.toString()}</p>
        )}
      </div>
    </BasicModal>
  );
};
