import { useAppSelector } from '@appRedux/hooks';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useState } from 'react';
import AccountGOffice from './AccountGOffice';
import { tabList } from './DetailEmployee.helper';
import Information from './Information';
import LaborContract from './LaborContract';
import WorkHistory from './WorkHistory';

const DetailEmployeeHRM = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('tab1');
  const information = useAppSelector((state) => state.HRMSlice.information);

  const laborContract = useAppSelector((state) => state.HRMSlice.laborContract);

  const workingHistory = useAppSelector(
    (state) => state.HRMSlice.workingHistory
  );
  const accountGOffice = useAppSelector(
    (state) => state.HRMSlice.accountGOffice
  );

  const contentList = {
    tab1: <Information dataInformation={information} />,
    tab2: <LaborContract dataContract={laborContract} />,
    tab3: <WorkHistory dataWorking={workingHistory} />,
    tab4: <AccountGOffice dataAccount={accountGOffice} />
  };

  return (
    <div>
      <LayoutMainContent
        tabList={tabList}
        activeTabKey={activeTabKey}
        setActiveTabKey={setActiveTabKey}
        noPaddingLeftAndRight={true}
      >
        {contentList[activeTabKey]}
      </LayoutMainContent>
    </div>
  );
};

export default DetailEmployeeHRM;
