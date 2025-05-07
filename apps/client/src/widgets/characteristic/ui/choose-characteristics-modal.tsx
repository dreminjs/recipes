import { BasicModal } from '@/shared*';
import { FC, useState } from 'react';
import { ChooseCharacteristicTabPanel } from '@/featurescharacteristics/ui/choose-characteristic-tab-panel';
import { TabContext } from '@mui/lab/';
import { ChoosedCharacteristicsTabPanel } from '@/features/characteristics';
import { CustomTabList } from '../model/custom-tab-list';

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
        <CustomTabList onChange={handleChange} />
        <ChooseCharacteristicTabPanel parentNumber="1" />
        <ChoosedCharacteristicsTabPanel parentNumber="2" />
      </TabContext>
    </BasicModal>
  );
};
