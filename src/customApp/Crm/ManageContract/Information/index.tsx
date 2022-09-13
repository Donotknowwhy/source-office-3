import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { EditForm } from '@assets/icons/EditForm';
import ButtonCustom from '@components/Button';
import { formatDateENGB, YYYY_MM_DD } from '@constants/commons';
import { formatCurrency, formatCurrencyVND } from '@util/utils';
import { Col, Row } from 'antd';
import FormMoveContractManagement from 'customApp/Crm/Quote/FormMoveContractManagement';
import {
  getContractById,
  getPriceDeclarationById,
  updateContract,
  updatePriceDeclaration
} from 'customApp/Crm/slice';
import moment from 'moment';
import { useState } from 'react';

const Information = ({ searchValue, idSelect }: any) => {
  const dispatch = useAppDispatch();
  const stateData = useAppSelector(
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
        updateContract({
          ...formValue,
          contract_management_id: idSelect
        })
      );
      await dispatch(
        getContractById({
          contract_management_id: idSelect
        })
      );
      // dispatch(
      //   getPriceDeclarationById({
      //     price_declaration_id: idSelect
      //   })
      // );
    }
  };

  return (
    <div className="management-common-information-wrapper">
      <FormMoveContractManagement
        data={stateData[0]}
        modalVisible={open}
        onCancel={handleClick}
        title="Sửa hợp đồng"
        getValueForm={getValueForm}
      />
      <div className="">
        <ButtonCustom
          iconLeft={<EditForm />}
          value=""
          onClick={handleClick}
          background={'color-white'}
          className="edit-form-modal"
        />
      </div>

      <div className="management-common-information-wrapper__card gx-p-2">
        {stateData.length > 0 ? (
          <>
            {stateData.map((item) => {
              if (item.service_products) {
                const convertJSON = JSON.parse(item.payment_information);
                return convertJSON.map((itemChild, index) => (
                  <Row>
                    <Col span={12}>
                      <div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            Đợt thanh toán
                          </p>
                          <p>{index + 1}</p>
                        </div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            Số tiền thanh toán
                          </p>
                          <p>{formatCurrencyVND(itemChild.money_of_payment)}</p>
                        </div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            Trạng thái
                          </p>
                          <p>{itemChild.status_of_payment}</p>
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Ngày thanh toán
                        </p>
                        <p>{formatDateENGB(itemChild.date_of_payment)}</p>
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Nội dung thanh toán
                        </p>
                        <p>{itemChild.content_of_payment} </p>
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Hình thức thanh toán
                        </p>
                        <p>{itemChild.payment_method_bank}</p>
                      </div>
                    </Col>
                  </Row>
                ));
              }
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Information;
