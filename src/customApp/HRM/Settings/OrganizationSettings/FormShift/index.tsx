import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { YYYY_MM_DD } from '@constants/commons';
import { Button, Col, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { clearTest, getProductServiceByOne } from 'customApp/Crm/slice';
import moment from 'moment';
import { useEffect, useState } from 'react';

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

const FormShift = ({
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
  ) as any;

  const allUser = useAppSelector((state) => state.crm.allUser) as any;

  const [dataField, setDataField] = useState([]);
  const [defaultValue, setValueDefault] = useState();
  const [count, setCount] = useState(0);
  const [stateKey, setKey] = useState(0);

  useEffect(() => {
    if (dataField.length > 0) {
      const fields = form.getFieldsValue();
      const { service_products } = fields;
      Object.assign(service_products[stateKey], dataField[0]);
      form.setFieldsValue({ service_products });
    }
  }, [dataField]);

  useEffect(() => {
    if (data) {
      Object.keys(data).map((key) => {
        if (moment(data[key], 'HH:mm:ss', true).isValid()) {
          form.setFields([
            {
              name: key,
              value: moment(data[key], 'HH:mm:ss')
            }
          ]);
        } else if (key === 'service_products') {
          const convertJSONMapKEy = JSON.parse(data[key]);
          form.setFieldsValue({
            [key]: convertJSONMapKEy
          });
        } else {
          if (key !== 'money_total')
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
  }, [data, modalVisible]);

  const [form] = useForm();

  const onFinish = (value) => {
    const cloneObj = {} as any;
    Object.keys(value).map((key) => {
      if (value[key]) {
        if (key.includes('in') || key.includes('out')) {
          cloneObj[key] = moment(value[key]).format('HH:mm:ss');
        } else {
          cloneObj[key] = value[key];
        }
      }
    });
    if (getValueForm) {
      getValueForm(cloneObj, nameForm);
    }
  };

  const handleValueChangeSelect = (value, key) => {
    setValueDefault(value);
    setKey(key);
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

  // const onChangeTimePicker = (value) => {};

  const handleValuesChange = (e, values) => {
    const serviceProductsCopy = [...values.service_products];
    if (serviceProductsCopy.length > 0) {
      values.service_products.forEach((fieldGroup, index) => {
        if (
          fieldGroup &&
          fieldGroup.quantity &&
          fieldGroup.price &&
          fieldGroup.quantity > 0
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
          // onValuesChange={handleValuesChange}
          // initialValues={{
          //   payment_information: [
          //     {
          //       date_of_payment: '',
          //       money_of_payment: 0
          //     }
          //   ]
          // }}
        >
          <Col span={22}>
            <Row gutter={[400, 0]}>
              <Col span={23}>
                <Form.Item
                  label="Ca l??m vi???c"
                  name="shift_name"
                  style={{ display: 'block' }}
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng nh???p tr?????ng n??y'
                    }
                  ]}
                >
                  <Input placeholder="Nh???p t??n ca l??m vi???c" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[30, 0]}>
              <Col span={2} className="gx-d-flex gx-align-items-center">
                <span>Th??? 2</span>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? b???t ?????u"
                  name={'mon_in'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? b???t ?????u'}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? k???t th??c"
                  name={'mon_out'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? k???t th??c'}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[30, 0]}>
              <Col span={2} className="gx-d-flex gx-align-items-center">
                <span>Th??? 3</span>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? b???t ?????u"
                  name={'tue_in'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? b???t ?????u'}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? k???t th??c"
                  name={'tue_out'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? k???t th??c'}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[30, 0]}>
              <Col span={2} className="gx-d-flex gx-align-items-center">
                <span>Th??? 4</span>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? b???t ?????u"
                  name={'wed_in'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? b???t ?????u'}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? k???t th??c"
                  name={'wed_out'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? k???t th??c'}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[30, 0]}>
              <Col span={2} className="gx-d-flex gx-align-items-center">
                <span>Th??? 5</span>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? b???t ?????u"
                  name={'thu_in'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? b???t ?????u'}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? k???t th??c"
                  name={'thu_out'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? k???t th??c'}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[30, 0]}>
              <Col span={2} className="gx-d-flex gx-align-items-center">
                <span>Th??? 6</span>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? b???t ?????u"
                  name={'fri_in'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? b???t ?????u'}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? k???t th??c"
                  name={'fri_out'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? k???t th??c'}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[30, 0]}>
              <Col span={2} className="gx-d-flex gx-align-items-center">
                <span>Th??? 7</span>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? b???t ?????u"
                  name={'sat_in'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? b???t ?????u'}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? k???t th??c"
                  name={'sat_out'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? k???t th??c'}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[30, 0]}>
              <Col span={2} className="gx-d-flex gx-align-items-center">
                <span>Ch??? nh???t</span>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? b???t ?????u"
                  name={'sun_in'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? b???t ?????u'}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Gi??? k???t th??c"
                  name={'sun_out'}
                  className="gx-d-block"
                >
                  <TimePicker
                    use12Hours={false}
                    format="HH:mm:ss"
                    style={{ width: '100%' }}
                    // onChange={onChangeTimePicker}
                    placeholder={'Nh???p gi??? k???t th??c'}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <div className="gx-d-flex gx-justify-content-center">
            <Button style={{ width: '110px' }} onClick={() => onCancel()}>
              H???y
            </Button>
            <Button type="primary" style={{ width: '110px' }} htmlType="submit">
              X??c nh??n
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FormShift;
