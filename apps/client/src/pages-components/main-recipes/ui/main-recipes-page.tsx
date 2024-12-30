import { RecipeSelection } from '../../../features/recipe';

export const MainRecipesPage = () => {
  return (
    <div>
      <RecipeSelection idx={1} />
      <RecipeSelection idx={2} />
    </div>
  );
};
