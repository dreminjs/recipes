import { BasicModal } from '@/shared*';
import { FC, useState } from 'react';
import { ChooseCharacteristicTabPanel } from '@/featurescharacteristics/ui/choose-characteristic-tab-panel';
import { TabContext, TabList } from '@mui/lab/';
import { Tab } from '@mui/material';
import { ChoosedCharacteristicTabPanel } from '@/featurescharacteristics';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ChooseCharacteristicsModal: FC<IProps> = ({
  isVisible,
  onClose,
}) => {
  const [tab, setTab] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  return (
    <BasicModal
      className="flex flex-col items-center"
      isOpen={isVisible}
      onClose={onClose}
    >
      <TabContext value={tab}>
        <TabList sx={{ margin: '0 auto', width:"250px" }} onChange={handleChange}>
          <Tab label="выбрать" value="1" />
          <Tab label="выбранное" value="2" />
        </TabList>

        <ChooseCharacteristicTabPanel tabNumber="1" />
        <ChoosedCharacteristicTabPanel tabNumber="2" />
      </TabContext>
    </BasicModal>
  );
};
