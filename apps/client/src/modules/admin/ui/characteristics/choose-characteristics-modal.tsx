import { FC, useState } from 'react';
import { TabContext } from '@mui/lab/';
import { CustomTabList } from './custom-tab-list';
import { Box, Modal } from '@mui/material';
import { ChooseCharacteristicTabPanel } from './choose-characteristic-tab-panel';
import { ChoosedCharacteristicsTabPanel } from './choosed-characteristic-tab-panel';
import { BasicModal } from '@/shared';
import { ACTION_TABS } from '../../model/constants';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ChooseCharacteristicsModal: FC<IProps> = ({
  isVisible,
  onClose,
}) => {
  const [tab, setTab] = useState('0');

  const handleChange = (_: unknown, newTab: string) => {
    setTab(newTab);
  };

  return (
    <BasicModal isOpen={isVisible} onClose={onClose}>
      <TabContext value={tab}>
        <Box sx={{ width: "450px", height: '500px' }}>
          <CustomTabList  onChange={handleChange} tabs={ACTION_TABS} />
          <ChooseCharacteristicTabPanel parentNumber="0" />
          <ChoosedCharacteristicsTabPanel parentNumber="1" />
        </Box>
      </TabContext>
    </BasicModal>
  );
};
