import { selectAuthState } from '@appRedux/Authslice';
import { useAppSelector } from '@appRedux/hooks';
import {
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Row,
  Select
} from '@components/uielements';
import {
  filterChange,
  getAllCustomer,
  getAllData,
  getAllUser,
  getSourceData,
  getStatusData,
  selectCrmState,
  setCustomerInfinity,
  setDataInfinity
} from 'customApp/Crm/slice';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBusiness } from './../../customApp/Crm/slice';

const { Option } = Select;

type IProps = {
  children: ReactNode;
  mode?: string;
};

const FilterBtn = ({ children, mode }: IProps) => {
  const { currentUser } = useAppSelector(selectAuthState);
  const { filterCrm, statusData, sourceData, allUser, total, totalCustomer } =
    useAppSelector(selectCrmState);
  const pathname = useAppSelector(({ common }) => common.pathname);

  const dispatch = useDispatch();

  const onChange = (checkedValues) => {
    dispatch(filterChange({ ...filterCrm, filter_data_status: checkedValues }));
  };
  const onChange2 = (checkedValues) => {
    dispatch(filterChange({ ...filterCrm, filter_source: checkedValues }));
  };
  function handleChange(value) {
    dispatch(filterChange({ ...filterCrm, filter_person_in_charge: value }));
  }

  // useEffect(() => {
  //   dispatch(setPageScroll(1));
  // }, [dispatch]);

  useEffect(() => {
    const filterData = async () => {
      // (filterCrm.filter_data_status ||
      //   filterCrm.filter_source ||
      //   filterCrm.filter_person_in_charge) &&
      // (pathname === '/crm/manage-data'
      //   ? dispatch(
      //       getAllData({
      //         page: 1,
      //         limit: 15,
      //         company_id: currentUser?.staff?.company_id,
      //         ...filterCrm
      //       })
      //     )
      //   : dispatch(
      //       getAllCustomer({
      //         page: 1,
      //         limit: 15,
      //         company_id: currentUser?.staff?.company_id,
      //         ...filterCrm
      //       })
      //     ));
      if (
        filterCrm.filter_data_status ||
        filterCrm.filter_source ||
        filterCrm.filter_person_in_charge
      ) {
        if (pathname === '/crm/manage-data') {
          const res: any = await dispatch(
            getAllData({
              page: 1,
              limit: total,
              company_id: currentUser?.staff?.company_id,
              ...filterCrm
            })
          );
          dispatch(setDataInfinity(res?.payload?.data));
        } else {
          const res: any = await dispatch(
            getAllCustomer({
              page: 1,
              limit: totalCustomer,
              company_id: currentUser?.staff?.company_id,
              ...filterCrm
            })
          );
          dispatch(setCustomerInfinity(res?.payload?.data));
        }
        // dispatch(setPageScroll(page + 1));
      }
    };
    filterData();
  }, [
    dispatch,
    filterCrm,
    currentUser?.staff?.company_id,
    pathname,
    total,
    totalCustomer
  ]);

  // useEffect(() => {
  //   const fetchMoreData = async () => {
  //     if (
  //       (filterCrm.filter_data_status ||
  //         filterCrm.filter_source ||
  //         filterCrm.filter_person_in_charge) &&
  //       page > 1
  //     ) {
  //       if (pathname === '/crm/manage-data') {
  //         const res: any = await dispatch(
  //           getAllData({
  //             page: page,
  //             limit: 10,
  //             company_id: currentUser?.staff?.company_id,
  //             ...filterCrm
  //           })
  //         );
  //         dispatch(setDataInfinity(res?.payload?.data));
  //       } else {
  //         const res: any = await dispatch(
  //           getAllCustomer({
  //             page: page,
  //             limit: 10,
  //             company_id: currentUser?.staff?.company_id,
  //             ...filterCrm
  //           })
  //         );
  //         dispatch(setDataInfinity(res?.payload?.data));
  //       }
  //     }
  //   };
  //   fetchMoreData();
  // }, [dispatch, filterCrm, currentUser?.staff?.company_id, pathname, page]);

  useEffect(() => {
    dispatch(getStatusData({ branch_id: currentUser?.staff?.branch_id }));
    dispatch(getSourceData({ branch_id: currentUser?.staff?.branch_id }));
    dispatch(getAllUser({ branch_id: currentUser?.staff?.branch_id }));
    dispatch(getBusiness());
  }, [dispatch, currentUser?.staff?.branch_id]);

  const menu = (
    <>
      <div className="dropdown-filter-btn">
        {mode === 'customer' ? (
          ''
        ) : (
          <>
            <p>Trạng thái</p>
            <Divider />
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
              <Row>
                {statusData &&
                  statusData?.map((item) => {
                    return (
                      <Col key={item?.id} span={24}>
                        <Checkbox value={item?.status_name}>
                          {item?.status_name}
                        </Checkbox>
                      </Col>
                    );
                  })}
              </Row>
            </Checkbox.Group>
          </>
        )}
        <p>Theo nguồn</p>
        <Divider />
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange2}>
          <Row>
            {sourceData &&
              sourceData?.map((item) => {
                return (
                  <Col span={24} key={item?.id}>
                    <Checkbox value={item?.source_name}>
                      {item?.source_name}
                    </Checkbox>
                  </Col>
                );
              })}
          </Row>
        </Checkbox.Group>
        <p>Người phụ trách</p>
        <Select
          placeholder="Chọn người phụ trách"
          style={{ width: '100%' }}
          onChange={handleChange}
        >
          {allUser &&
            allUser?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
        </Select>
      </div>
    </>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      {children}
    </Dropdown>
  );
};

export default FilterBtn;
