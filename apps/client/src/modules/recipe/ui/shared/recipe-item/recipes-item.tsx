import { Recipe } from '@prisma/client';
import { FC } from 'react';
import { RecipePhotoes } from './recipe-photoes';

type Props = Recipe;

export const RecipesItem: FC<Props> = (props) => {
  return (
    <li className='border-2 mb-2 p-5 flex items-center justify-between'>
      <RecipePhotoes urls={props.photos} />
      <div>
        <h3>
            {props.title}
        </h3>
      </div>
    </li>
  );
};
