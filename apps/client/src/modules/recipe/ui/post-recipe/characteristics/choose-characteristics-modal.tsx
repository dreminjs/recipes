import { FC, useState } from 'react';
import { TabContext } from '@mui/lab/';
import { Box, Modal } from '@mui/material';
import { ChoosedCharacteristicsTabPanel } from './choosed-characteristics-tab-panel';
import { BasicModal } from '@/shared';
import { ACTION_TABS } from '../../../../admin/model/constants';
import { CustomTabList } from './custom-tab-list';
import { ChooseCharacteristicTabPanel } from './choose-characteristic-tab-panel';

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
    <BasicModal
      sx={{ maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}
      isOpen={isVisible}
      onClose={onClose}
    >
      <TabContext value={tab}>
        <Box sx={{ height: '500px' }}>
          <CustomTabList onChange={handleChange} tabs={ACTION_TABS} />
          <ChooseCharacteristicTabPanel parentNumber="0" />
          <ChoosedCharacteristicsTabPanel parentNumber="1" />
        </Box>
      </TabContext>
    </BasicModal>
  );
};
