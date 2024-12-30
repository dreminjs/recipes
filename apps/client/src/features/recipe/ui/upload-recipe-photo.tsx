import { FC, useState } from 'react';
import { IPostRecipeForm } from '../../../shared';
import { FieldError, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

interface IProps {
  register: UseFormRegister<IPostRecipeForm>;
  error?: FieldError;
}

export const UploadRecipePhoto: FC<IProps> = ({ register, error }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
    <div className='mb-3'>
      {imagePreview && <Image src={imagePreview} alt="Recipe Preview" />}
      <input
        {...register('photo')}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};
