import { Recipe } from '@prisma/client';
import { FC } from 'react';
import { RecipePhotoes } from './recipe-photoes';
import { RecipeInfo } from './recipe-info';

type Props = Recipe;

export const RecipesItem: FC<Props> = (props) => {
  return (
    <li className="border-2 mb-2 p-5 flex items-center rounded-lg">
      <RecipePhotoes urls={props.photos} />
      <RecipeInfo
        stepsCount={0}
        ingredientsCount={0}
        title={''}
        description={''}
      />
    </li>
  );
};
