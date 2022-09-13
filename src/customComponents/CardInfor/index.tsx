import { selectAuthState } from '@appRedux/Authslice';
import { useAppSelector } from '@appRedux/hooks';
import { ModalWarning } from '@assets/icons/ModalWarning';
import {
  deleteCommonCustomerById,
  deleteCommonDataById,
  getAllData,
  setCustomerInfinity,
  setDataInfinity,
  setPageCustomerScroll,
  setPageScroll,
  switchData
} from 'customApp/Crm/slice';
import FormModal from 'customComponents/FormModal';
import TripleDotShowMoreComponent from 'customComponents/TripleDotShowMore';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCustomer } from './../../customApp/Crm/slice';
import { message } from 'antd';

enum labelType {
  NEW = 'Mới',
  SHARED = 'Đã chia',
  SUPPORTED = 'Đang chăm sóc',
  CARE = 'Có quan tâm',
  NOT_CARE = 'Không quan tâm',
  NOT_CONTACT = 'Không liên lạc được'
}

const dataTripleDot = [
  {
    id: '1',
    name: 'Xóa data',
    value: 'delete',
    text_red: true
  }
];

const dataSwitchTripleDot = [
  {
    id: '1',
    name: 'Chuyển thành khách hàng',
    value: 'switchData',
    text_red: false
  },
  {
    id: '2',
    name: 'Xóa data',
    value: 'delete',
    text_red: true
  }
];

type IProps = {
  data: any;
  mode?: any;
  isViewInfo?: boolean;
  setIsViewInfo?: (isViewInfo: boolean) => void;
};

const CardInfor = ({ data, mode, isViewInfo, setIsViewInfo }: IProps) => {
  const dispatch = useDispatch();
  const { currentUser } = useAppSelector(selectAuthState);
  const pathname = useAppSelector(({ common }) => common.pathname);
  const [isModalVisbile, setIsModalVisible] = useState(false);

  const renderBgLabel = () => {
    switch (data?.data_status) {
      case labelType.NEW:
        return '#0085AF';
      case labelType.SHARED:
        return '#D3770B';
      case labelType.SUPPORTED:
        return '#150482';
      case labelType.CARE:
        return '#029522';
      case labelType.NOT_CARE:
        return '#D31616';
      case labelType.NOT_CONTACT:
        return '#5F5F5F';
    }
  };

  const handleOnClick = async (e, selectOption, id) => {
    if (selectOption === 'delete') {
      setIsModalVisible(true);
    } else if (selectOption === 'switchData') {
      const res: any = await dispatch(
        switchData({ data_management_id: id, type_management: 3 })
      );
      if (res.type.endsWith('/fulfilled')) {
        message.success('Chuyển data thành công');
      } else {
        message.error('Chuyển data thất bại');
      }
    }
  };

  const handleSubmit = async () => {
    if (pathname === '/crm/manage-data') {
      await dispatch(
        deleteCommonDataById({
          data_management_id: data?.data_management_id,
          status: 0
        })
      );
    } else {
      await dispatch(
        deleteCommonCustomerById({
          data_management_id: data?.data_management_id,
          status: 0
        })
      );
    }
    setIsViewInfo(false);
    if (pathname === '/crm/manage-data') {
      const res: any = await dispatch(
        getAllData({
          page: 1,
          limit: 15,
          company_id: currentUser?.staff?.company_id
        })
      );
      dispatch(setDataInfinity(res?.payload?.data));
      dispatch(setPageScroll(1));
    } else {
      const res: any = await dispatch(
        getAllCustomer({
          page: 1,
          limit: 15,
          company_id: currentUser?.staff?.company_id
        })
      );
      dispatch(setCustomerInfinity(res?.payload?.data));
      dispatch(setPageCustomerScroll(1));
    }
  };

  const handleCancel = () => {
    setIsModalVisible(!isModalVisbile);
  };

  return (
    <div className="card-infor">
      <div className="gx-d-flex gx-justify-content-between">
        <p className="card-infor-name">{data?.data_name}</p>
        <span onClick={(event) => event.stopPropagation()}>
          <TripleDotShowMoreComponent
            data={
              pathname === '/crm/manage-customer'
                ? dataTripleDot
                : dataSwitchTripleDot
            }
            idUser={data?.data_management_id}
            getData={handleOnClick}
          />
        </span>
      </div>
      <span>{data?.phone_number}</span>
      <div className="gx-d-flex gx-justify-content-between gx-align-items-center">
        <span>{data?.email}</span>
        {mode !== 'customer' ? (
          <span className="label" style={{ backgroundColor: renderBgLabel() }}>
            {data?.data_status}
          </span>
        ) : (
          ''
        )}
      </div>
      <div>
        {pathname === '/crm/manage-customer' ? data?.person_in_charge : ''}
      </div>

      <FormModal
        open={isModalVisbile}
        title="Thông báo"
        valueBtnAccept={'Đồng ý'}
        valueBtnCancel="Hủy"
        headingContent={
          pathname === '/crm/manage-customer' ? 'Xóa khách hàng' : 'Xóa data'
        }
        mainContent={
          pathname === '/crm/manage-customer'
            ? 'Khách hàng bạn đang chọn sẽ bị xóa khỏi danh sách khách hàng Bạn có chắc chắn về sự thay đổi này ?'
            : 'Data bạn đang chọn sẽ bị xóa khỏi danh sách data Bạn có chắc chắn về sự thay đổi này?'
        }
        iconPopup={<ModalWarning />}
        handleClickAccept={handleSubmit}
        handleClickCancel={handleCancel}
      />
    </div>
  );
};

export default CardInfor;
