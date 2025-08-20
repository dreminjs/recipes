import { instance, SERVICE_KEYS } from '@/shared';
import { CreateRecipeDto } from '../types/create-recipe.dto';
import { FindManyRecipesQueryParametersDto } from '../types/find-many-recipes.dto';
import { IItemsPaginationResponse } from 'interfaces';
import { Recipe } from '@prisma/client';

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
    formData.append(`file`, photo);
  });

  return instance.post(`${SERVICE_KEYS.recipes}`, formData);
};

export const findMany = async (dto: FindManyRecipesQueryParametersDto): Promise<IItemsPaginationResponse<Recipe>> => {
  const urlSearchParams = new URLSearchParams();

  if (dto?.types && dto.types.length >= 1) {
    urlSearchParams.append('typesIds', dto.types.map((item) => item).join(','));
  }

  if (dto?.nationalCuisines && dto.nationalCuisines.length >= 1) {
    urlSearchParams.append(
      'nationalCuisinesIds',
      dto.nationalCuisines.map((item) => item).join(',')
    );
  }

  if (dto?.holidays && dto.holidays.length >= 1) {
    urlSearchParams.append(
      'holidaysIds',
      dto.holidays.map((item) => item).join(',')
    );
  }

  if (dto?.maxSteps) {
    urlSearchParams.append('maxSteps', dto.maxSteps.toString());
  }

  if (dto?.maxIngredients) {
    urlSearchParams.append('maxIngredients', dto.maxIngredients.toString());
  }

  if (dto?.excludeIngredientsIds) {
    urlSearchParams.append(
      'excludeIngredientsIds',
      dto.excludeIngredientsIds.map((item) => item).join(',')
    );
  }

  return (await instance.get(`${SERVICE_KEYS.recipes}?${urlSearchParams.toString()}`)).data;
};
