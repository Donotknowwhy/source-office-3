import { useEffect, memo, useState } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  DatePicker
} from '@components/uielements';
import { useDispatch } from 'react-redux';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { useAppSelector } from '@appRedux/hooks';
import {
  FIELD_REQUIRED,
  DEFAULT_VALUE_INPUT,
  REGEX_NUMBER,
  VALIDATE_NUMBER
} from 'constants/index';
import { RECEIPT, PAYMENT } from '../constants';
import { DATE_FORMAT } from 'constants/commons';
import { IRevenueExpenditure } from './modules';
import {
  getCustomers,
  getSales,
  getAccounting,
  changeAccountUpdate
} from './slices';

const { Option } = Select;

interface IModalAccount {
  isModalVisible: boolean;
  onSubmit: any;
  onCancel: any;
  revenueExpenditureSelect?: IRevenueExpenditure;
  title?: string;
}
const ModalRevenueExpenditure = ({
  isModalVisible,
  onSubmit,
  onCancel,
  revenueExpenditureSelect,
  title
}: IModalAccount) => {
  const [isChangeForm, setIsChangeForm] = useState(false);

  const [form] = useForm();
  const dispatch = useDispatch();
  const { customers, sales, accounts, accounting, surplus } = useAppSelector(
    (state) => state.RevenueExpenditureSlice
  );

  useEffect(() => {
    revenueExpenditureSelect &&
      form.setFieldsValue({
        type: revenueExpenditureSelect?.type,
        account_id: revenueExpenditureSelect?.account_id,
        datetime: moment(revenueExpenditureSelect?.datetime),
        customer_id:
          revenueExpenditureSelect?.customer_id || DEFAULT_VALUE_INPUT,
        accounting: revenueExpenditureSelect?.accounting,
        money: revenueExpenditureSelect?.money,
        content: revenueExpenditureSelect?.content,
        surplus: revenueExpenditureSelect?.surplus,
        sale_staff_id: revenueExpenditureSelect?.sale_staff_id,
        note: revenueExpenditureSelect?.note
      });
  }, [form, revenueExpenditureSelect]);

  useEffect(() => {
    form.setFieldsValue({ surplus });
  }, [form, surplus]);

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getSales());
    dispatch(getAccounting());
  }, [dispatch]);

  const formItemLayout = {
    labelCol: { span: 22 },
    wrapperCol: { span: 22 }
  };

  const onFinish = (values) => {
    onSubmit(values);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleChangeAccount = (value) => {
    dispatch(changeAccountUpdate(value));
  };

  const onChangeForm = () => {
    setIsChangeForm(true);
  };

  return (
    <Modal
      title={title || 'Th??m phi???u thanh to??n'}
      visible={isModalVisible}
      onOk={onSubmit}
      onCancel={onCancel}
      width={1016}
      closable={false}
      className="form-task-modal"
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onChangeForm}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED
                }
              ]}
              name="type"
              label="Lo???i phi???u"
            >
              <Select placeholder="Ch???n lo???i phi???u">
                <Option value={RECEIPT}>{RECEIPT}</Option>
                <Option value={PAYMENT}>{PAYMENT}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="account_id"
              label="T??n t??i kho???n"
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED
                }
              ]}
            >
              <Select
                onChange={handleChangeAccount}
                placeholder="Ch???n t??i kho???n"
                showSearch
                filterOption={(input: string, option: any) =>
                  option?.children?.toLowerCase().includes(input)
                }
              >
                {accounts.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.account_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED
                }
              ]}
              name="datetime"
              label="Ng??y"
            >
              <DatePicker
                format={DATE_FORMAT}
                className="gx-w-100"
                placeholder="Nh???p ng??y"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED
                }
              ]}
              name="customer_id"
              label="T??n kh??ch h??ng"
            >
              <Select
                placeholder="Ch???n kh??ch h??ng"
                showSearch
                filterOption={(input: string, option: any) =>
                  option?.children?.toLowerCase().includes(input)
                }
              >
                {customers.map((item) => (
                  <Option key={item.customer_id} value={item.customer_id}>
                    {item.customer_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="customer_id" label="M?? kh??ch h??ng">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED
                }
              ]}
              name="accounting"
              label="H???ch to??n"
            >
              <Select placeholder="Ch???n lo???i h???ch to??n">
                {accounting.map((item) => (
                  <Option key={item.id} value={item.accounting_name}>
                    {item.accounting_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED
                },
                {
                  pattern: new RegExp(REGEX_NUMBER),
                  message: VALIDATE_NUMBER
                }
              ]}
              name="money"
              label="S??? ti???n(????n v??? VN??)"
            >
              <Input placeholder="Nh???p s??? ti???n" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="content" label="N???i dung">
              <Input placeholder="Nh???p n???i dung" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="surplus" label="S??? d??(????n v??? VN??)">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="sale_staff_id" label="Nh??n vi??n sale">
              <Select
                placeholder="Ch???n nh??n vi??n b??n"
                showSearch
                filterOption={(input: string, option: any) =>
                  option?.children?.toLowerCase().includes(input)
                }
              >
                {sales.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.staff_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="note" label="Ghi ch??">
              <Input placeholder="Nh???p ghi ch??" />
            </Form.Item>
          </Col>
        </Row>
        <div className="gx-d-flex gx-justify-content-center btn-footer">
          <Button className="btn-cancel" onClick={handleCancel}>
            H???y
          </Button>
          <Button
            disabled={!isChangeForm}
            htmlType="submit"
            type="primary"
            className="btn-ok"
          >
            L??u
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(ModalRevenueExpenditure);
