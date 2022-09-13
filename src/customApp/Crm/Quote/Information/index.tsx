import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { EditForm } from '@assets/icons/EditForm';
import { LogoGemsTech } from '@assets/icons/LogoGemsTech';
import ButtonCustom from '@components/Button';
import { formatDateENGB } from '@constants/commons';
import { Col, Row } from 'antd';
import {
  getAllPriceDeclaration,
  getPriceDeclarationById,
  updatePriceDeclaration
} from 'customApp/Crm/slice';
import FormDuplicateButton from 'customComponents/Form/FormDuplicateButton';
import Status from 'customComponents/Status';
import { useState } from 'react';
import { ITabQuote } from '../Quote.types';
const BASE_URL_IMG = process.env.REACT_APP_BASE_URL_IMG;

const Information = ({ searchValue, idSelect }: ITabQuote) => {
  const dispatch = useAppDispatch();
  const quote = useAppSelector((state) => state.crm.quote);
  const authState = useAppSelector((state) => state.auth.currentUser);

  const { data } = quote.detailInfor;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const getValueForm = async (formValue, name) => {
    setOpen(false);

    if (formValue) {
      await dispatch(
        updatePriceDeclaration({ ...formValue, price_declaration_id: idSelect })
      );

      await dispatch(
        getAllPriceDeclaration({
          page: 1,
          limit: 15,
          status: 1,
          search: '',
          filter: ['']
        })
      );
      await dispatch(
        getPriceDeclarationById({
          price_declaration_id: idSelect
        })
      );
    }
  };

  return (
    <div className="management-bill-information-wrapper">
      {data.length > 0
        ? data.map((item) => (
            <>
              <FormDuplicateButton
                data={data[0]}
                modalVisible={open}
                onCancel={handleClick}
                title="Sửa báo giá"
                getValueForm={getValueForm}
              />
              <div className="gx-d-flex gx-justify-content-between gx-pt-4 gx-pl-4 gx-pr-4">
                <div>
                  {authState?.company?.logo && (
                    <img
                      width={100}
                      src={`${BASE_URL_IMG}${authState?.company?.logo}`}
                      alt="logo img"
                    />
                  )}
                </div>

                <div>
                  <ButtonCustom
                    iconLeft={<EditForm />}
                    value=""
                    onClick={handleClick}
                    background={'color-white'}
                  />
                </div>
              </div>
              <div className="management-bill-information-wrapper__card gx-p-2">
                <Row>
                  <Col span={12}>
                    <div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Mã báo giá
                        </p>
                        <p>{item?.price_declaration_code}</p>
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Khách hàng
                        </p>
                        <p>{item?.customer_name}</p>
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Ngày tạo
                        </p>
                        <p>{formatDateENGB(item?.created_date)}</p>
                      </div>
                      <div className="gx-d-flex gx-pb-3">
                        <div className="management-contract-information-wrapper__title">
                          Trạng thái
                        </div>
                        <Status status={item?.price_declaration_status} />
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Số tài khoản
                        </p>
                        <p className="management-contract-information-wrapper__title">
                          {item.account_number}
                        </p>
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Địa chỉ
                        </p>
                        <p className="management-contract-information-wrapper__title">
                          {item.address}
                        </p>
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Email
                        </p>
                        <p>{item.email}</p>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Tên báo giá
                      </p>
                      <p>{item.price_declaration_name}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Người phụ trách
                      </p>
                      <p>{item.person_in_charge}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Ngày hết hạn
                      </p>
                      <p>{formatDateENGB(item.expiration_date)}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Hình thức thanh toán
                      </p>
                      <p>{item.payment_method}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Ngân hàng
                      </p>
                      <p>{item.bank_name}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Số điện thoại
                      </p>
                      <p>{item.phone}</p>
                    </div>
                    <div className="gx-d-flex">
                      <p className="management-contract-information-wrapper__title">
                        Ghi chú
                      </p>
                      <p>{item.note}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          ))
        : null}
    </div>
  );
};

export default Information;
