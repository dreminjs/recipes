import { TabList } from '@mui/lab';
import { Tab } from '@mui/material';
import { FC } from 'react';

interface IProps {
  onChange: (event: React.SyntheticEvent, newTab: string) => void;
}

export const CustomTabList: FC<IProps> = ({ onChange }) => {
  return (
    <TabList
      textColor="inherit"
      indicatorColor="primary"
      sx={{ margin: '0 auto', width: '250px', backgroundColor: 'transparent' }}
      onChange={onChange}
    >
      <Tab
        sx={{ color: '#FF5733', fontWeight: '600' }}
        label="выбрать"
        value="1"
      />
      <Tab
        sx={{ color: '#FF5733', fontWeight: '600' }}
        label="выбранное"
        value="2"
      />
    </TabList>
  );
};
