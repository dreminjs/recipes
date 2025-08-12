import { TabPanel } from '@mui/lab';
import { ChoosedIngredientsList } from './choosed-ingredients-list';

export const ChoosedIngredientsTab = () => {
  return (
    <TabPanel value='1'>
      <ChoosedIngredientsList />
    </TabPanel>
  );
};
