import { PlusIcon } from '@assets/icons/PlusIcon';
import ButtonCustom from '@components/Button';
import { TAB_COMMON } from '@constants/commons';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useMemo, useState } from 'react';
import CandidateStatus from './CandidateStatus';
import {
  EditCandidateStatus,
  tabListRecruimentSettings
} from './RecruimentSettings.helper';

function OrganizationSettings() {
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_COMMON.TAB1);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const contentList = {
    [TAB_COMMON.TAB1]: <CandidateStatus />
  };

  const handleClick = (e) => {
    setOpen(!open);
    setSelected(e.target.name);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const getValueForm = () => {};

  const renderBtn = useMemo(() => {
    switch (activeTabKey) {
      case TAB_COMMON.TAB1: {
        return (
          <ButtonCustom
            name={TAB_COMMON.TAB1}
            onClick={handleClick}
            value="Thêm trạng thái ứng viên"
            iconLeft={<PlusIcon />}
          />
        );
      }
      default:
        break;
    }
  }, [open, selected, activeTabKey]);

  const handleRenderModal = useMemo(() => {
    switch (activeTabKey) {
      case TAB_COMMON.TAB1: {
        return (
          <FormComponent
            nameForm={TAB_COMMON.TAB1}
            colSpan={12}
            widthModal={1016}
            title="Xem trạng thái ứng viên"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={EditCandidateStatus}
            getValueForm={getValueForm}
          />
        );
      }
      default:
        break;
    }
  }, [open, selected, activeTabKey]);

  return (
    <>
      <div className="gx-d-flex gx-justify-content-end gx-pb-2">
        {renderBtn}
        {handleRenderModal}
      </div>
      <div>
        <LayoutMainContent
          tabList={tabListRecruimentSettings}
          activeTabKey={activeTabKey}
          setActiveTabKey={setActiveTabKey}
          noPaddingLeftAndRight={true}
        >
          {contentList[activeTabKey]}
        </LayoutMainContent>
      </div>
    </>
  );
}

export default OrganizationSettings;
