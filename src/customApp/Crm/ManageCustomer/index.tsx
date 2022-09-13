import { selectAuthState } from '@appRedux/Authslice';
import { useAppSelector } from '@appRedux/hooks';
import { Add } from '@assets/icons/Add';
import { Click } from '@assets/icons/Click';
import { FilterIcon } from '@assets/icons/FilterIcon';
import { Send } from '@assets/icons/Send';
import { Button, Col, Input, Row } from '@components/uielements';
import CardInfor from 'customComponents/CardInfor';
import FilterBtn from 'customComponents/FilterBtn';
import FormOnlyView from 'customComponents/FormOnlyView';
import HeaderLayout from 'customComponents/HeaderLayout';
import HistoryContract from 'customComponents/HistoryContract';
import HistorySupport from 'customComponents/HistorySupport';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import bg from '../../../assets/img/bg-cus-crm.png';
import { listFieldsCustomer } from '../ManageData/helper';
import {
  filterChange,
  getAllCustomer,
  getHistorySupportCustomer,
  resetFilter,
  selectCrmState,
  setCustomerInfinity,
  setPageCustomerScroll,
  setTotalCustomer
} from '../slice';
import { historyContract } from './../ManageData/helper';
import { getCustomerById } from './../slice';
import EditFormCustomerModal from './EditFormCustomerModal';

const tabList = [
  {
    key: 'tab1',
    tab: 'Thông tin chung'
  },
  {
    key: 'tab2',
    tab: 'Lịch sử chăm sóc'
  },
  {
    key: 'tab3',
    tab: 'Lịch sử hợp đồng'
  }
];

const { Search } = Input;

const ManageCustomer = () => {
  const [activeTabKey, setActiveTabKey] = useState('tab1');
  const [isViewInfo, setIsViewInfo] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState('');
  const dispatch = useDispatch();
  const { currentUser } = useAppSelector(selectAuthState);

  const {
    listCustomerData,
    dataCustomerById,
    historySupportCustomer,
    filterCrm,
    pageCustomer,
    listCustomer,
    totalCustomer
  } = useAppSelector(selectCrmState);

  const contentList = {
    tab1: (
      <FormOnlyView
        listFields={listFieldsCustomer}
        data={dataCustomerById[0]}
      />
    ),
    tab2: <HistorySupport data={historySupportCustomer} />,
    tab3: <HistoryContract data={historyContract} />
  };

  useEffect(() => {
    dataCustomerById[0]?.id &&
      dispatch(
        getHistorySupportCustomer({
          data_management_id: dataCustomerById[0]?.id
        })
      );
  }, [dispatch, dataCustomerById]);

  // infinity scroll
  // const [listData, setListData] = useState([]);
  // const [page, setPage] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await dispatch(
        getAllCustomer({
          page: 1,
          limit: 10,
          company_id: currentUser?.staff?.company_id
        })
      );
      dispatch(setCustomerInfinity(res?.payload?.data));
      dispatch(setTotalCustomer(res?.payload?.total));
    };
    fetchData();
  }, [dispatch, currentUser?.staff?.company_id]);

  const fetchMoreData = async () => {
    const res: any = await dispatch(
      getAllCustomer({
        page: pageCustomer,
        limit: 10,
        company_id: currentUser?.staff?.company_id
      })
    );
    // setListData([...listData, ...res?.payload?.data]);
    // setPage(page + 1);
    dispatch(setCustomerInfinity([...listCustomer, ...res?.payload?.data]));
    dispatch(setPageCustomerScroll(pageCustomer + 1));
  };

  // end infinity scroll

  // useEffect(() => {
  //   dispatch(
  //     getAllCustomer({
  //       page: 1,
  //       limit: 20,
  //       company_id: currentUser?.staff?.company_id
  //     })
  //   );
  // }, [dispatch, currentUser?.staff?.company_id]);

  useEffect(() => {
    dispatch(resetFilter());
  }, [dispatch]);

  const onSearch = async (value) => {
    await dispatch(filterChange({ search: value }));
    const res: any = await dispatch(
      getAllCustomer({
        page: 1,
        limit: totalCustomer,
        company_id: currentUser?.staff?.company_id,
        ...filterCrm,
        search: value
      })
    );
    await dispatch(setCustomerInfinity(res?.payload?.data));
  };

  const renderModal = useCallback(() => {
    switch (isModalVisible) {
      case 'addCus':
        return (
          <EditFormCustomerModal
            title="Thêm khách hàng"
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            mode="addCus"
          />
        );
      // case 'formBusiness':
      //   return (
      //     <FormBusiness
      //       isModalVisible={isModalVisible}
      //       setIsModalVisible={setIsModalVisible}
      //     />
      //   );

      default:
        return null;
    }
  }, [isModalVisible]);

  return (
    <div className="crm-manage-data crm-manage-customer">
      <div className="gx-d-flex gx-justify-content-between group-btn-header">
        <Search
          placeholder="Tìm kiếm khách hàng"
          onSearch={onSearch}
          style={{ width: 500 }}
          className="input-search"
        />
        <div className="gx-d-flex">
          <Button
            icon={<Add />}
            type="primary"
            onClick={() => setIsModalVisible('addCus')}
          >
             Thêm khách hàng
          </Button>
          {/* <Button icon={<Send />} type="primary">
             Gửi email
          </Button> */}
          <FilterBtn mode="customer">
            <Button icon={<FilterIcon />} type="primary">
               Lọc khách hàng
            </Button>
          </FilterBtn>
        </div>
      </div>
      <HeaderLayout title="Danh sách khách hàng">
        <Row gutter={16}>
          {listCustomer?.length > 0 ? (
            <Col span={8} onClick={() => setIsViewInfo(true)}>
              <InfiniteScroll
                dataLength={listCustomer?.length}
                next={fetchMoreData}
                height={800}
                hasMore={true}
                loader={''}
              >
                {listCustomer &&
                  listCustomer?.map((item, key) => {
                    return (
                      <div
                        onClick={() => {
                          dispatch(
                            getCustomerById({
                              data_management_id: item?.data_management_id
                            })
                          );
                        }}
                        key={item?.id}
                      >
                        <CardInfor
                          data={item}
                          mode="customer"
                          isViewInfo={isViewInfo}
                          setIsViewInfo={setIsViewInfo}
                        />
                      </div>
                    );
                  })}
              </InfiniteScroll>
              {/* {listCustomerData &&
                listCustomerData?.map((item, key) => {
                  return (
                    <div
                      onClick={() => {
                        dispatch(
                          getCustomerById({
                            data_management_id: item?.data_management_id
                          })
                        );
                      }}
                      key={item?.id}
                    >
                      <CardInfor
                        data={item}
                        mode="customer"
                        isViewInfo={isViewInfo}
                        setIsViewInfo={setIsViewInfo}
                      />
                    </div>
                  );
                })} */}
            </Col>
          ) : (
            <Col span={8}></Col>
          )}
          <Col span={16}>
            {isViewInfo ? (
              <LayoutMainContent
                tabList={tabList}
                activeTabKey={activeTabKey}
                setActiveTabKey={setActiveTabKey}
              >
                {contentList[activeTabKey]}
              </LayoutMainContent>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p className="content-img">
                  Chọn khách hàng bạn muốn xem thông tin
                </p>
                <img alt="img" src={bg} />
              </div>
            )}
          </Col>
        </Row>
      </HeaderLayout>
      {renderModal()}
    </div>
  );
};

export default ManageCustomer;
