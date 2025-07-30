import { FC, useState } from 'react';
import { ChooseItemListTab } from './choose-item-list-tab';
import { CustomTabList } from './custom-tab-list';
import { TabsLayout } from './tabs-layout';
import { CHOOSE_ITEM_TAB_LIST } from '../../model/constants';

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
      <CustomTabList tabs={CHOOSE_ITEM_TAB_LIST} onChange={handleChange} />
      {CHOOSE_ITEM_TAB_LIST.map(({ endpoint }, idx) => (
        <ChooseItemListTab type={endpoint} value={idx.toString()} key={idx} />
      ))}
    </TabsLayout>
  );
};
