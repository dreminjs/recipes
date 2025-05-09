import { FC, useRef, useState } from 'react';
import { IPostRecipeForm } from '@/shared';
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
}

export const UploadRecipePhoto: FC<IProps> = ({ register, error }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-3">
      {imagePreview && (
        <Image
          width={480}
          height={300}
          src={imagePreview}
          alt="Recipe Preview"
        />
      )}
      <Button
          

        className="block border-2 px-5 py-2"
        onClick={onClick}
      >
        Выбрать превью для рецепта
      </Button>
      <input
        {...register('photo')}
        ref={(e) => {
          register('photo').ref(e)
          inputRef.current = e;
        }}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      {error?.message && <p>{error.message.toString()}</p>}
    </div>
  );
};
