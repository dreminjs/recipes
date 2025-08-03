import { PostRecipePage } from '@/modules/recipe';
import { Provider } from 'jotai';
import { postRecipeStore } from 'src/app';

export default function Index() {
  return (
    <Provider store={postRecipeStore}>
      <PostRecipePage />
    </Provider>
  );
}
