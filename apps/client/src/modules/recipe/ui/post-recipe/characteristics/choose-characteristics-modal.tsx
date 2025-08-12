import { FC, useState } from 'react';
import { TabContext } from '@mui/lab/';
import { ChoosedCharacteristicsTabPanel } from './choosed-characteristics-tab-panel';
import { ACTION_TABS, BasicModal } from '@/shared';
import { CustomTabList } from '../custom-tab-list';
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
      sx={{ maxWidth: 600, height: 580, marginLeft: 'auto', marginRight: 'auto' }}
      isOpen={isVisible}
      onClose={onClose}
    >
      <TabContext value={tab}>
          <CustomTabList onChange={handleChange} tabs={ACTION_TABS} />
          <ChooseCharacteristicTabPanel parentNumber="0" />
          <ChoosedCharacteristicsTabPanel parentNumber="1" />
      </TabContext>
    </BasicModal>
  );
};
