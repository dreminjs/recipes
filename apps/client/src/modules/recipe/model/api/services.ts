import { instance, SERVICE_KEYS } from '@/shared*';
import { CreateRecipeDto } from '../types/create-recipe.dto';

export const createOne = (data: CreateRecipeDto) => {
  const formData = new FormData();

  formData.append('holidayId', data.holidayId);
  formData.append('nationalCuisineId', data.nationalCuisineId);
  formData.append('typeId', data.typeId);
  formData.append('title', data.title);
  formData.append('description', data.description);

  data.photos.forEach((photo, index) => {
    formData.append(`photos`, photo);
  });
  return instance.post(`${SERVICE_KEYS.recipes}`, formData);
};