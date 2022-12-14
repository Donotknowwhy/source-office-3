import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { EditForm } from '@assets/icons/EditForm';
import { LogoGemsTech } from '@assets/icons/LogoGemsTech';
import ButtonCustom from '@components/Button';
import { formatCurrency, formatCurrencyVND } from '@util/utils';
import { Col, Row } from 'antd';
import {
  getAllPriceDeclaration,
  getPriceDeclarationById,
  updatePriceDeclaration
} from 'customApp/Crm/slice';
import FormDuplicateButton from 'customComponents/Form/FormDuplicateButton';
import { useEffect, useState } from 'react';
import { ITabQuote } from '../Quote.types';
const BASE_URL_IMG = process.env.REACT_APP_BASE_URL_IMG;

const InformationQuote = ({ searchValue, idSelect }: ITabQuote) => {
  const dispatch = useAppDispatch();
  const stateData = useAppSelector((state) => state.crm.quote.detailInfor.data);
  const authState = useAppSelector((state) => state.auth.currentUser);
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
        updatePriceDeclaration({ ...formValue, price_declaration_id: idSelect })
      );
      await dispatch(
        getPriceDeclarationById({
          price_declaration_id: idSelect
        })
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
    <div className="management-common-information-wrapper ">
      <FormDuplicateButton
        data={stateData[0]}
        modalVisible={open}
        onCancel={handleClick}
        title="S???a b??o gi??"
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

      <div className="management-common-information-wrapper__card gx-p-2 ">
        {stateData.length > 0 ? (
          <>
            {stateData.map((item) => {
              if (item.service_products) {
                const convertJSON = JSON.parse(item.service_products);
                return convertJSON.map((itemChild) => (
                  <Row>
                    <Col span={12}>
                      <div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            S???n ph???m d???ch v???
                          </p>
                          <p>{itemChild?.product_name}</p>
                        </div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            ????n v??? t??nh
                          </p>
                          <p>{itemChild?.unit}</p>
                        </div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            S??? l?????ng
                          </p>
                          <p>{itemChild?.quantity}</p>
                        </div>
                        <div className="gx-d-flex">
                          <p className="management-contract-information-wrapper__title">
                            Thu??? GTGT
                          </p>
                          <p>{itemChild?.added_value} %</p>
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          ????n gi??
                        </p>
                        <p>{formatCurrencyVND(itemChild?.price)}</p>
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Chi???t kh???u
                        </p>
                        <p>{itemChild?.discount} %</p>
                      </div>
                      <div className="gx-d-flex">
                        <p className="management-contract-information-wrapper__title">
                          Th??nh ti???n
                        </p>
                        <p>{formatCurrencyVND(itemChild?.into_money)}</p>
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
                      ?????t thanh to??n :
                    </p>
                    <p>{intoMoney.totalLength}</p>
                  </div>
                  <div className="gx-d-flex">
                    <p className="management-contract-information-wrapper__title">
                      Gi?? tr??? h???p ?????ng :
                    </p>
                    <p>{formatCurrencyVND(intoMoney.totalMoney)}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default InformationQuote;
