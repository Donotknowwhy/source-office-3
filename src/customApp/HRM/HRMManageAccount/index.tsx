import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { AddAccount } from '@assets/icons/AddAccount';
import { AddHRM } from '@assets/icons/AddHrm';
import { FilterIcon } from '@assets/icons/FilterIcon';
import noneData from '@assets/img/HRM/none-data-list-employees.png';
import ButtonCustom from '@components/Button';
import { NAME_BUTTON } from '@constants/button';
import { Input } from 'antd';
import {
  clearData,
  getAccount,
  getAllBranch,
  getAllDepartment,
  getAllPosition,
  getAllUser,
  getListAccountNotUser,
  getShift
} from 'customApp/HRM/HRMManageAccount/slice';
import FilterOption from 'customComponents/FilterOption';
import { optionSelectHRM } from 'customComponents/FilterOption/MultiFilter.helper';
import HeaderLayout from 'customComponents/HeaderLayout';
import ListEmployees from 'customComponents/ListEmployees';
import { dataTripledot } from 'customComponents/TripleDotShowMore/tripleDot.helper';
import { useEffect, useState } from 'react';
import FormComponent from './Form/HRM/FormComponent';
import FormEditInformation from './Form/HRM/FormEditInformation';
import {
  createAccountNotUser,
  createStaffInformation,
  getListHRM
} from './slice';

const { Search } = Input;

const ACTION_API = 'listStaff';
const STATUS_API = 1;

const HRMManageAccount = () => {
  const HRMState = useAppSelector((state) => state.HRMSlice);

  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const authStateUser = useAppSelector((state) => state.auth.currentUser.user);
  const idEmployee = useAppSelector((state) => state.HRMSlice.idEmployee);

  const [itemSelected, setItemSelected] = useState<any>(
    optionSelectHRM[0].radio_group[0].value
  );
  const [clearDataForm, setClearDataForm] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const HRMSlice = useAppSelector((state) => state.HRMSlice);

  const addAccountHRMState = useAppSelector(
    (state) => state.HRMSlice.addAccountHRM
  );

  const handleGetValueSelect = async (selected) => {
    if (selected) {
      setItemSelected(selected);
    }
  };

  useEffect(() => {
    const req = {
      page: page,
      limit: limit,
      search: searchValue,
      action: ACTION_API,
      status: STATUS_API,
      branch_id: authState.branch_id,
      filter: itemSelected
    };
    dispatch(getListHRM(req));
  }, [page, limit, itemSelected]);

  const getValueForm = async (formValue, name, formRoot) => {
    if (name === NAME_BUTTON.ADD_NEW_ACCOUNT) {
      const filterData = formRoot[0].detail[0].options.filter((itemParent) => {
        return itemParent.id === formValue.staff_id;
      });
      const body = {
        ...formValue,
        company_code: authStateUser?.company_code,
        company_name: authStateUser?.company_name,
        branch_id: filterData[0]?.branch_id,
        branch_name: filterData[0]?.branch_name
      };

      const res = await dispatch(createAccountNotUser(body));
      const req = {
        staff_id: idEmployee
      };
      await dispatch(getAccount(req));
      if (res?.payload?.status === 200 || res?.payload?.status === 201) {
        setOpen(!open);
        setClearDataForm(true);
      }
    } else if (name === NAME_BUTTON.ADD_NEW) {
      const body = {
        ...formValue,
        company_id: authState?.company_id
        // staff_id: idEmployee
      };
      const res = await dispatch(createStaffInformation(body));
      await dispatch(
        getListAccountNotUser({
          branch_id: authState?.branch_id
        })
      );
      const req = {
        page: 1,
        limit: limit,
        search: '',
        action: ACTION_API,
        status: STATUS_API,
        branch_id: authState?.branch_id,
        filter: ''
      };
      if (res?.payload?.status === 200 || res?.payload?.status === 201) {
        setOpen(!open);
        setClearDataForm(true);
      }
      await dispatch(getListHRM(req));
    }
  };

  useEffect((): any => {
    const body = {
      branch_id: authState?.branch_id
    };

    const bodyBranch = {
      status: 1,
      branch_id: authState?.branch_id
    };

    const bodyGetBranch = {
      company_id: authState.company_id,
      status: 1
    };
    dispatch(getAllBranch({}));
    dispatch(getAllPosition(body));
    dispatch(getAllUser(body));
    dispatch(getShift(body));
    dispatch(getAllDepartment(bodyBranch));
    dispatch(
      getListAccountNotUser({
        branch_id: authState.branch_id
      })
    );

    return () => {
      dispatch(clearData({}));
    };
  }, []);

  const handleSearchInput = (value) => {
    const req = {
      page: page,
      limit: limit,
      search: value,
      action: ACTION_API,
      status: STATUS_API,
      branch_id: authState?.branch_id,
      filter: itemSelected
    };
    dispatch(getListHRM(req));
    setSearchValue(value);
  };

  const renderForm = () => {
    switch (active) {
      case NAME_BUTTON.ADD_NEW: {
        return (
          <FormEditInformation
            clearDataForm={clearDataForm}
            nameForm={NAME_BUTTON.ADD_NEW}
            title="Thêm nhân sự"
            modalVisible={open}
            onCancel={handleCancel}
            getValueForm={getValueForm}
            // formValue={formValue.addNewEmployeeForm}
          />
        );
      }
      case NAME_BUTTON.ADD_NEW_ACCOUNT: {
        return (
          <FormComponent
            nameForm={NAME_BUTTON.ADD_NEW_ACCOUNT}
            title="Thêm tài khoản"
            colSpan={24}
            widthModal={540}
            modalVisible={open}
            onCancel={handleCancel}
            formValue={addAccountHRMState}
            getValueForm={getValueForm}
          />
        );
      }

      default:
        break;
    }
  };

  const handleCancel = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="gx-d-flex gx-justify-content-between gx-pb-2">
        <div className="btn-input-search-hrm">
          <Search
            placeholder="Tìm kiếm nhân sự"
            onSearch={handleSearchInput}
            style={{ width: 500 }}
            className="input-search"
          />
        </div>

        <div className="gx-d-flex">
          <ButtonCustom
            name={NAME_BUTTON.ADD_NEW_ACCOUNT}
            onClick={(e: any) => {
              const getName = e.target.name;
              setActive(getName);
              setOpen(!open);
            }}
            value="Thêm tài khoản"
            iconLeft={<AddAccount />}
          />

          <ButtonCustom
            name={NAME_BUTTON.ADD_NEW}
            onClick={(e: any) => {
              const getName = e.target.name;
              setActive(getName);
              setOpen(!open);
            }}
            value="Thêm nhân sự"
            iconLeft={<AddHRM />}
          />

          {renderForm()}

          <FilterOption
            valueBtn="Lọc"
            itemSelected={itemSelected}
            data={optionSelectHRM}
            iconLeft={<FilterIcon />}
            valueSelected={handleGetValueSelect}
          />
        </div>
      </div>
      <HeaderLayout title={`Danh sách nhân sự (${HRMSlice.data.count})`}>
        {HRMSlice.data.listHRM.length === 0 ? (
          <div className="wrapper-data-none-employees">
            <p className="wrapper-data-none-employees__content">
              Chưa có nhân sự trong danh sách nhân sự. Thêm nhân sự mới để bắt
              đầu quản lý.{' '}
            </p>
            <img src={noneData} />
          </div>
        ) : (
          <ListEmployees
            data={HRMSlice.listHRMInfinityScroll}
            dataTripleDot={dataTripledot}
            search={searchValue}
            itemFilter={itemSelected}
            status={STATUS_API}
            action="listStaff"
          />
        )}
      </HeaderLayout>
    </div>
  );
};

export default HRMManageAccount;
