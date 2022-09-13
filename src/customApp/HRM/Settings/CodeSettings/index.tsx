import { PlusIcon } from '@assets/icons/PlusIcon';
import ButtonCustom from '@components/Button';
import { TAB_COMMON } from '@constants/commons';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import {
  EditAccessPoint,
  EditDepartment,
  EditInforBranch
} from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useState } from 'react';
import { tabListCodeSettings } from './CodeSettings.helper';
import ContractCode from './ContractCode';
import HRCode from './HRCode';
import QuoteCode from './QuoteCode';

function OrganizationSettings() {
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_COMMON.TAB1);
  const [open, setOpen] = useState(false);
  const contentList = {
    [TAB_COMMON.TAB1]: <ContractCode />,
    [TAB_COMMON.TAB2]: <HRCode />,
    [TAB_COMMON.TAB3]: <QuoteCode />
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const getValueForm = () => {};

  const renderBtn = () => {
    switch (activeTabKey) {
      case TAB_COMMON.TAB1: {
        return (
          <ButtonCustom
            name={TAB_COMMON.TAB1}
            onClick={handleClick}
            value="Thêm chi nhánh"
            iconLeft={<PlusIcon />}
          />
        );
      }
      case TAB_COMMON.TAB2: {
        return (
          <ButtonCustom
            name={TAB_COMMON.TAB2}
            onClick={handleClick}
            value="Thêm điểm truy cập"
            iconLeft={<PlusIcon />}
          />
        );
      }
      case TAB_COMMON.TAB3: {
        return (
          <ButtonCustom
            name={TAB_COMMON.TAB3}
            onClick={handleClick}
            value="Thêm phòng ban"
            iconLeft={<PlusIcon />}
          />
        );
      }
      default:
        break;
    }
  };

  const handleRenderModal = () => {
    switch (activeTabKey) {
      case TAB_COMMON.TAB1: {
        return (
          <FormComponent
            nameForm={TAB_COMMON.TAB1}
            colSpan={12}
            widthModal={1016}
            title="Sửa thông tin chi nhánh"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={EditInforBranch}
            getValueForm={getValueForm}
          />
        );
      }
      case TAB_COMMON.TAB2: {
        return (
          <FormComponent
            nameForm={TAB_COMMON.TAB2}
            colSpan={12}
            widthModal={1016}
            title="Sửa thông tin điểm truy cập"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={EditAccessPoint}
            getValueForm={getValueForm}
          />
        );
      }
      case TAB_COMMON.TAB3: {
        return (
          <FormComponent
            nameForm={TAB_COMMON.TAB3}
            colSpan={12}
            widthModal={1016}
            title="Sửa thông tin phòng ban"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={EditDepartment}
            getValueForm={getValueForm}
          />
        );
      }
      default:
        break;
    }
  };

  return (
    <>
      <div className="gx-d-flex gx-justify-content-end gx-pb-2">
        {renderBtn}
        {handleRenderModal}
      </div>
      <div>
        <LayoutMainContent
          tabList={tabListCodeSettings}
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
