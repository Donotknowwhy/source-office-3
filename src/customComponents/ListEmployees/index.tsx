import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { ModalWarning } from '@assets/icons/ModalWarning';
import ClickToViewProfile from '@assets/img/HRM/ClickToViewProfile.png';
import AppNotificationContainer from '@components/AppNotificationContainer';
import { OPTIONS_SELECTED } from '@constants/button/index';
import { Avatar, Col, Row } from 'antd';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import { dataFormDiscontinue } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import {
  getAccount,
  getAllStoresListHr,
  getDetailUserHRM,
  getDetailUserInformation,
  getDetailUserWorkingHistory,
  getListHRM,
  jobRotation,
  pickEmployeId,
  restoreStaff,
  setCustomerInfinity,
  setPageCustomerScroll,
  setTotalCustomer,
  updateStatus,
  updateStatusStaff
} from 'customApp/HRM/HRMManageAccount/slice';
import FormModal from 'customComponents/FormModal';
import Status from 'customComponents/Status';
import TripleDotShowMoreComponent from 'customComponents/TripleDotShowMore';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import DetailEmployeeHRM from './DetailEmployee';

const ACTION_API = 'listStaff';
const STATUS_API = 1;

const ListEmployees = ({ data, dataTripleDot, search, itemFilter }: any) => {
  const [idSelected, setIdSelected] = useState();
  const [activeForm, setActiveForm] = useState('');
  // const [activeForm, setActiveForm] = useState('');

  const pathname = useAppSelector(({ common }) => common);
  const [open, setOpen] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);

  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const { loading, error } = pathname;
  const transferWork = useAppSelector((state) => state.HRMSlice.transferWork);

  const reducerHRM = useAppSelector((state) => state.HRMSlice);

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

  const handleCancelModal = () => {
    setOpenFormModal(false);
  };

  const handleClickAcceptModal = async (name) => {
    setOpen(false);
    setOpenFormModal(true);
  };

  const getValueForm = async (form, name) => {
    if (name === OPTIONS_SELECTED.DISCONTINUE) {
      if (idSelected) {
        const request = {
          staff_id: idSelected,
          event: 'Th??i vi???c',
          date: form?.date,
          description: form?.description,
          work_status: 'Th??i vi???c'
        };
        const res = await dispatch(updateStatusStaff(request));
        await dispatch(
          getListHRM({
            page: 1,
            limit: 10,
            search: '',
            action: ACTION_API,
            status: STATUS_API,
            branch_id: authState.branch_id,
            filter: ''
          })
        );
        if (res.payload.status === 200) {
          setOpen(false);
          setOpenFormModal(false);
        }
      }
    } else if (name === OPTIONS_SELECTED.TRANSFER_WORK) {
      const res = await dispatch(
        jobRotation({
          staff_id: idSelected,
          date: form?.date,
          event: '??i???u chuy???n c??ng t??c',
          description: form?.description,
          attachments: form?.attachments,
          branch_id: authState.branch_id
        })
      );
      await dispatch(
        getDetailUserWorkingHistory({
          staff_id: selected
        })
      );
      if (res.payload.status === 200) {
        setOpen(false);
        setOpenFormModal(false);
      }
    } else if (name === OPTIONS_SELECTED.DELETE_EMPLOYEE) {
      if (idSelected) {
        const request = {
          staff_id: idSelected,
          status: 0
        };
        const res = await dispatch(updateStatus(request));
        await dispatch(
          getListHRM({
            page: reducerHRM.pageCustomer,
            limit: 10,
            action: ACTION_API,
            status: STATUS_API,
            search: search,
            branch_id: authState?.branch_id,
            filter: itemFilter
          })
        );
        if (res.payload.status === 200) {
          setOpen(false);
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await dispatch(
        getListHRM({
          page: reducerHRM.pageCustomer,
          limit: 10,
          action: ACTION_API,
          status: STATUS_API,
          search: search,
          branch_id: authState?.branch_id,
          filter: itemFilter
        })
      );
      dispatch(setCustomerInfinity(res?.payload?.data));
      dispatch(setTotalCustomer(res?.payload?.total));
    };
    fetchData();
  }, [
    dispatch,
    authState?.branch_id,
    itemFilter,
    reducerHRM.pageCustomer,
    search
  ]);

  const fetchMoreData = async () => {
    const res: any = await dispatch(
      getListHRM({
        page: reducerHRM.pageCustomer + 1,
        limit: 10,
        action: ACTION_API,
        status: STATUS_API,
        search: search,
        branch_id: authState?.branch_id,
        filter: itemFilter,
        fetchMore: 'fetch-more'
      })
    );

    dispatch(
      setCustomerInfinity([
        ...reducerHRM.listHRMInfinityScroll,
        ...res?.payload?.data
      ])
    );

    if (res?.payload?.data.length === 0) {
      dispatch(setPageCustomerScroll(1));
    } else {
      dispatch(setPageCustomerScroll(reducerHRM.pageCustomer + 1));
    }
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
    }
  }, [selected, authState.branch_id, authState.company_id, dispatch]);

  const renderDetail = useCallback(() => {
    if (reducerHRM.status === 200) {
      return <DetailEmployeeHRM />;
    }
    return (
      <>
        <div className="list-employees-wrapper-hrm__enter-view-profile">
          Ch???n nh??n s??? b???n mu???n xem h??? s??
        </div>

        <div className="list-employees-wrapper-hrm__view-image-default">
          <img src={ClickToViewProfile} alt="imgViewProfile" />
        </div>
      </>
    );
  }, [reducerHRM]);

  const handleGetData = async (e, selectOption, id, dataSelected) => {
    if (selectOption === OPTIONS_SELECTED.DELETE_EMPLOYEE) {
      if (id) {
        // setSelectForm(form);
        // setOpen(false);
        // setOpenFormModal(true);
        setOpen(!open);
        setActiveForm(OPTIONS_SELECTED.DELETE_EMPLOYEE);
        setIdSelected(id);
      }
    } else if (selectOption === OPTIONS_SELECTED.TRANSFER_WORK) {
      setOpen(!open);
      setActiveForm(OPTIONS_SELECTED.TRANSFER_WORK);
      setIdSelected(id);
    } else if (selectOption === OPTIONS_SELECTED.DISCONTINUE) {
      setOpen(!open);
      setActiveForm(OPTIONS_SELECTED.DISCONTINUE);
      setIdSelected(id);
      await dispatch(
        getListHRM({
          page: reducerHRM.pageCustomer,
          limit: 10,
          action: ACTION_API,
          status: STATUS_API,
          search: search,
          branch_id: authState?.branch_id,
          filter: itemFilter
        })
      );
    } else if (selectOption === OPTIONS_SELECTED.RESTORE) {
      if (id) {
        const body = {
          staff_id: id
        };
        const getAllStoresListHrBody = {
          page: 1,
          limit: 10,
          status: 0,
          branch_id: authState.branch_id
        };
        await dispatch(restoreStaff(body));
        dispatch(getAllStoresListHr(getAllStoresListHrBody));

        // await dispatch(getAllStoresListHr(getAllStoresListHr));
      }
    } else if (selectOption === OPTIONS_SELECTED.DELETE_STORAGE) {
    }
  };

  //edit here

  const renderModalConfirm = () => {
    switch (activeForm) {
      case OPTIONS_SELECTED.TRANSFER_WORK: {
        return (
          <FormComponent
            nameForm={OPTIONS_SELECTED.TRANSFER_WORK}
            title="Th??m th??ng tin ??i???u chuy???n c??ng t??c"
            colSpan={24}
            widthModal={520}
            modalVisible={openFormModal}
            onCancel={handleCancelModal}
            formValue={transferWork}
            getValueForm={getValueForm}
            action="hrm/updateFileWorkHistory"
          />
        );
      }
      case OPTIONS_SELECTED.DISCONTINUE: {
        return (
          <FormComponent
            nameForm={OPTIONS_SELECTED.DISCONTINUE}
            colSpan={24}
            widthModal={520}
            title="Th??m th??ng tin th??i vi???c"
            modalVisible={openFormModal}
            onCancel={handleCancelModal}
            formValue={dataFormDiscontinue}
            getValueForm={getValueForm}
          />
        );
      }
      default: {
        return <></>;
      }
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case OPTIONS_SELECTED.TRANSFER_WORK: {
        return (
          <FormModal
            name={OPTIONS_SELECTED.TRANSFER_WORK}
            open={open}
            valueBtnAccept="X??c nh???n"
            valueBtnCancel="H???y"
            headingContent="??i???u chuy???n c??ng t??c"
            mainContent="B???n v???a ch???n ??i???u chuy???n c??ng t??c cho nh??n s???. 
B???n c?? ch???c ch???n v??? s??? thay ?????i n??y?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleCancel}
          />
        );
      }
      case OPTIONS_SELECTED.DISCONTINUE: {
        return (
          <FormModal
            name={OPTIONS_SELECTED.DISCONTINUE}
            open={open}
            valueBtnAccept="X??c nh???n"
            valueBtnCancel="H???y"
            headingContent="Cho th??i vi???c"
            mainContent="B???n v???a ch???n th??i vi???c cho nh??n s???. 
Nh??n s??? b??? cho th??i vi???c s??? chuy???n sang m???c L??u tr???."
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
            valueBtnAccept="X??c nh???n"
            valueBtnCancel="H???y"
            headingContent="X??a nh??n s???"
            mainContent="Nh??n s??? b??? x??a s??? chuy???n v??o m???c L??u tr???. 
B???n c?? ch???c ch???n x??a nh??n s??? ?"
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
  return (
    <div className="list-employees-wrapper-hrm">
      {renderModalConfirm()}
      {renderForm()}
      <AppNotificationContainer loading={loading} error={error} />

      <Row gutter={[30, 0]}>
        <Col span={8} className="list-employees-wrapper-hrm__ant-col">
          {reducerHRM?.listHRMInfinityScroll?.length === 0 ? (
            <div></div>
          ) : (
            <InfiniteScroll
              dataLength={reducerHRM?.listHRMInfinityScroll?.length}
              next={fetchMoreData}
              height={800}
              hasMore={true}
              loader={''}
            >
              {reducerHRM?.listHRMInfinityScroll?.map((item, index) => {
                return (
                  <div
                    className="list-employees-wrapper-hrm__body"
                    key={index}
                    onClick={(e) => handleClick(e, item.staff_id)}
                    value-test="data-value"
                  >
                    <div className="gx-d-flex gx-justify-content-between gx-align-items-center">
                      <p className="list-employees-wrapper-hrm__body--title gx-mb-2">
                        {item?.staff_name}
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

export default ListEmployees;
