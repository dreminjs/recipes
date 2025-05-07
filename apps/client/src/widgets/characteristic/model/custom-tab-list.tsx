import { TabList } from '@mui/lab';
import { Tab } from '@mui/material';
import { FC } from 'react';

interface IProps {
  onChange: (event: React.SyntheticEvent, newTab: string) => void;
}

export const CustomTabList: FC<IProps> = ({ onChange }) => {
  return (
    <TabList sx={{ margin: '0 auto', width: '250px' }} onChange={onChange}>
      <Tab label="выбрать" value="1" />
      <Tab label="выбранное" value="2" />
    </TabList>
  );
};
