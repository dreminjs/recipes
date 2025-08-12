import { instance, SERVICE_KEYS } from '@/shared';
import { CreateRecipeDto } from '../types/create-recipe.dto';

export const createOne = (data: CreateRecipeDto) => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('holidayId', data.holidayId);
  formData.append('nationalCuisineId', data.nationalCuisineId);
  formData.append('typeId', data.typeId);

  data.ingredients.forEach((ingredient) => {
    formData.append(`ingredients`, JSON.stringify(ingredient));
  });

  data.steps.forEach((step) => {
    formData.append(`steps`, JSON.stringify(step));
  });

  data.photos.forEach((photo) => {
    formData.append(`photos`, photo);
  });
  return instance.post(`${SERVICE_KEYS.recipes}`, formData);
};
