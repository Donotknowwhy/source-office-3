import { MinusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { Add } from '@assets/icons/Add';
import { DATE_FORMAT_EN_GB, YYYY_MM_DD } from '@constants/commons';
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
  optionQuoteStatus
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
  clearDataForm?: boolean;
}

const FormDuplicateButton = ({
  nameForm,
  title,
  modalVisible,
  onCancel,
  getValueForm,
  widthModal = 1016,
  colSpan = 12,
  data,
  test,
  clearDataForm
}: IFormDuplicateButtonBottom) => {
  const dispatch = useAppDispatch();

  const getProductServiceState = useAppSelector(
    (state) => state.crm.addNewQuoteCRM
  ) as any;
  const allUser = useAppSelector((state) => state.crm.allUser) as any;

  const [dataField, setDataField] = useState([]);
  const [defaultValue, setValueDefault] = useState();
  const [selectBank, setSelectBank] = useState('');
  const [stateKey, setKey] = useState(0);

  const onCancelHandler = () => {
    if (onCancel) {
      onCancel();
    }
  };

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
        } else {
          form.setFields([
            {
              name: key,
              value: data[key]
            }
          ]);
          if (key !== 'money_total') {
          }
        }
      });
    }
    return () => {
      dispatch(clearTest({}));
    };
  }, [data, modalVisible]);

  useEffect(() => {
    if (clearDataForm) {
      form.resetFields();
    }
  }, [clearDataForm]);

  const [form] = useForm();

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
          cloneObj[key] = JSON.stringify(value[key]);
        } else {
          cloneObj[key] = value[key];
        }
      }
    });

    if (getValueForm) {
      deBounceValue(cloneObj, nameForm);
    }
  };

  const handleValueChangeSelect = (value, key) => {
    setValueDefault(value);
    setKey(key);
  };

  const onChangeSelect = (value) => {
    setSelectBank(value);
  };

  useEffect(() => {
    const callApi = async () => {
      if (defaultValue) {
        const res: any = await dispatch(
          getProductServiceByOne({
            code: defaultValue
          })
        );

        if (res?.payload?.data) {
          setDataField(res?.payload?.data);
        }
      }
    };
    callApi();
  }, [defaultValue]);

  const handleValuesChange = (e, values) => {
    const serviceProductsCopy = [...values.service_products];
    if (serviceProductsCopy) {
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

            if (total) {
              form.setFields([{ name: 'money_total', value: total }]);
              form.setFieldsValue([{ name: 'money_total', value: total }]);
            }
          }
        });
      }
    }
  };

  return (
    <div className="hrm-manage-account-add-new-form">
      <Modal
        confirmLoading
        title={title}
        visible={modalVisible}
        onCancel={onCancelHandler}
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
            ]
          }}
        >
          <Row gutter={[30, 0]}>
            <Col span={11}>
              <Form.Item
                label="Mã báo giá"
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
                label="Tên báo giá"
                name="price_declaration_name"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Input placeholder="Nhập tên báo giá" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Khách hàng"
                name="customer_id"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Select
                  placeholder="Nhập tên khách hàng"
                  listHeight={150}
                  showSearch
                  filterOption={(input: string, option: any) =>
                    option?.children?.toLowerCase().includes(input)
                  }
                >
                  {getProductServiceState.allCustomer.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Tên người phụ trách"
                name="staff_id"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Select
                  placeholder="Nhập tên khách hàng"
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
                label="Ngày tạo"
                name="created_date"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format={DATE_FORMAT_EN_GB}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Ngày kết thúc"
                name="expiration_date"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format={DATE_FORMAT_EN_GB}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Trạng thái"
                name="price_declaration_status"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Select
                  placeholder="Nhập tên khách hàng"
                  listHeight={150}
                  // showSearch
                  // filterOption={(input: string, option: any) =>
                  //   option?.children?.toLowerCase().includes(input)
                  // }
                >
                  {optionQuoteStatus.map((item) => (
                    <Option value={item.value} key={item.value}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Hình thức thanh toán"
                name="payment_method"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Select
                  placeholder="Chọn hình thức thanh toán"
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
                label="Số tài khoản"
                name="account_number"
                className=" gx-d-block"
              >
                <Input
                  placeholder="Nhập số tài khoản"
                  disabled={selectBank === 'Tiền mặt' ? true : false}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Tên ngân hàng"
                name="bank_name"
                className=" gx-d-block"
              >
                <Select
                  placeholder="Chọn tên ngân hàng"
                  disabled={selectBank === 'Tiền mặt' ? true : false}
                  listHeight={150}
                  showSearch
                  filterOption={(input: string, option: any) =>
                    option?.children?.toLowerCase().includes(input)
                  }
                >
                  {JSONbank.map((option) => (
                    <Option value={option.value}>{option.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="Địa chỉ" name="address" className=" gx-d-block">
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                className=" gx-d-block"
              >
                <Input type={'number'} placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="Email" name="email" className=" gx-d-block">
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="Ghi chú" name="note" className=" gx-d-block">
                <Input placeholder="Nhập ghi chú" />
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="service_products">
            {(fields, { add, remove }) => (
              <Row gutter={[30, 0]}>
                {fields.map(({ key, name, ...restField }) => (
                  <Col span={24} key={key} style={{}}>
                    <p>Chi tiết báo giá</p>
                    <Row gutter={[30, 0]}>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Sản phẩm dịch vụ"
                          name={[name, 'product_name']}
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập đầy đủ thông tin'
                            }
                          ]}
                          className="gx-d-block"
                        >
                          <Select
                            placeholder="Nhập sản phẩm dịch vụ"
                            listHeight={150}
                            showSearch
                            filterOption={(input: string, option: any) =>
                              option?.children?.toLowerCase().includes(input)
                            }
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
                          label="Đơn vị tính"
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
                          label="Đơn giá"
                          name={[name, 'price']}
                          className="gx-d-block"
                        >
                          <InputNumber
                            style={{ width: '100%' }}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            controls={false}
                            placeholder="Thành tiền"
                            className="gx-input-view-only-no-padding"
                            // disabled={true}
                            readOnly
                          />
                          {/* <Input className="gx-input-view-only" readOnly /> */}
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Thuế GTGT(%)"
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
                          label="Số lượng"
                          name={[name, 'quantity']}
                          className="gx-d-block"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập đầy đủ thông tin'
                            }
                          ]}
                        >
                          <Input
                            readOnly={!defaultValue && !data}
                            className={classNames('', {
                              'gx-input-view-only': !defaultValue && !data
                            })}
                            placeholder="Nhập số lượng"
                            min={0}
                            type={'number'}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Chiết khấu (%)"
                          name={[name, 'discount']}
                          className="gx-d-block"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập đầy đủ thông tin'
                            }
                          ]}
                        >
                          <Input
                            readOnly={!defaultValue && !data}
                            className={classNames('', {
                              'gx-input-view-only': !defaultValue && !data
                            })}
                            type={'number'}
                            placeholder="Nhập chiết khấu"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Thành tiền (đơn vị VND)"
                          name={[name, 'into_money']}
                          className="gx-d-block"
                        >
                          <InputNumber
                            style={{ width: '100%' }}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            controls={false}
                            placeholder="Thành tiền"
                            className="gx-input-view-only-no-padding"
                            // disabled={true}
                            readOnly
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

                      <span className="gx-ml-2">Thêm sản phẩm dịch vụ</span>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Form.List>
          <Row gutter={[30, 0]}>
            <Col span={11}>
              <Form.Item
                label="Giá trị hợp đồng"
                name="money_total"
                className="gx-d-block"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  controls={false}
                  placeholder="Thành tiền"
                  className="gx-input-view-only-no-padding"
                  // disabled={true}
                  readOnly
                />
                {/* <Input readOnly className="gx-input-view-only" /> */}
              </Form.Item>
            </Col>
          </Row>

          <div className="gx-d-flex gx-justify-content-center">
            <Button style={{ width: '110px' }} onClick={() => onCancel()}>
              Hủy
            </Button>
            <Button type="primary" style={{ width: '110px' }} htmlType="submit">
              Xác nhân
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FormDuplicateButton;
