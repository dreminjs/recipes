import { FC, useRef, useState } from 'react';
import { BasicModal, IPostRecipeForm } from '@/shared';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import Image from 'next/image';
import { Button } from 'src/shared/ui/button';

interface IProps {
  register: UseFormRegister<IPostRecipeForm>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const UploadRecipePhotoModal: FC<IProps> = ({
  register,
  isOpen,
  onClose,
  error
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => inputRef.current?.click();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-3 w-full">
        {imagePreview ? (
          <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={imagePreview}
              alt="Превью рецепта"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </div>
        ) : (
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="mt-2 text-sm text-gray-600">
                Превью рецепта появится здесь
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Рекомендуемый размер: 1200×800px
              </p>
            </div>
          </div>
        )}

        <Button
          disabled={false}
          onClick={onClick}
          type="button"
          className="w-full bg-amber-100 text-amber-800 hover:bg-amber-200"
        >
          {imagePreview ? 'Изменить фото' : 'Загрузить фото'}
        </Button>

        <input
          {...register('photo')}
          ref={(e) => {
            register('photo').ref(e);
            inputRef.current = e;
          }}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {error?.message && (
          <p className="text-red-500 text-sm mt-1">
            {error.message.toString()}
          </p>
        )}
      </div>
    </BasicModal>
  );
};
