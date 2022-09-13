import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { EditForm } from '@assets/icons/EditForm';
import ButtonCustom from '@components/Button';
import { formatCurrencyVND } from '@util/utils';
import { Col, Row } from 'antd';
import {
  getContractById,
  getPriceDeclarationById,
  updateContract,
  updatePriceDeclaration
} from 'customApp/Crm/slice';
import FormDuplicateButton from 'customComponents/Form/FormDuplicateButton';
import { useEffect, useState } from 'react';
import FormMoveContractManagement from '../../Quote/FormMoveContractManagement';

const CommonInfo = ({ searchValue, idSelect }: any) => {
  const dispatch = useAppDispatch();
  const stateData = useAppSelector(
    (state) => state.crm.manageContract.detailInfo.information.data
  );

  const [open, setOpen] = useState(false);
  const [intoMoney, setIntoMoney] = useState({
    totalLength: 0,
    totalMoney: 0
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const getValueForm = async (formValue, name) => {
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
    }
  };

  useEffect(() => {
    if (stateData.length > 0) {
      const convertJSON = JSON.parse(stateData[0].service_products);

      const total = convertJSON.reduce((pre, itemChild) => {
        return pre + itemChild.into_money;
      }, 0);
      setIntoMoney({
        totalMoney: total,
        totalLength: convertJSON.length
      });
    }
  }, [stateData]);

  return (
    <div className="management-common-information-wrapper">
      {stateData.length > 0 ? (
        <>
          <FormMoveContractManagement
            data={stateData[0]}
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

          <div className="management-common-information-wrapper__card gx-p-2">
            {stateData.map((item) => {
              if (item.service_products) {
                const convertJSON = JSON.parse(item.service_products);
                return convertJSON.map((itemChild) => (
                  <Row>
                    <Col span={12}>
                      <div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            Sẩn phẩm dịch vụ
                          </p>
                          <p>{itemChild.product_name}</p>
                        </div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            Đơn vị tính
                          </p>
                          <p>{itemChild.unit}</p>
                        </div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            Số lượng
                          </p>
                          <p>{itemChild.quantity}</p>
                        </div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            Thuế GTGT
                          </p>
                          <p>{itemChild.added_value} %</p>
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Đơn giá
                        </p>
                        <p>{formatCurrencyVND(itemChild.price)}</p>
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Chiết khấu
                        </p>
                        <p>{itemChild.discount} %</p>
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Thành tiền
                        </p>
                        <p>{formatCurrencyVND(itemChild.into_money)}</p>
                      </div>
                    </Col>
                  </Row>
                ));
              }
            })}

            <Row>
              <Col span={12}>
                <div>
                  <div className="gx-d-flex">
                    <p className="management-contract-information-wrapper__title">
                      Đợt thanh toán :
                    </p>
                    <p>{intoMoney.totalLength}</p>
                  </div>
                  <div className="gx-d-flex">
                    <p className="management-contract-information-wrapper__title">
                      Giá trị hợp đồng :
                    </p>
                    <p>{formatCurrencyVND(intoMoney.totalMoney)}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CommonInfo;
