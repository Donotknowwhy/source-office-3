import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { Add } from '@assets/icons/Add';
import { FilterIcon } from '@assets/icons/FilterIcon';
import AppNotificationContainer from '@components/AppNotificationContainer';
import ButtonCustom from '@components/Button';
import { Button, Col, Row } from '@components/uielements';
import { NAME_BUTTON } from '@constants/button';
import { Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import HeaderLayout from 'customComponents/HeaderLayout';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import bg from '../../../assets/img/bg-contract-crm.png';
import { fakeApi } from '../ListOfProductAndService/ListProductAndService.helper';
import FilterBtn from '../Quote/FilterButton';
import FormMoveContractManagement from '../Quote/FormMoveContractManagement';
import { filterContractCRM, statusContract } from '../Quote/Quote.helper';
import {
  clearTest,
  createContract,
  getAllContract,
  getAllUser,
  getContractById,
  getDataByBranch,
  getProductService,
  setDataInfinityManageContract,
  setPageManageContract,
  setTotalManageContact
} from '../slice';
import BillInformation from './BillInformation';
import CardInfoManageContract from './CardInfoManageContract';
import CommonInfo from './CommonInfo';
import Information from './Information';

const { Search } = Input;

const tabList = [
  {
    key: 'tab1',
    tab: 'Thông tin chung'
  },
  {
    key: 'tab2',
    tab: 'Chi tiết hợp đồng'
  },
  {
    key: 'tab3',
    tab: 'Thông tin thanh toán'
  }
];
const LIMIT_PAGE = 10;

const ManageContract = () => {
  const dispatch = useAppDispatch();
  const [idSelect, setIdSelect] = useState();

  const manageContractRedux = useAppSelector((state) => state.crm);

  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const pathname = useAppSelector(({ common }) => common);
  const { manageContract } = manageContractRedux;

  const [searchValue, setSearchValue] = useState('');
  const { loading, error } = pathname;
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('tab1');
  const [isViewInfo, setIsViewInfo] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState('');
  const [listFilterValue, setListFilterValue] = useState(['']);

  const contentList = {
    tab1: <BillInformation searchValue={searchValue} idSelect={idSelect} />,
    tab2: <CommonInfo searchValue={searchValue} idSelect={idSelect} />,
    tab3: <Information searchValue={searchValue} idSelect={idSelect} />
  };

  const handleClick = (e) => {
    setOpen(!open);
    setSelected(e.target.name);
  };
  const handleClickTab = (e) => {
    setIsViewInfo(true);
  };
  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const getValueForm = async (form, name) => {
    if (name === NAME_BUTTON.ADD_NEW) {
      const res = await dispatch(
        createContract({
          ...form,
          price_declaration_id: idSelect
        })
      );
      const response = await dispatch(
        getAllContract({
          page: 1,
          limit: LIMIT_PAGE,
          status: 1,
          search: '',
          filter: ['']
        })
      );
      dispatch(clearTest({}));
      if (res.payload.status === 200 || res.payload.status === 201) {
        setOpen(false);
        if (response?.payload?.data.length > 0) {
          dispatch(setDataInfinityManageContract(response.payload.data));
        }
      }
    }
  };

  useEffect(() => {
    dispatch(
      getAllContract({
        page: 1,
        limit: LIMIT_PAGE,
        status: 1,
        search: searchValue,
        filter: listFilterValue
      })
    );
  }, [searchValue, listFilterValue]);

  useEffect(() => {
    if (idSelect) {
      dispatch(
        getContractById({
          contract_management_id: idSelect
        })
      );
    }
  }, [idSelect]);

  useEffect(() => {
    const bodyBranchId = {
      branch_id: authState.branch_id
    };
    dispatch(getProductService(bodyBranchId));

    dispatch(getAllUser(bodyBranchId));

    dispatch(getDataByBranch(bodyBranchId));
  }, []);

  const handleRenderModal = () => {
    switch (selected) {
      case NAME_BUTTON.ADD_NEW: {
        return (
          <FormMoveContractManagement
            nameForm={NAME_BUTTON.ADD_NEW}
            colSpan={12}
            widthModal={1016}
            title="Thêm hợp đồng"
            modalVisible={open}
            onCancel={handleToggleOpen}
            getValueForm={getValueForm}
          />
        );
      }
    }
  };

  const handleSearchInput = (value) => {
    setSearchValue(value);
  };

  const handleGetIdClicked = (id) => {
    // debugger;
    if (id === idSelect) {
      setIsViewInfo(false);
    } else {
      setIdSelect(id);
    }
  };

  const handleFilter = (listFilter) => {
    setListFilterValue(listFilter);
  };

  useEffect(() => {
    const filterData = async () => {
      const res: any = await dispatch(
        getAllContract({
          page: 1,
          limit: LIMIT_PAGE,
          status: 1,
          search: searchValue,
          filter: listFilterValue
        })
      );

      // console.log(res?.payload?.data);
      dispatch(setDataInfinityManageContract(res?.payload?.data));
      dispatch(setTotalManageContact(res?.payload?.total));
    };
    filterData();
  }, [dispatch, searchValue, listFilterValue]);

  const fetchMoreData = async () => {
    const res: any = await dispatch(
      getAllContract({
        page: manageContract.pageManageContract + 1,
        limit: LIMIT_PAGE,
        status: 1,
        search: searchValue,
        filter: listFilterValue
      })
    );
    dispatch(
      setDataInfinityManageContract([
        ...manageContract.dataInfinityManageContract,
        ...res?.payload?.data
      ])
    );
    dispatch(setPageManageContract(manageContract.pageManageContract + 1));
  };

  return (
    <div className="crm-manage-data crm-manage-customer crm-quote-wrapper">
      <AppNotificationContainer loading={loading} error={error} />

      {handleRenderModal()}
      <Row className="gx-d-flex gx-justify-content-between gx-pb-2">
        <Col span={11}>
          <Search
            placeholder="Tìm kiếm hợp đồng"
            onSearch={handleSearchInput}
            style={{ width: 500 }}
            className="input-search"
          />
        </Col>

        <div className="gx-d-flex">
          <ButtonCustom
            value="Thêm hợp đồng"
            name={NAME_BUTTON.ADD_NEW}
            iconLeft={<Add />}
            onClick={(e) => {
              setIsModalVisible('addCus');
              setOpen(!open);
              handleClick(e);
            }}
          />
           
          <FilterBtn
            mode="filterQuote"
            getValue={handleFilter}
            defaultValue={statusContract}
          >
            <Button
              icon={<FilterIcon />}
              type="primary"
              className="gx-ml-1 gx-d-flex gx-align-items-center"
            >
               Lọc
            </Button>
          </FilterBtn>
        </div>
      </Row>
      <HeaderLayout title="Danh sách hợp đồng">
        <Row gutter={16}>
          <Col span={8} onClick={handleClickTab}>
            <InfiniteScroll
              dataLength={manageContract?.dataInfinityManageContract?.length}
              next={fetchMoreData}
              height={800}
              hasMore={true}
              loader={''}
            >
              {manageContract?.dataInfinityManageContract?.length === 0 ? (
                <></>
              ) : (
                manageContract?.dataInfinityManageContract?.map((item, key) => {
                  return (
                    <CardInfoManageContract
                      data={item}
                      key={key}
                      getId={handleGetIdClicked}
                      setShowContent={() => {
                        setIdSelect(null)
                      }}
                    />
                  );
                })
              )}
            </InfiniteScroll>
          </Col>
          <Col span={16}>
            {isViewInfo && idSelect && manageContract.getAll.length > 0 ? (
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
                  Chọn hợp đồng bạn muốn xem thông tin
                </p>
                <img alt="img" src={bg} />
              </div>
            )}
          </Col>
        </Row>
      </HeaderLayout>
    </div>
  );
};

export default ManageContract;
