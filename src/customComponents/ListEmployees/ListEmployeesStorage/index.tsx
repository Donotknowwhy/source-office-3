import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { ModalWarning } from '@assets/icons/ModalWarning';
import ClickToViewProfile from '@assets/img/HRM/ClickToViewProfile.png';
import AppNotificationContainer from '@components/AppNotificationContainer';
import { OPTIONS_SELECTED } from '@constants/button/index';
import { Avatar, Col, Row } from 'antd';
import {
  deleteUser,
  getAccount,
  getAllBranch,
  getAllStoresListHr,
  getDetailUserHRM,
  getDetailUserInformation,
  getDetailUserWorkingHistory,
  getListAccountNotUser,
  pickEmployeId,
  restoreStaff,
  setCustomerInfinityStorage,
  setPageCustomerScrollStorage
} from 'customApp/HRM/HRMManageAccount/slice';
import FormModal from 'customComponents/FormModal';
import Status from 'customComponents/Status';
import TripleDotShowMoreComponent from 'customComponents/TripleDotShowMore';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import DetailEmployeeHRM from '../DetailEmployee';

export interface IListEmployeesStorage {
  data: {
    avatar: string;
    branch_name: string;
    department_name: string;
    phone: string;
    position_name: string;
    staff_code: string | number;
    staff_id: string | number;
    staff_name: string;
    work_status: string;
  }[];
  search: string;
  dataTripleDot: {
    id: string;
    name: string;
    value: string;
    text_red: boolean;
  }[];
}

const ListEmployeesStorage = ({
  data,
  dataTripleDot,
  search
}: IListEmployeesStorage) => {
  console.log('day ladata', data);
  const [idSelected, setIdSelected] = useState();
  const [activeForm, setActiveForm] = useState('');
  const pathname = useAppSelector(({ common }) => common);
  const [open, setOpen] = useState(false);

  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const { loading, error } = pathname;

  const reducerHRM = useAppSelector((state) => state.HRMSlice);
  const getAllStoresListHrBody = {
    page: 1,
    limit: 15,
    status: 0,
    branch_id: authState.branch_id
  };
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState();
  const handleClick = (e, id) => {
    e.preventDefault();
    if (id) {
      setSelected(id);
      dispatch(pickEmployeId(id));
    }
  };

  const handleCancel = () => {
    setOpen(!open);
  };

  const handleClickAcceptModal = async (selectOption) => {
    if (selectOption === OPTIONS_SELECTED.RESTORE) {
      if (idSelected) {
        const body = {
          staff_id: idSelected
        };
        await dispatch(restoreStaff(body));
        const res = await dispatch(getAllStoresListHr(getAllStoresListHrBody));
        if (res?.payload?.data) {
          await dispatch(setCustomerInfinityStorage(res?.payload?.data));
          setOpen(false);
        }
      }
    } else if (selectOption === OPTIONS_SELECTED.DELETE_STORAGE) {
      await dispatch(
        deleteUser({
          staff_id: idSelected
        })
      );
      const res = await dispatch(getAllStoresListHr(getAllStoresListHrBody));
      if (res?.payload?.data) {
        await dispatch(setCustomerInfinityStorage(res?.payload?.data));
        setOpen(false);
      }
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case OPTIONS_SELECTED.RESTORE: {
        return (
          <FormModal
            name={OPTIONS_SELECTED.RESTORE}
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Khôi phục nhân sự"
            mainContent="Nhân sự khôi phục sẽ chuyển nhân sự về trạng thái ban đầu
Bạn có chắc chắn về sự thay đổi này?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleCancel}
          />
        );
      }
      case OPTIONS_SELECTED.DELETE_STORAGE: {
        return (
          <FormModal
            name={OPTIONS_SELECTED.DELETE_STORAGE}
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa nhân sự"
            mainContent="Nhân sự bị xóa sẽ không thể khôi phục
Bạn có chắc chắn về sự thay đổi này?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleCancel}
          />
        );
      }
      case OPTIONS_SELECTED.DELETE_EMPLOYEE: {
        return (
          <FormModal
            name={OPTIONS_SELECTED.DELETE_EMPLOYEE}
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa nhân sự"
            mainContent="Nhân sự bị xóa sẽ chuyển vào mục Lưu trữ. 
Bạn có chắc chắn xóa nhân sự ?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleCancel}
          />
        );
      }
      default: {
        return <></>;
      }
    }
  };

  const fetchMoreData = async () => {
    const res = await dispatch(
      getAllStoresListHr({
        page: reducerHRM.pageCustomerStorage + 1,
        limit: 10,
        status: 0,
        search: search
      })
    );
    dispatch(
      setCustomerInfinityStorage([
        ...reducerHRM.listHRMInfinityScrollStorage,
        ...res?.payload?.data
      ])
    );
    dispatch(setPageCustomerScrollStorage(reducerHRM.pageCustomerStorage + 1));
  };
  useEffect(() => {
    if (selected) {
      const body = {
        staff_id: selected
      };

      dispatch(getDetailUserInformation(body));
      dispatch(getDetailUserHRM(body));
      dispatch(getDetailUserWorkingHistory(body));
      dispatch(getAccount(body));
      dispatch(
        getListAccountNotUser({
          branch_id: authState.branch_id
        })
      );
      const bodyGetBranch = {
        company_id: authState.company_id,
        status: 1
      };

      dispatch(getAllBranch(bodyGetBranch));
    }
  }, [selected, authState.branch_id, authState.company_id, dispatch]);

  const renderDetail = useCallback(() => {
    if (reducerHRM.status === 200) {
      return <DetailEmployeeHRM />;
    }
    return (
      <>
        <div className="list-employees-wrapper-hrm__enter-view-profile">
          Chọn nhân sự bạn muốn xem hồ sơ
        </div>

        <div className="list-employees-wrapper-hrm__view-image-default">
          <img src={ClickToViewProfile} alt="imgViewProfile" />
        </div>
      </>
    );
  }, [reducerHRM]);

  const handleGetData = async (e, selectOption, id, dataSelected) => {
    setOpen(!open);
    if (selectOption) {
      setActiveForm(selectOption);
    }
    if (id) {
      setIdSelected(id);
    }

    // if (selectOption === OPTIONS_SELECTED.RESTORE) {
    //   if (id) {
    //     const body = {
    //       staff_id: id
    //     };
    //     await dispatch(restoreStaff(body));
    //     const res = await dispatch(getAllStoresListHr(getAllStoresListHrBody));
    //     if (res?.payload?.data) {
    //       await dispatch(setCustomerInfinityStorage(res?.payload?.data));
    //     }
    //   }
    // } else if (selectOption === OPTIONS_SELECTED.DELETE_STORAGE) {
    //   await dispatch(
    //     deleteUser({
    //       staff_id: id
    //     })
    //   );
    //   const res = await dispatch(getAllStoresListHr(getAllStoresListHrBody));
    //   if (res?.payload?.data) {
    //     await dispatch(setCustomerInfinityStorage(res?.payload?.data));
    //   }
    // }
  };

  return (
    <div className="list-employees-wrapper-hrm">
      {renderForm()}
      <AppNotificationContainer loading={loading} error={error} />

      <Row gutter={[30, 0]}>
        <Col span={8} className="list-employees-wrapper-hrm__ant-col">
          {reducerHRM?.listHRMInfinityScrollStorage?.length === 0 ? (
            <div></div>
          ) : (
            <InfiniteScroll
              dataLength={data?.length}
              next={fetchMoreData}
              height={800}
              hasMore={true}
              loader={''}
            >
              {reducerHRM?.listHRMInfinityScrollStorage?.map((item, index) => {
                return (
                  <div
                    className="list-employees-wrapper-hrm__body"
                    key={index}
                    onClick={(e) => handleClick(e, item.staff_id)}
                    value-test="data-value"
                  >
                    <div className="gx-d-flex gx-justify-content-between">
                      <p className="list-employees-wrapper-hrm__body--title gx-mb-2">
                        {item.staff_name}
                      </p>
                      <div className="gx-d-flex gx-align-items-center">
                        <div className="gx-mr-2">
                          <Avatar
                            src={
                              item?.avatar ? (
                                JSON.parse(item?.avatar).length > 0 ? (
                                  JSON.parse(item?.avatar)[0]?.url
                                ) : null
                              ) : (
                                <UserOutlined />
                              )
                            }
                            style={{ backgroundColor: '#cccccc' }}
                          />
                        </div>
                        <span onClick={(e) => e.stopPropagation()}>
                          <TripleDotShowMoreComponent
                            dataSelected={data}
                            idUser={item?.staff_id}
                            getData={handleGetData}
                            data={dataTripleDot}
                          />
                        </span>
                      </div>
                    </div>
                    <p className="list-employees-wrapper-hrm__body--id gx-header-gray-0-5 gx-mb-2">
                      {item.staff_code}
                    </p>
                    <p className="list-employees-wrapper-hrm__body--role gx-header-gray-0-5 gx-mb-2">
                      {item.position_name}
                    </p>
                    <div className="gx-d-flex gx-justify-content-between">
                      <p className="list-employees-wrapper-hrm__body--phone-number gx-text-primary">
                        {item.phone}
                      </p>
                      <div className="list-employees-wrapper-hrm__body--status">
                        <Status status={item.work_status} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
          )}
        </Col>
        {/* </InfiniteScroll> */}

        <Col span={16}>{renderDetail()}</Col>
      </Row>
    </div>
  );
};

export default ListEmployeesStorage;
