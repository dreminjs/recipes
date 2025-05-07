import { FC } from 'react';
import { ChoosedItemsList } from '../model/ui/choosed-item-list-tab';
import { Box } from '@mui/material';

export const ChoosedCharacteristicsTabPanel: FC = () => {
  return (
    <Box sx={{ height: '400px' }}>
      <ChoosedItemsList />
    </Box>
  );
};
