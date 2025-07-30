import { BasicModal } from '@/shared*';
import { FC, useState } from 'react';
import { TabContext } from '@mui/lab/';
import { CustomTabList } from './custom-tab-list';
import { Box } from '@mui/material';
import { ChooseCharacteristicTabPanel } from './choose-characteristic-tab-panel';
import { ChoosedCharacteristicsTabPanel } from './choosed-characteristic-tab-panel';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ChooseCharacteristicsModal: FC<IProps> = ({
  isVisible,
  onClose,
}) => {
  const [tab, setTab] = useState('1');

  const handleChange = (_: unknown, newTab: string) => {
    setTab(newTab);
  };

  return (
    <BasicModal
      className="flex flex-col items-center"
      isOpen={isVisible}
      onClose={onClose}
    >
      <TabContext value={tab}>
        <Box sx={{width:"450px", height: '500px'}}>
          <CustomTabList onChange={handleChange} tabs={[]} />
          <ChooseCharacteristicTabPanel parentNumber="1" />
          <ChoosedCharacteristicsTabPanel parentNumber="2" />
        </Box>
      </TabContext>
    </BasicModal>
  );
};
