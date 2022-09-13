import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { EditForm } from '@assets/icons/EditForm';
import ButtonCustom from '@components/Button';
import { Col, Row } from 'antd';
import {
  getAllContract,
  getContractById,
  updateContract
} from 'customApp/Crm/slice';
import FormMoveContractManagement from '../../Quote/FormMoveContractManagement';
import { useState } from 'react';
import Status from 'customComponents/Status';
import { formatDateENGB } from '@constants/commons';

const BillInformation = ({ searchValue, idSelect }: any) => {
  const dispatch = useAppDispatch();
  const informationData = useAppSelector(
    (state) => state.crm.manageContract.detailInfo.information.data
  );

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const getValueForm = async (formValue) => {
    setOpen(false);

    if (formValue) {
      await dispatch(
        updateContract({ ...formValue, contract_management_id: idSelect })
      );
      await dispatch(
        getContractById({
          contract_management_id: idSelect
        })
      );
      await dispatch(
        getAllContract({
          page: 1,
          limit: 15,
          status: 1,
          search: '',
          filter: ['']
        })
      );
    }
  };

  return (
    <div className="management-bill-information-wrapper">
      {informationData.length > 0 ? (
        <>
          <FormMoveContractManagement
            data={informationData[0]}
            modalVisible={open}
            onCancel={handleClick}
            title="Sửa hợp đồng"
            getValueForm={getValueForm}
          />
          <div className="gx-relative ">
            <ButtonCustom
              iconLeft={<EditForm />}
              value=""
              onClick={handleClick}
              background={'color-white'}
              className="edit-form-modal"
            />
          </div>
          {informationData.map((item) => (
            <div className="management-bill-information-wrapper__card gx-p-2">
              <Row>
                <Col span={12}>
                  <div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Mã hợp đồng
                      </p>
                      <p>{item?.contract_code}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Loại hợp đồng
                      </p>
                      <p>{item?.contract_type}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Ngày ký
                      </p>
                      <p>{formatDateENGB(item?.sign_date)}</p>
                    </div>
                    <div className="gx-d-flex ">
                      <p className="management-contract-information-wrapper__title">
                        Hiệu lực
                      </p>
                      <p>
                        {formatDateENGB(item?.start_date)} -{' '}
                        {formatDateENGB(item?.end_date)}
                      </p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Hình thức thanh toán
                      </p>
                      <p>{item?.payment_method}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Số tài khoản
                      </p>
                      <p>{item?.account_number}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Email
                      </p>
                      <p>{item?.email}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Ghi chú
                      </p>
                      <p>{item?.note}</p>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="gx-d-flex">
                    <p className="management-contract-information-wrapper__title">
                      Tên hợp đồng
                    </p>
                    <p>{item?.contract_name}</p>
                  </div>
                  <div className="gx-d-flex">
                    <p className="management-contract-information-wrapper__title">
                      Khách hàng
                    </p>
                    <p>{item?.customer_name}</p>
                  </div>
                  <div className="gx-d-flex">
                    <p className="management-contract-information-wrapper__title">
                      Người phụ trách
                    </p>
                    <p>{item?.person_in_charge}</p>
                  </div>
                  <div className="gx-d-flex">
                    <p className="management-contract-information-wrapper__title">
                      Trạng thái
                    </p>
                    <span>
                      <Status status={item?.contract_status} />
                    </span>
                  </div>
                  <div className="gx-d-flex">
                    <p className="management-contract-information-wrapper__title">
                      Ngân hàng
                    </p>
                    <p>{item?.bank_name}</p>
                  </div>
                  <div className="gx-d-flex">
                    <p className="management-contract-information-wrapper__title">
                      Số điện thoại
                    </p>
                    <p>{item?.phone}</p>
                  </div>
                  <div className="gx-d-flex">
                    <p className="management-contract-information-wrapper__title">
                      Địa chỉ
                    </p>
                    <p>{item?.address}</p>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default BillInformation;
