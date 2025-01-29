import { RecipeSelection } from '../../../features/recipe';

export const MainRecipesPage = () => {
  return (
    <div>
      {[1, 2, 3].map((el) => (
        <RecipeSelection key={el} idx={el} />
      ))}
    </div>
  );
};
    