import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { FC, useState } from 'react';

interface IProps {
  tabNumber: string;
}

export const ChooseCharacteristicTabPanel: FC<IProps> = ({ tabNumber }) => {
  const [tab, setTab] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };
  return (
    <TabPanel value={tabNumber}>
      <TabContext value={tab}>
        <TabList onChange={handleChange}>
          <Tab label="типы" value="1" />
          <Tab label="праздники" value="2" />
          <Tab label="нацинональные кухни" value="3" />
        </TabList>
      </TabContext>
    </TabPanel>
  );
};
