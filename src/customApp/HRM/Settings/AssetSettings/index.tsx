import { PlusIcon } from '@assets/icons/PlusIcon';
import ButtonCustom from '@components/Button';
import { TAB_COMMON } from '@constants/commons';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useState } from 'react';
import { EditAssetGroup, tabListAssetSettings } from './AssetSettings.helper';
import DigitalAssetGroup from './DigitalAssetGroup';
import FixedAssetGroup from './FixedAssetGroup';

function OrganizationSettings() {
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_COMMON.TAB1);
  const [open, setOpen] = useState(false);
  const contentList = {
    [TAB_COMMON.TAB1]: <FixedAssetGroup />,
    [TAB_COMMON.TAB2]: <DigitalAssetGroup />
  };

  const handleClick = (e) => {
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
            value="Thêm nhóm tài khoản cố định"
            iconLeft={<PlusIcon />}
          />
        );
      }
      case TAB_COMMON.TAB2: {
        return (
          <ButtonCustom
            name={TAB_COMMON.TAB2}
            onClick={handleClick}
            value="Thêm nhóm tài khoản số"
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
            title="Sửa thông tin nhóm tài sản"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={EditAssetGroup}
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
            formValue={EditAssetGroup}
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
          tabList={tabListAssetSettings}
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
