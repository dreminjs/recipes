import { FC, MutableRefObject, useRef, useState } from 'react';
import { IPostRecipeForm } from '../../../shared';
import { FieldError, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

interface IProps {
  register: UseFormRegister<IPostRecipeForm>;
  error?: FieldError;
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
          width={280}
          height={280}
          src={imagePreview}
          alt="Recipe Preview"
        />
      )}
      <button className='block border-2 px-5 py-2' type="button" onClick={onClick}>Выбрать превью для рецепта</button>
      <input
        {...register('photo', {
          onChange: handleImageChange,
        })}
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }} 
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

