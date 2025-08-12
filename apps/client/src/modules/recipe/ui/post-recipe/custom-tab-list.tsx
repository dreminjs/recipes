import { Box, Tab } from '@mui/material';
import { FC } from 'react';
import { TabList } from '@mui/lab';

interface IProps {
  onChange: (_: unknown, newTab: string) => void;
  tabs: string[]
}

export const CustomTabList: FC<IProps> = ({ onChange, tabs }) => {
  return (
    <Box
    >
      <TabList
        textColor="inherit"
        indicatorColor="primary"
        onChange={onChange}
        scrollButtons
        variant="scrollable"
      >
        {tabs.map((label, idx) => (
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
