import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { PlusIcon } from '@assets/icons/PlusIcon';
import AppNotificationContainer from '@components/AppNotificationContainer';
import ButtonCustom from '@components/Button';
import { TAB_COMMON } from '@constants/commons';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import {
  EditDepartment,
  EditInforBranch,
  EditPosition
} from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import { getShift } from 'customApp/HRM/HRMManageAccount/slice';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useEffect, useMemo, useState } from 'react';
import {
  createBranch,
  createDepartment,
  createIpAccess,
  createPosition,
  createShift,
  getAllBranch,
  getBranch,
  getDepartment,
  getIpAccess,
  getPosition,
  getShiftAdmin
} from '../slice';
import AccessPoint from './AccessPoint';
import Branch from './Branch';
import Department from './Department';
import FormShift from './FormShift';
import { tabListOrganizationSettings } from './OrganizationSettings.helper';
import Position from './Position';
import Shift from './Shift';
import { EditAccessPoint } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';

function OrganizationSettings() {
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const getListBranch = useAppSelector(
    (state) => state.SettingHRM.getAllBranch
  );
  console.log('day la getListbranch', getListBranch);
  const pathname = useAppSelector(({ common }) => common);
  const [editFormIPAccess, setEditFormIPAccess] = useState(EditAccessPoint);
  const { loading, error } = pathname;
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_COMMON.TAB1);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const bodyGetAccess = {
    status: 1,
    branch_id: authState.branch_id,
    page: 1,
    limit: 10
  };

  const bodyGetDepartment = {
    status: 1,
    branch_id: authState.branch_id,
    page: 1,
    limit: 10
  };

  const bodyGetBranch = {
    status: 1,
    company_id: authState.company_id,
    page: 1,
    limit: 10
  };
  const getPositionBody = {
    status: 1,
    company_id: authState.company_id,
    page: 1,
    limit: 10
  };
  const contentList = {
    [TAB_COMMON.TAB1]: <Branch />,
    [TAB_COMMON.TAB2]: <AccessPoint />,
    [TAB_COMMON.TAB3]: <Department />,
    [TAB_COMMON.TAB4]: <Position />,
    [TAB_COMMON.TAB5]: <Shift />
  };

  const handleClick = (e) => {
    setOpen(!open);
    setSelected(e.target.name);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const getValueForm = async (formValue, name) => {
    setOpen(false);
    if (name === TAB_COMMON.TAB1) {
      const body = {
        branch_name: formValue.branch_name,
        address: formValue.address,
        branch_phone: formValue.branch_phone,
        company_id: authState.company_id
      };
      await dispatch(createBranch(body));
      await dispatch(getBranch(bodyGetBranch));
      await dispatch(getAllBranch({}));
    } else if (name === TAB_COMMON.TAB2) {
      const body = {
        ip_name: formValue.ip_name,
        ip_access_location: formValue.ip_access_location,
        branch_id: formValue.branch_id
      };
      await dispatch(createIpAccess(body));
      await dispatch(getIpAccess(bodyGetAccess));
    } else if (name === TAB_COMMON.TAB3) {
      //error api
      const body = {
        department_name: formValue.department_name,
        description: formValue.description,
        branch_id: authState.branch_id
      };
      await dispatch(createDepartment(body));
      await dispatch(getDepartment(bodyGetDepartment));
    } else if (name === TAB_COMMON.TAB4) {
      const body = {
        position_name: formValue.position_name,
        description: formValue.description,
        department_id: authState.department_id
      };
      await dispatch(createPosition(body));
      await dispatch(getPosition(getPositionBody));
    } else if (name === TAB_COMMON.TAB5) {
      const body = {
        ...formValue,
        branch_id: authState.branch_id
      };
      await dispatch(createShift(body));
      await dispatch(
        getShiftAdmin({
          status: 1,
          page: 1,
          limit: 10,
          company_id: authState.company_id
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getAllBranch({}));
  }, []);

  const renderBtn = useMemo(() => {
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
      case TAB_COMMON.TAB4: {
        return (
          <ButtonCustom
            name={TAB_COMMON.TAB4}
            onClick={handleClick}
            value="Thêm chức vụ"
            iconLeft={<PlusIcon />}
          />
        );
      }
      case TAB_COMMON.TAB5: {
        return (
          <ButtonCustom
            name={TAB_COMMON.TAB5}
            onClick={handleClick}
            value="Thêm ca làm việc"
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
            title="Thêm thông tin chi nhánh"
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
            title="Thêm thông tin điểm truy cập"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={getListBranch}
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
            title="Thêm thông tin phòng ban"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={EditDepartment}
            getValueForm={getValueForm}
          />
        );
      }
      case TAB_COMMON.TAB4: {
        return (
          <FormComponent
            nameForm={TAB_COMMON.TAB4}
            colSpan={12}
            widthModal={1016}
            title="Thêm thông tin chức vụ"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={EditPosition}
            getValueForm={getValueForm}
          />
        );
      }
      case TAB_COMMON.TAB5: {
        return (
          <FormShift
            nameForm={TAB_COMMON.TAB5}
            colSpan={12}
            widthModal={1016}
            title="Thêm thông tin ca làm việc"
            modalVisible={open}
            onCancel={handleToggle}
            // formValue={editShift}
            getValueForm={getValueForm}
          />
        );
      }
      default:
        break;
    }
  }, [open, selected, activeTabKey, getListBranch]);

  return (
    <>
      <AppNotificationContainer loading={loading} error={error} />

      <div className="gx-d-flex gx-justify-content-end gx-pb-2">
        {renderBtn}
        {handleRenderModal}
      </div>
      <div>
        <LayoutMainContent
          tabList={tabListOrganizationSettings}
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
