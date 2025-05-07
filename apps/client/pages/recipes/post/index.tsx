import { Provider } from 'jotai';
import { PostRecipePage } from '../../../src/pages-components/recipe';
import { postRecipeStore } from 'src/application/stores/post-recipe.store';

export default function Index() {
  return (
    <Provider store={postRecipeStore}>
      <PostRecipePage />
    </Provider>
  );
}
