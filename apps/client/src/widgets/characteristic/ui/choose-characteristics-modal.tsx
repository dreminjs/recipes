import { BasicModal } from '@/shared*';
import { FC, useState } from 'react';
import { CharacteristicsTabs } from '@/features/characteristics';
import { CharaceteristicTabContent } from '@/featurescharacteristics/ui/characteristic-tab-content';
import { TabContext, TabList } from '@mui/lab/';

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
    <BasicModal isOpen={isVisible} onClose={onClose}>
      <TabContext value={tab}>
        <TabList>
          
        </TabList>
      </TabContext>
    </BasicModal>
  );
};
