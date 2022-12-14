import { MinusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { Add } from '@assets/icons/Add';
import {
  DATE_DD_MM_YYYY,
  DATE_FORMAT_EN_GB,
  YYYY_MM_DD
} from '@constants/commons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import classNames from 'classnames';
import {
  JSONbank,
  optionPaymentMethod,
  optionStatusOfPayment,
  statusContract,
  statusContractType
} from 'customApp/Crm/Quote/Quote.helper';
import { clearTest, getProductServiceByOne } from 'customApp/Crm/slice';
import _, { debounce } from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

const { Option } = Select;

export interface IFormDuplicateButtonBottom {
  nameForm?: string;
  title?: string;
  modalVisible: boolean;
  onCancel?: () => void;
  getValueForm?: (valueForm, name) => void;
  widthModal?: number;
  colSpan?: number;
  data?: any;
  test?: any;
}

const FormMoveContractManagement = ({
  nameForm,
  title,
  modalVisible,
  onCancel,
  getValueForm,
  widthModal = 1016,
  colSpan = 12,
  data,
  test,
  ...properties
}: IFormDuplicateButtonBottom) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const getProductServiceState = useAppSelector(
    (state) => state.crm.addNewQuoteCRM
  );

  const [form] = useForm();

  const allUser = useAppSelector((state) => state.crm.allUser);
  const [selectBank, setSelectBank] = useState('');
  const [defaultValue, setValueDefault] = useState();
  const [dataField, setDataField] = useState([]);
  const [stateKey, setKey] = useState(0);

  useEffect(() => {
    if (dataField.length > 0) {
      const fields = form.getFieldsValue();
      const { service_products } = fields;
      if (dataField) {
        Object.assign(service_products[stateKey], dataField[0]);
        form.setFieldsValue({ service_products });
      }
    }
  }, [dataField]);

  useEffect(() => {
    if (data) {
      Object.keys(data).map((key) => {
        if (moment(data[key], 'YYYY-MM-DD', true).isValid()) {
          form.setFields([
            {
              name: key,
              value: moment(data[key])
            }
          ]);
        } else if (key === 'service_products') {
          const convertJSONMapKEy = JSON.parse(data[key]);
          form.setFieldsValue({
            [key]: convertJSONMapKEy
          });
        } else if (key === 'payment_information') {
          const convertJSONMapKEy = JSON.parse(data[key]);
          if (convertJSONMapKEy.length > 0) {
            const convertMomentValue = convertJSONMapKEy.map((item) => {
              return {
                ...item,
                ['date_of_payment']: moment(
                  moment(item.date_of_payment).format(YYYY_MM_DD)
                )
              };
            });
            form.setFieldsValue({
              payment_information: convertMomentValue
            });
          }
        } else {
          form.setFields([
            {
              name: key,
              value: data[key]
            }
          ]);
        }
      });
    }
    return () => {
      dispatch(clearTest({}));
    };
  }, [data]);

  const deBounceValue = useCallback(
    debounce((cloneObj, nameForm) => {
      getValueForm(cloneObj, nameForm);
    }, 350),
    []
  );

  const onFinish = (value) => {
    if (value.service_products) {
    }
    const cloneObj = {} as any;
    Object.keys(value).map((key) => {
      if (value[key]) {
        if (key.includes('date')) {
          cloneObj[key] = moment(value[key]).format(YYYY_MM_DD);
        } else if (key.includes('service_products')) {
          if (key.includes('date')) {
            cloneObj[key] = moment(value[key]).format(YYYY_MM_DD);
          }
          cloneObj[key] = JSON.stringify(value[key]);
          // cloneObj[key] = value[key];
        } else if (key.includes('payment_information')) {
          const handleJSON = value[key];
          const convertMomentValue = handleJSON.map((item) => {
            return {
              ...item,
              ['date_of_payment']: moment(item).format(YYYY_MM_DD)
            };
          });
          cloneObj[key] = JSON.stringify(convertMomentValue);
        } else {
          cloneObj[key] = value[key];
        }
      }
    });
    cloneObj.branch_id = authState.branch_id;

    if (getValueForm) {
      deBounceValue(cloneObj, nameForm);
    }
  };

  const handleValueChangeSelect = async (value, key) => {
    setValueDefault(value);
    setKey(key);

    if (value) {
      const res: any = await dispatch(
        getProductServiceByOne({
          code: value
        })
      );

      if (res?.payload?.data) {
        setDataField(res?.payload?.data);
      }
    }
  };

  const onChangeSelect = (value) => {
    setSelectBank(value);
  };

  const handleValuesChange = (e, values) => {
    const serviceProductsCopy = [...values.service_products];

    if (serviceProductsCopy.length > 0) {
      values.service_products.forEach((fieldGroup, index) => {
        if (
          fieldGroup &&
          fieldGroup.quantity &&
          fieldGroup.price &&
          fieldGroup.quantity >= 0
        ) {
          const priceMoney = fieldGroup.quantity * fieldGroup.price;
          fieldGroup.into_money = Math.floor(
            priceMoney +
              (priceMoney * fieldGroup.added_value) / 100 -
              (priceMoney * fieldGroup.discount) / 100
          );

          serviceProductsCopy.splice(index, 1, fieldGroup);

          form.setFieldsValue({ service_products: serviceProductsCopy });
          const fields = form.getFieldsValue();
          const { service_products } = fields;
          const total = service_products.reduce((pre, item) => {
            return pre + item.into_money;
          }, 0);

          if (total || total === 0) {
            form.setFields([{ name: 'money_total', value: total }]);
            form.setFieldsValue([{ name: 'money_total', value: total }]);
          }
        }
      });
    }
  };

  return (
    <div className="hrm-manage-account-add-new-form">
      <Modal
        title={title}
        visible={modalVisible}
        onCancel={onCancel}
        width={widthModal} //1016
        closable={false}
        className="form-task-modal"
        footer={null}
      >
        <Form
          form={form}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          onValuesChange={handleValuesChange}
          initialValues={{
            money_total: 0,
            service_products: [
              {
                product_name: '',
                unit: 0,
                price: 0,
                service_name: '',
                added_value: 0,
                quantity: 0,
                discount: 0,
                into_money: 0
              }
            ],
            payment_information: [
              {
                date_of_payment: moment(moment().toDate()),
                money_of_payment: '',
                content_of_payment: '',
                status_of_payment: '',
                payment_method_bank: ''
              }
            ]
          }}
        >
          <Row gutter={[30, 0]}>
            <Col span={11}>
              <Form.Item
                label="M?? h???p ?????ng"
                name="price_declaration_code"
                className=" gx-d-block"
              >
                <Input
                  placeholder="---"
                  readOnly
                  className="gx-input-view-only"
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="T??n h???p ?????ng"
                name="contract_name"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                  }
                ]}
              >
                <Input placeholder="Nh???p t??n h???p ?????ng" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Lo???i h???p ?????ng"
                name="contract_type"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                  }
                ]}
              >
                <Select placeholder="Nh???p lo???i h???p ?????ng">
                  {statusContractType.map((item) => (
                    <Option value={item.value} key={_.uniqueId('key_')}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="T??n kh??ch h??ng"
                name="customer_id"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                  }
                ]}
              >
                <Select placeholder="Nh???p t??n kh??ch h??ng">
                  {getProductServiceState.allCustomer.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Ng??y k??"
                name="sign_date"
                className=" gx-d-block"
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format={DATE_FORMAT_EN_GB}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Ng?????i ph??? tr??ch"
                name="staff_id"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                  }
                ]}
              >
                <Select
                  placeholder="Nh???p ng?????i ph??? tr??ch"
                  listHeight={150}
                  showSearch
                  filterOption={(input: string, option: any) =>
                    option?.children?.toLowerCase().includes(input)
                  }
                >
                  {allUser.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Hi???u l???c h???p ?????ng t??? ng??y"
                name="start_date"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                  }
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Nh???p ng??y hi???u l???c h???p ?????ng"
                  format={DATE_FORMAT_EN_GB}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="?????n ng??y"
                name="end_date"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                  }
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Nh???p ng??y"
                  format={DATE_FORMAT_EN_GB}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Tr???ng th??i"
                name="contract_status"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                  }
                ]}
              >
                <Select
                  placeholder="Nh???p tr???ng th??i"
                  listHeight={150}
                  showSearch
                  filterOption={(input: string, option: any) =>
                    option?.children?.toLowerCase().includes(input)
                  }
                >
                  {statusContract.map((item) => (
                    <Option value={item.value} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="H??nh th???c thanh to??n"
                name="payment_method"
                className=" gx-d-block"
              >
                <Select
                  listHeight={150}
                  showSearch
                  filterOption={(input: string, option: any) =>
                    option?.children?.toLowerCase().includes(input)
                  }
                  placeholder="Ch???n h??nh th???c thanh to??n"
                  onChange={onChangeSelect}
                >
                  {optionPaymentMethod.map((option) => (
                    <Option value={option.value} key={option.value}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="T??n ng??n h??ng"
                name="bank_name"
                className=" gx-d-block"
              >
                <Select
                  listHeight={150}
                  showSearch
                  filterOption={(input: string, option: any) =>
                    option?.children?.toLowerCase().includes(input)
                  }
                  placeholder="Ch???n t??n ng??n h??ng"
                  disabled={selectBank === 'Ti???n m???t' ? true : false}
                >
                  {JSONbank.map((option) => (
                    <Option value={option.value} key={option.value}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="S??? t??i kho???n"
                name="account_number"
                className=" gx-d-block"
              >
                <Input
                  type={'number'}
                  disabled={selectBank === 'Ti???n m???t' ? true : false}
                  placeholder="Nh???p s??? t??i kho???n"
                  className="gx-no-inner"
                />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item label="?????a ch???" name="address" className=" gx-d-block">
                <Input placeholder="Nh???p ?????a ch???" />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item
                label="S??? ??i???n tho???i"
                name="phone"
                className=" gx-d-block"
              >
                <Input
                  type={'number'}
                  placeholder="Nh???p s??? ??i???n tho???i"
                  className="gx-no-inner"
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="Email" name="email" className=" gx-d-block">
                <Input placeholder="Nh???p email" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="Ghi ch??" name="note" className=" gx-d-block">
                <Input placeholder="Nh???p ghi ch??" />
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="service_products">
            {(fields, { add, remove }) => (
              <Row gutter={[30, 0]}>
                {fields.map(({ key, name, ...restField }) => (
                  <Col span={24} key={key} style={{}}>
                    <p>Chi ti???t b??o gi??</p>
                    <Row gutter={[30, 0]} className="111">
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="S???n ph???m d???ch v???"
                          name={[name, 'product_name']}
                          rules={[
                            {
                              required: true,
                              message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                            }
                          ]}
                          className="gx-d-block"
                        >
                          <Select
                            placeholder="Nh???p s???n ph???m d???ch v???"
                            onChange={(e) => handleValueChangeSelect(e, key)}
                          >
                            {getProductServiceState.data?.map((item) => (
                              <Option
                                value={item.code}
                                key={_.uniqueId('key_')}
                              >
                                {item.product_name || item.service_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="????n v??? t??nh"
                          name={[name, 'unit']}
                          className="gx-d-block"
                        >
                          <Input className="gx-input-view-only" readOnly />
                        </Form.Item>
                      </Col>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="????n gi??"
                          name={[name, 'price']}
                          className="gx-d-block"
                        >
                          <InputNumber
                            style={{ width: '100%' }}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            controls={false}
                            placeholder="????n gi??"
                            className="gx-input-view-only-no-padding"
                            // disabled={true}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Thu??? GTGT(%)"
                          name={[name, 'added_value']}
                          className="gx-d-block"
                        >
                          <Input
                            className="gx-input-view-only"
                            readOnly
                            type={'number'}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="S??? l?????ng"
                          name={[name, 'quantity']}
                          className="gx-d-block"
                          rules={[
                            {
                              required: true,
                              message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                            }
                          ]}
                        >
                          <Input
                            readOnly={!defaultValue && !data}
                            className={classNames('', {
                              'gx-input-view-only': !defaultValue && !data
                            })}
                            placeholder="Nh???p s??? l?????ng"
                            min={0}
                            type={'number'}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Chi???t kh???u (%)"
                          name={[name, 'discount']}
                          className="gx-d-block"
                          rules={[
                            {
                              required: true,
                              message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                            }
                          ]}
                        >
                          <Input
                            readOnly={!defaultValue && !data}
                            className={classNames('', {
                              'gx-input-view-only': !defaultValue && !data
                            })}
                            placeholder="Nh???p chi???t kh???u"
                            type={'number'}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Th??nh ti???n (????n v??? VND)"
                          name={[name, 'into_money']}
                          className="gx-d-block"
                        >
                          <InputNumber
                            className="gx-input-view-only-no-padding"
                            style={{ width: '100%', borderRadius: 8 }}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            controls={false}
                            placeholder="Th??nh ti???n"
                            readOnly={true}
                            // className="gx-input-view-only"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                ))}
                <Col>
                  <Form.Item>
                    <div className="gx-d-flex gx-align-items-center">
                      <div className="gx-pointer-cursor" onClick={() => add()}>
                        {<Add />}
                      </div>

                      <span className="gx-ml-2">Th??m s???n ph???m d???ch v???</span>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Form.List>
          <Row gutter={[30, 0]}>
            <Col span={11}>
              <Form.Item
                label="Gi?? tr??? h???p ?????ng"
                name="money_total"
                className="gx-d-block"
              >
                <InputNumber
                  className="gx-input-view-only-no-padding"
                  style={{ width: '100%', borderRadius: 8 }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  controls={false}
                  readOnly={true}
                />
                {/* <Input readOnly className="gx-input-view-only" /> */}
              </Form.Item>
            </Col>
            <Col span={11}></Col>
          </Row>
          <Form.List name="payment_information">
            {(fields, { add, remove }) => (
              <Row gutter={[30, 0]}>
                <p className="gx-pl-3">Th??ng tin thanh to??n </p>

                {fields.map(({ key, name, fieldKey, ...restField }: any) => (
                  <Col span={24} key={key} style={{}}>
                    <div>?????t {fieldKey + 1}</div>

                    <Row gutter={[30, 0]} className="111">
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Ng??y thanh to??n"
                          name={[name, 'date_of_payment']}
                          rules={[
                            {
                              required: true,
                              message: 'Vui l??ng nh???p ?????y ????? th??ng tin'
                            }
                          ]}
                          className="gx-d-block"
                        >
                          <DatePicker
                            style={{ width: '100%' }}
                            placeholder="Nh???p ng??y thanh to??n"
                            format={DATE_FORMAT_EN_GB}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="S??? ti???n thanh to??n"
                          name={[name, 'money_of_payment']}
                          className="gx-d-block"
                        >
                          <InputNumber
                            style={{ width: '100%', borderRadius: 8 }}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            controls={false}
                            placeholder={'Nh???p s??? ti???n thanh to??n'}
                          />
                          {/* <Input placeholder="Nh???p s??? ti???n thanh to??n" /> */}
                        </Form.Item>
                      </Col>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="N???i dung"
                          name={[name, 'content_of_payment']}
                          className="gx-d-block"
                        >
                          <Input placeholder="Nh???p n???i dung" />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Tr???ng th??i thanh to??n"
                          name={[name, 'status_of_payment']}
                          className="gx-d-block"
                        >
                          <Select placeholder="Nh???p tr???ng th??i thanh to??n">
                            {optionStatusOfPayment.map((item) => (
                              <Option value={item.value} key={item.id}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="H??nh th???c thanh to??n"
                          name={[name, 'payment_method_bank']}
                          className="gx-d-block"
                        >
                          <Select
                            placeholder="Ch???n h??nh th???c thanh to??n"
                            onChange={onChangeSelect}
                          >
                            {optionPaymentMethod.map((option) => (
                              <Option value={option.value} key={option.id}>
                                {option.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                ))}
                <Col>
                  <Form.Item>
                    <div className="gx-d-flex gx-align-items-center">
                      <div className="gx-pointer-cursor" onClick={() => add()}>
                        {<Add />}
                      </div>

                      <span className="gx-ml-2">Th??m h??nh th???c thanh to??n</span>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Form.List>

          <div className="gx-d-flex gx-justify-content-center">
            <Button style={{ width: '110px' }} onClick={() => onCancel()}>
              H???y
            </Button>
            <Button type="primary" style={{ width: '110px' }} htmlType="submit">
              X??c nh???n
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FormMoveContractManagement;
