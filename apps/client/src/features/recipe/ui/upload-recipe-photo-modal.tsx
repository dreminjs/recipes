import { FC, useEffect, useRef, useState, useCallback } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { BasicModal } from '@/shared';
import { Button } from '@mui/material';
import { FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IPostRecipeForm } from '@/shared';
import { PhotoItem } from './photo-item';

type ImageItem = {
  id: string;
  preview: string;
  file: File;
};

interface IProps {
  register: UseFormRegister<IPostRecipeForm>;
  isOpen: boolean;
  onClose: () => void;
  error?: string | FieldError 
  setValue: UseFormSetValue<IPostRecipeForm>
}

export const UploadRecipePhotoModal: FC<IProps> = ({
  register,
  isOpen,
  onClose,
  error,
  setValue,
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
      
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setItems(prev => [
            ...prev,
            {
              id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
              preview: reader.result as string,
              file,
            }
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    setValue('photos', items.map(item => item.file));
  }, [items, setValue]);

  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-3 w-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map(item => item.id)}>
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
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="mt-2 text-sm text-gray-600">
                    Превью рецептов появится здесь
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Рекомендуемый размер: 1200×800px
                  </p>
                </div>
              </div>
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
          <p className="text-red-500 text-sm mt-1">
            {error.toString()}
          </p>
        )}
      </div>
    </BasicModal>
  );
};

