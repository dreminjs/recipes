import { useId } from 'react';
import { RecipeSelection } from '../../../features/recipe';
import { Characteristics } from 'interfaces';

const characteristics: [
    Characteristics,
    Characteristics,
    Characteristics
] = ["type","national-cuisine","holiday"];

export const MainRecipesPage = () => {

  return (
    <div>
      {characteristics.map((type, idx) => (
        <RecipeSelection idx={idx} key={type} type={type} />
      ))}
    </div>
  );
};
