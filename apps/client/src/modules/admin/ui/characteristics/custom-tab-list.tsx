import { Box, Tab } from '@mui/material';
import { FC } from 'react';
import { TabList } from '@mui/lab';
import { IChoosedItemTabContent, IChooseItemTabContent } from '../../model/interfaces/characteristics.interface';

interface IProps {
  onChange: (_: unknown, newTab: string) => void;
  tabs: IChoosedItemTabContent[] | IChooseItemTabContent[];
}

export const CustomTabList: FC<IProps> = ({ onChange, tabs }) => {
  return (
    <Box
      sx={{ maxWidth: { xs: 320, sm: 420, display: "flex", justifyContent: "center" }, backgroundColor: 'transparent'}}
    >
      <TabList
        textColor="inherit"
        indicatorColor="primary"
        onChange={onChange}
        scrollButtons
        variant="scrollable"
      >
        {tabs.map(({ label }, idx) => (
          <Tab
            sx={{ color: '#FF5733', fontWeight: '600' }}
            key={idx}
            value={idx.toString()}
            label={label}
          />
        ))}
      </TabList>
    </Box>
  );
};
