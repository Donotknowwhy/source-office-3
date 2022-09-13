import { Card } from '@components/uielements';
import cls from 'classnames';
import React, { ReactNode } from 'react';

interface tabList {
  key: string;
  tab: string;
}

type IProps = {
  children: ReactNode;
  tabList: tabList[];
  activeTabKey: string;
  setActiveTabKey: (activeTabKey: string) => void;
  noPaddingLeftAndRight?: boolean;
};

const LayoutMainContent: React.FC<IProps> = ({
  children,
  tabList,
  activeTabKey,
  setActiveTabKey,
  noPaddingLeftAndRight
}) => {
  return (
    <Card
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={(key) => {
        setActiveTabKey(key);
      }}
      className={cls('layout-main-content', {
        'gx-pl-0 gx-pr-0': noPaddingLeftAndRight
      })}
    >
      {children}
    </Card>
  );
};

export default LayoutMainContent;
