import { ChooseItemListTab } from '@/modules/admin/ui/characteristics/choose-item-list-tab';
import { TabsLayout } from '@/shared/ui/tabs-layout';
import { FC, useState } from 'react';
import { CustomTabList } from '../custom-tab-list';
import { CHOOSE_CHARACTERISTICS_TAB_LIST } from '@/shared';

interface IProps {
  parentNumber: string;
}

export const ChooseCharacteristicTabPanel: FC<IProps> = ({ parentNumber }) => {
  const [tab, setTab] = useState('0');
  const handleChange = (_: unknown, newTab: string) => {
    setTab(newTab);
  };

  return (
    <TabsLayout currentNumber={tab} parentNumber={parentNumber}>
      <CustomTabList
        tabs={CHOOSE_CHARACTERISTICS_TAB_LIST.map((el) => el.label)}
        onChange={handleChange}
      />
      {CHOOSE_CHARACTERISTICS_TAB_LIST.map(({ endpoint }, idx) => (
        <ChooseItemListTab type={endpoint} value={idx.toString()} key={idx} />
      ))}
    </TabsLayout>
  );
};
