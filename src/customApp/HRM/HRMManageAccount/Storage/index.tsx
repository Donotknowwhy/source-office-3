import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { Input } from 'antd';
import {
  getAllStoresListHr,
  setCustomerInfinityStorage,
  setTotalCustomerStorage
} from 'customApp/HRM/HRMManageAccount/slice';
import HeaderLayout from 'customComponents/HeaderLayout';
import ListEmployeesStorage from 'customComponents/ListEmployees/ListEmployeesStorage';
import { dataTripledotStorage } from 'customComponents/TripleDotShowMore/tripleDot.helper';
import { useEffect, useState } from 'react';
import noneData from '@assets/img/HRM/none-data-list-employees.png';

const { Search } = Input;

const HRMStorage = () => {
  const dispatch = useAppDispatch();
  const reducerHRM = useAppSelector((state) => state.HRMSlice);
  const [searchValue, setSearchValue] = useState('');
  const HRMSlice = useAppSelector((state) => state.HRMSlice);
  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const body = {
    page: 1,
    limit: 15,
    status: 0,
    branch_id: authState.branch_id
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res: any = await dispatch(
        getAllStoresListHr({
          page: 1,
          limit: 10,
          status: 0,
          search: searchValue
        })
      );

      dispatch(setCustomerInfinityStorage(res?.payload?.data));
      dispatch(setTotalCustomerStorage(res?.payload?.total));
    };
    fetchApi();
  }, [dispatch, searchValue]);

  const handleSearchInput = (value) => {
    const req = {
      page: 1,
      limit: 15,
      search: value,
      status: 0,
      branch_id: authState?.branch_id
    };
    dispatch(getAllStoresListHr(req));
    setSearchValue(value);
  };

  return (
    <div>
      <div className="btn-input-search-hrm">
        <Search
          placeholder="Tìm kiếm nhân sự"
          onSearch={handleSearchInput}
          style={{ width: 500 }}
          className="input-search"
        />
      </div>

      <HeaderLayout
        title={`Danh sách nhân sự lưu trữ (${HRMSlice.countStorage})`}
      >
        {HRMSlice?.listHRMInfinityScrollStorage?.length > 0 ? (
          <>
            <ListEmployeesStorage
              data={HRMSlice?.listHRMInfinityScrollStorage}
              dataTripleDot={dataTripledotStorage}
              search={searchValue}
            />
          </>
        ) : (
          <div className="wrapper-data-none-employees">
            <p className="wrapper-data-none-employees__content">
              Chưa có nhân sự trong mục lưu trữ Chỉ khi bạn xoá hoặc cho thôi
              việc nhân sự mới xuất hiện ở đây.{' '}
            </p>
            <img src={noneData} />
          </div>
        )}
      </HeaderLayout>
    </div>
  );
};

export default HRMStorage;
