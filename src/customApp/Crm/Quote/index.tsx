import { fetchStart, fetchSuccess } from '@appRedux/CommonSlice';
import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { Add } from '@assets/icons/Add';
import { FilterIcon } from '@assets/icons/FilterIcon';
import { Transfer } from '@assets/icons/Transfer';
import AppNotificationContainer from '@components/AppNotificationContainer';
import ButtonCustom from '@components/Button';
import { Button, Col, Row } from '@components/uielements';
import { TOKEN_COMMON } from '@constants/ActionTypes';
import { NAME_BUTTON } from '@constants/button';
import { Input } from 'antd';
import FormDuplicateButton from 'customComponents/Form/FormDuplicateButton';
import HeaderLayout from 'customComponents/HeaderLayout';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import bg from '../../../assets/img/CRM/bgQuote.png';
import {
  clearDataForm,
  clearTest,
  createContract,
  createPriceDeclaration,
  deletePriceDeclaration,
  getAllPriceDeclaration,
  getAllUser,
  getDataByBranch,
  getPriceDeclarationById,
  getProductService,
  setDataInfinityQuote,
  setPageQuote,
  setTotalQuote
} from '../slice';
import CardInfor from './CardInfo';
import FilterBtn from './FilterButton';
import FormMoveContractManagement from './FormMoveContractManagement';
import Information from './Information';
import InformationQuote from './InformationQuote';
import { statusPrice, tabListQuote } from './Quote.helper';

const baseURL = process.env.REACT_APP_BASE_URL;

const { Search } = Input;

const Quote = () => {
  const getToken = localStorage.getItem(TOKEN_COMMON);
  const dispatch = useAppDispatch();
  const [idSelect, setIdSelect] = useState();
  const [clearForm, setClearForm] = useState(false);

  const manageContractRedux = useAppSelector((state) => state.crm);

  const detailInfo = useAppSelector(
    (state) => state.crm.quote.detailInfor.data
  );

  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const pathname = useAppSelector(({ common }) => common);
  const { quote } = manageContractRedux;
  const [searchValue, setSearchValue] = useState('');
  const { loading, error } = pathname;
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('tab1');
  const [isViewInfo, setIsViewInfo] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState('');
  const [listFilterValue, setListFilterValue] = useState(['']);

  const contentList = {
    tab1: <Information searchValue={searchValue} idSelect={idSelect} />,
    tab2: <InformationQuote searchValue={searchValue} idSelect={idSelect} />
  };

  const handleClickTab = (e) => {
    setIsViewInfo(true);
  };

  const handleClick = async (e) => {
    const getName = e.target.name;
    setOpen(!open);
    setSelected(getName);

    if (getName === 'export' && detailInfo.length > 0) {
      const body = {
        contract_management_id: detailInfo[0].customer_id,
        data_management_id: detailInfo[0].id
      };
      await dispatch(fetchStart());

      await fetch(`${baseURL}crm/declaration/wordExport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken}`
        },
        body: JSON.stringify(body)
      })
        .then((res) => {
          if (res.status === 200) {
            return res.blob();
          } else {
            return res.json();
          }
        })
        .then((blob) => {
          if (blob.message) {
            return;
          }
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Báo giá CRM`);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();
        });

      await dispatch(fetchSuccess());
    } else if (getName === 'exportPDF' && detailInfo.length > 0) {
      const body = {
        price_declaration_id: detailInfo[0].id
      };

      await dispatch(fetchStart());
      await fetch(`${baseURL}crm/declaration/pdfExport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken}`
        },
        body: JSON.stringify(body)
      })
        .then((res) => {
          if (res.status === 200) {
            return res.blob();
          } else {
            return res.json();
          }
        })
        .then((blob) => {
          if (blob.message) {
            return;
          }
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Báo giá CRM`);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();
        });

      await dispatch(fetchSuccess());
    }
  };
  const handleToggleOpen = () => {
    setOpen(!open);

    dispatch(clearDataForm({}));
  };

  const getValueForm = async (form, name) => {
    if (name === NAME_BUTTON.ADD_NEW) {
      const res = await dispatch(
        createPriceDeclaration({
          ...form,
          price_declaration_id: idSelect,
          branch_id: authState?.branch_id
        })
      );
      // await dispatch(
      //   updateStatusPriceDeclaration({
      //     price_declaration_id: idSelect,
      //     status: 0
      //   })
      // );
      // dispatch(clearTest({}));

      const getAll = await dispatch(
        getAllPriceDeclaration({
          page: 1,
          limit: 10,
          status: 1,
          search: searchValue,
          filter: listFilterValue
        })
      );
      await dispatch(setDataInfinityQuote(getAll?.payload?.data));

      if (res.payload.status === 200) {
        setOpen(false);
        // setClearForm(true);
      }
    } else if (name === 'moveContractMangement') {
      const res = await dispatch(
        createContract({
          ...form
        })
      );
      if (res.payload.status === 200) {
        await dispatch(
          deletePriceDeclaration({
            price_declaration_id: idSelect
          })
        );
      }

      const getAll = await dispatch(
        getAllPriceDeclaration({
          page: 1,
          limit: 10,
          status: 1,
          search: searchValue,
          filter: listFilterValue
        })
      );

      await dispatch(setDataInfinityQuote(getAll?.payload?.data));

      if (res.payload.status === 200) {
        setOpen(false);
        setClearForm(true);
      }
    }
  };

  useEffect(() => {
    if (searchValue || listFilterValue.length > 0) {
      const fetchApiSearchFilter = async () => {
        const res = await dispatch(
          getAllPriceDeclaration({
            page: 1,
            limit: 10,
            status: 1,
            search: searchValue,
            filter: listFilterValue
          })
        );

        await dispatch(setDataInfinityQuote(res?.payload?.data));
      };
      fetchApiSearchFilter();
    }

    return () => {
      dispatch(clearTest({}));
    };
  }, [searchValue, listFilterValue]);

  useEffect(() => {
    if (idSelect) {
      dispatch(
        getPriceDeclarationById({
          price_declaration_id: idSelect
        })
      );
    }
  }, [idSelect]);

  useEffect(() => {
    const bodyBranchId = {
      branch_id: authState.branch_id
    };
    dispatch(getProductService({ ...bodyBranchId }));

    dispatch(getAllUser(bodyBranchId));

    dispatch(getDataByBranch(bodyBranchId));
  }, []);

  const handleRenderModal = () => {
    switch (selected) {
      case NAME_BUTTON.ADD_NEW: {
        return (
          <FormDuplicateButton
            clearDataForm={clearForm}
            test={manageContractRedux.quote.detailed_quotes}
            nameForm={NAME_BUTTON.ADD_NEW}
            colSpan={12}
            widthModal={1016}
            title="Thêm báo giá"
            modalVisible={open}
            onCancel={handleToggleOpen}
            getValueForm={getValueForm}
          />
        );
      }
      case 'moveContractMangement': {
        return (
          <FormMoveContractManagement
            data={detailInfo[0]}
            nameForm={'moveContractMangement'}
            colSpan={12}
            widthModal={1016}
            title="Chuyển hợp đồng"
            modalVisible={open}
            onCancel={handleToggleOpen}
            getValueForm={getValueForm}
          />
        );
      }

      default:
        break;
    }
  };

  const handleSearchInput = (value) => {
    setSearchValue(value);
  };

  const handleGetIdClicked = (id) => {
    if (id === idSelect) {
      return;
    } else {
      setIdSelect(id);
      // setIdCustomer(idCustomer);
    }
  };

  const handleFilter = (listFilter) => {
    if (listFilter) {
      setListFilterValue(listFilter);
    }
  };

  useEffect(() => {
    const filterData = async () => {
      const res: any = await dispatch(
        getAllPriceDeclaration({
          page: 1,
          limit: 10,
          status: 1,
          search: searchValue,
          filter: listFilterValue
        })
      );

      dispatch(setDataInfinityQuote(res?.payload?.data));
      dispatch(setTotalQuote(res?.payload?.total));
    };
    filterData();
  }, [dispatch, quote.filterQuote]);

  const fetchMoreData = async () => {
    const res: any = await dispatch(
      getAllPriceDeclaration({
        page: quote.pageQuote + 1,
        limit: 10,
        status: 1,
        search: searchValue,
        filter: listFilterValue
      })
    );
    dispatch(
      setDataInfinityQuote([...quote.dataInfinityQuote, ...res?.payload?.data])
    );
    dispatch(setPageQuote(quote.pageQuote + 1));
  };

  return (
    <div className="crm-manage-data crm-manage-customer crm-quote-wrapper">
      <AppNotificationContainer loading={loading} error={error} />

      {handleRenderModal()}
      <Row className="gx-d-flex gx-justify-content-between gx-pb-2">
        <Col span={11}>
          <Search
            placeholder="Tìm kiếm báo giá"
            onSearch={handleSearchInput}
            style={{ width: 500 }}
            className="input-search"
          />
        </Col>

        <div className="gx-d-flex">
          {quote?.detailInfor?.data?.length > 0 && (
            <ButtonCustom
              value="Chuyển hợp đồng"
              name={'moveContractMangement'}
              iconLeft={<Transfer />}
              className="gx-ml-2"
              onClick={(e) => {
                setIsModalVisible('addCus');
                setOpen(!open);
                handleClick(e);
              }}
              MarginLeftButton={false}
            />
          )}
          <ButtonCustom
            value="Thêm báo giá"
            name={NAME_BUTTON.ADD_NEW}
            iconLeft={<Add />}
            className="gx-ml-2"
            onClick={(e) => {
              setIsModalVisible('addCus');
              setOpen(!open);
              handleClick(e);
            }}
            MarginLeftButton={false}
          />
           
          <FilterBtn
            mode="filterQuote"
            getValue={handleFilter}
            defaultValue={statusPrice}
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
      <HeaderLayout title="Danh sách báo giá">
        <Row gutter={16}>
          <Col span={8} onClick={handleClickTab}>
            <InfiniteScroll
              dataLength={quote?.dataInfinityQuote?.length}
              next={fetchMoreData}
              height={800}
              hasMore={true}
              loader={''}
            >
              {quote?.dataInfinityQuote?.length === 0 ? (
                <></>
              ) : (
                quote?.dataInfinityQuote?.map((item, key) => {
                  return (
                    <CardInfor
                      data={item}
                      key={key}
                      getId={handleGetIdClicked}
                      setShowContent={() => setIdSelect(null)}
                    />
                  );
                })
              )}
            </InfiniteScroll>
          </Col>
          <Col span={16}>
            {isViewInfo && idSelect && quote?.dataInfinityQuote.length > 0 ? (
              <LayoutMainContent
                tabList={tabListQuote}
                activeTabKey={activeTabKey}
                setActiveTabKey={setActiveTabKey}
              >
                {contentList[activeTabKey]}
              </LayoutMainContent>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p className="content-img">
                  Chọn báo giá bạn muốn xem thông tin
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

export default Quote;
