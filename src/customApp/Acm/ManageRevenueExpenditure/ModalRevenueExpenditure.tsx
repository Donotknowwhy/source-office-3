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
      title={title || 'Thêm phiếu thanh toán'}
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
              label="Loại phiếu"
            >
              <Select placeholder="Chọn loại phiếu">
                <Option value={RECEIPT}>{RECEIPT}</Option>
                <Option value={PAYMENT}>{PAYMENT}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="account_id"
              label="Tên tài khoản"
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED
                }
              ]}
            >
              <Select
                onChange={handleChangeAccount}
                placeholder="Chọn tài khoản"
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
              label="Ngày"
            >
              <DatePicker
                format={DATE_FORMAT}
                className="gx-w-100"
                placeholder="Nhập ngày"
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
              label="Tên khách hàng"
            >
              <Select
                placeholder="Chọn khách hàng"
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
            <Form.Item name="customer_id" label="Mã khách hàng">
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
              label="Hạch toán"
            >
              <Select placeholder="Chọn loại hạch toán">
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
              label="Số tiền(Đơn vị VNĐ)"
            >
              <Input placeholder="Nhập số tiền" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="content" label="Nội dung">
              <Input placeholder="Nhập nội dung" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="surplus" label="Số dư(Đơn vị VNĐ)">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="sale_staff_id" label="Nhân viên sale">
              <Select
                placeholder="Chọn nhân viên bán"
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
            <Form.Item name="note" label="Ghi chú">
              <Input placeholder="Nhập ghi chú" />
            </Form.Item>
          </Col>
        </Row>
        <div className="gx-d-flex gx-justify-content-center btn-footer">
          <Button className="btn-cancel" onClick={handleCancel}>
            Hủy
          </Button>
          <Button
            disabled={!isChangeForm}
            htmlType="submit"
            type="primary"
            className="btn-ok"
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(ModalRevenueExpenditure);
