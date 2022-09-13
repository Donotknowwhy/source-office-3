import { selectAuthState } from '@appRedux/Authslice';
import { useAppSelector } from '@appRedux/hooks';
import { Add } from '@assets/icons/Add';
import { FilterIcon } from '@assets/icons/FilterIcon';
import { ModalWarning } from '@assets/icons/ModalWarning';
import { Send } from '@assets/icons/Send';
import { UploadIcon } from '@assets/vendors/icons/Upload';
import AppNotificationContainer from '@components/AppNotificationContainer';
import { Button, Col, Input, Row } from '@components/uielements';
import { message, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import CardInfor from 'customComponents/CardInfor';
import FilterBtn from 'customComponents/FilterBtn';
import FormModal from 'customComponents/FormModal';
import FormOnlyView from 'customComponents/FormOnlyView';
import HeaderLayout from 'customComponents/HeaderLayout';
import HistorySupport from 'customComponents/HistorySupport';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import bg from '../../../assets/img/bg-data-crm.png';
import {
  filterChange,
  getAllData,
  getCommonDataById,
  resetFilter,
  selectCrmState,
  setDataInfinity,
  setPageScroll,
  setTotal
} from './../slice';
import EditFormDataModal from './EditFormDataModal';
import FormBusiness from './FormBusiness';
import { listFieldsData } from './helper';

const tabList = [
  {
    key: 'tab1',
    tab: 'Thông tin chung'
  },
  {
    key: 'tab2',
    tab: 'Lịch sử chăm sóc'
  }
];

const { Search } = Input;
const BASE_URL_IMG = process.env.REACT_APP_BASE_URL_IMG;
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const getToken = localStorage.getItem('token');

const ManageData: React.FC = () => {
  const [form] = useForm();
  const [activeTabKey, setActiveTabKey] = useState('tab1');
  const [isViewInfo, setIsViewInfo] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [defaultUpload, setDefaultUpload] = useState([]);
  const pathname = useAppSelector(({ common }) => common);

  const { loading, error } = pathname;

  const { currentUser } = useAppSelector(selectAuthState);
  const {
    historySupportData,
    dataCommonById,
    filterCrm,
    page,
    listData,
    total
  } = useAppSelector(selectCrmState);

  // // infinity scroll
  // const [listData, setListData] = useState([]);
  // const [page, setPage] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await dispatch(
        getAllData({
          page: 1,
          limit: 10,
          company_id: currentUser?.staff?.company_id
        })
      );
      // setListData(res?.payload?.data);
      dispatch(setDataInfinity(res?.payload?.data));
      dispatch(setTotal(res?.payload?.total));
    };
    fetchData();
  }, [dispatch, currentUser?.staff?.company_id]);

  const fetchMoreData = async () => {
    const res: any = await dispatch(
      getAllData({
        page: page,
        limit: 10,
        company_id: currentUser?.staff?.company_id
      })
    );
    // setListData([...listData, ...res?.payload?.data]);
    dispatch(setDataInfinity([...listData, ...res?.payload?.data]));
    // setPage(page + 1);
    dispatch(setPageScroll(page + 1));
  };

  // // end infinity scroll

  // useEffect(() => {
  //   const filterData = async () => {
  //     const res: any = await dispatch(
  //       getAllData({
  //         page: 1,
  //         limit: 15,
  //         company_id: currentUser?.staff?.company_id,
  //         ...filterCrm
  //       })
  //     );

  //     setListData(res?.payload?.data);
  //   };
  //   filterData();
  // }, [dispatch, currentUser?.staff?.company_id, filterCrm]);

  // const handleImportFile = () => {};

  // useEffect(() => {
  //   dispatch(
  //     getAllData({
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
      getAllData({
        page: 1,
        limit: total,
        company_id: currentUser?.staff?.company_id,
        ...filterCrm,
        search: value
      })
    );
    await dispatch(setDataInfinity(res?.payload?.data));
  };

  const propImg = {
    multiple: false,
    action: `${REACT_APP_BASE_URL}crm/data/import`,
    headers: {
      Authorization: `Bearer ${getToken}`
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
        if (info.file.response.status === 200) {
          message.success('Nhập excel thành công');
          const getData = async () => {
            const res: any = await dispatch(
              getAllData({
                page: 1,
                limit: 20,
                company_id: currentUser?.staff?.company_id
              })
            );
            dispatch(setDataInfinity(res?.payload?.data));
          };
          getData();
        }
      } else if (info.file.status === 'error') {
        message.error('Nhập excel thất bại');
      }
    }
  };

  const contentList = {
    tab1: (
      <FormOnlyView
        listFields={listFieldsData}
        data={dataCommonById[0]}
        // listData={listData}
        // setListData={setListData}
      />
    ),
    tab2: <HistorySupport data={historySupportData} />
  };

  const renderModal = useCallback(() => {
    switch (isModalVisible) {
      case 'addData':
        return (
          <EditFormDataModal
            title="Thêm data"
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            mode="add"
          />
        );
      case 'formBusiness':
        return (
          <FormBusiness
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        );
      // case 'importfile':
      //   return(

      //   )
      default:
        return null;
    }
  }, [isModalVisible]);

  return (
    <div className="crm-manage-data">
      <AppNotificationContainer loading={loading} error={error} />

      <div className="gx-d-flex gx-justify-content-between group-btn-header">
        <Search
          placeholder="Tìm kiếm data"
          onSearch={onSearch}
          style={{ width: 500 }}
          className="input-search"
        />
        <div className="gx-d-flex">
          <Upload
            name={'data'}
            {...propImg}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            beforeUpload={(file) => true}
          >
            <Button icon={<UploadIcon />} type="primary" className="btn-upload">
               Nhập excel
            </Button>
          </Upload>

          {/* <Button icon={<Send />} type="primary" className="gx-ml-3">
             Gửi email
          </Button> */}
          <Button
            icon={<Add />}
            type="primary"
            onClick={() => setIsModalVisible('addData')}
            className="gx-ml-3"
          >
             Thêm data
          </Button>
          <FilterBtn>
            <Button icon={<FilterIcon />} type="primary">
               Lọc data
            </Button>
          </FilterBtn>
        </div>
      </div>
      <HeaderLayout title="Danh sách data">
        <Row gutter={16}>
          {listData?.length > 0 ? (
            <Col span={8} onClick={() => setIsViewInfo(true)}>
              <InfiniteScroll
                dataLength={listData?.length}
                next={fetchMoreData}
                height={800}
                hasMore={true}
                loader={''}
              >
                {listData &&
                  listData?.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          dispatch(
                            getCommonDataById({
                              data_management_id: item?.data_management_id
                            })
                          );
                        }}
                        key={item?.id}
                      >
                        <CardInfor
                          data={item}
                          isViewInfo={isViewInfo}
                          setIsViewInfo={setIsViewInfo}
                        />
                      </div>
                    );
                  })}
              </InfiniteScroll>
              {/* {listAllData &&
                listAllData?.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        dispatch(
                          getCommonDataById({
                            data_management_id: item?.data_management_id
                          })
                        );
                      }}
                      key={item?.id}
                    >
                      <CardInfor
                        data={item}
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
                <p className="content-img">Chọn data bạn muốn xem thông tin</p>
                <img alt="img" src={bg} />
              </div>
            )}
          </Col>
        </Row>
      </HeaderLayout>
      {renderModal()}
      <FormModal
        open={open}
        title="thông báo"
        valueBtnAccept="Xác nhận"
        valueBtnCancel="Hủy"
        headingContent="Chuyển đổi data thành lead"
        mainContent="Data bạn đang chọn sẽ được chuyển thành lead Bạn có chắc chắn về sự thay đổi này?"
        iconPopup={<ModalWarning />}
        handleClickAccept={() => setOpen(false)}
        handleClickCancel={() => setOpen(false)}
      />
    </div>
  );
};

export default ManageData;
