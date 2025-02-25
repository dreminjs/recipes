import { RecipeSelection } from '@/features/recipe';
import { Characteristics } from '@/interfaces';

const characteristics: [Characteristics, Characteristics, Characteristics] = [
  'type',
  'national-cuisine',
  'holiday',
];

export const MainRecipesPage = () => (
  <div>
    {characteristics.map((type, idx) => (
      <RecipeSelection idx={idx} key={type} type={type} />
    ))}
  </div>
);
