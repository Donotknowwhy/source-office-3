import { useEffect, memo, useState } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select
} from '@components/uielements';
import { useDispatch } from 'react-redux';
import { useForm } from 'antd/lib/form/Form';
import { useAppSelector } from '@appRedux/hooks';
import {
  FIELD_REQUIRED,
  DEFAULT_VALUE_INPUT,
  REGEX_NUMBER,
  VALIDATE_NUMBER
} from 'constants/index';
import { CASH, BANK } from '../../constants';
import { IAccount } from '../modules';
import { getBanks } from '../slices';

const { Option } = Select;

interface IModalAccount {
  isModalVisible: boolean;
  onSubmit: any;
  onCancel: any;
  accountSelect?: IAccount;
  title?: string;
}

const ModalAccount = ({
  isModalVisible,
  onSubmit,
  onCancel,
  accountSelect,
  title
}: IModalAccount) => {
  const [accountType, setAccountType] = useState('');
  const [isChangeForm, setIsChangeForm] = useState(false);
  const [form] = useForm();
  const dispatch = useDispatch();
  const { banks } = useAppSelector((state) => state.ManageAccount);

  useEffect(() => {
    if (accountSelect) {
      form.setFieldsValue({
        account_name: accountSelect?.account_name,
        account_type: accountSelect?.account_type,
        bank_code: accountSelect?.bank_code || DEFAULT_VALUE_INPUT,
        account_number: accountSelect?.account_number || DEFAULT_VALUE_INPUT,
        surplus: accountSelect?.surplus
      });

      setAccountType(accountSelect?.account_type || '');
    }
  }, [form, accountSelect]);

  useEffect(() => {
    dispatch(getBanks());
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

  return (
    <Modal
      title={title || 'Thêm tài khoản mới'}
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
        onFieldsChange={() => setIsChangeForm(true)}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name="account_name"
              label="Tên tài khoản"
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED
                }
              ]}
            >
              <Input placeholder="Nhập tên tài khoản" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="account_type"
              label="Loại tài khoản"
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED
                }
              ]}
            >
              <Select
                placeholder="Chọn loại tài khoản"
                onChange={(value) => {
                  setAccountType(value);
                  if (value === CASH) {
                    form.setFieldsValue({
                      bank_code: null,
                      account_number: null
                    });
                  }
                }}
              >
                <Option value={CASH}>{CASH}</Option>
                <Option value={BANK}>{BANK}</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: accountType === BANK,
                  message: FIELD_REQUIRED
                }
              ]}
              name="bank_code"
              label="Ngân hàng"
            >
              <Select
                placeholder="Chọn ngân hàng"
                disabled={accountType !== BANK}
                listHeight={150}
                showSearch
                filterOption={(input: string, option: any) =>
                  option?.children?.toLowerCase().includes(input)
                }
              >
                {banks.map((item) => (
                  <Option key={item.id} value={item.bank_code}>
                    {item.bank_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={
                accountType === BANK && [
                  {
                    pattern: new RegExp(REGEX_NUMBER),
                    message: VALIDATE_NUMBER
                  },
                  {
                    required: true,
                    message: FIELD_REQUIRED
                  }
                ]
              }
              name="account_number"
              label="Số tài khoản"
            >
              <Input
                disabled={accountType !== BANK}
                placeholder="Nhập số tài khoản"
              />
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
              name="surplus"
              label="Số dư"
            >
              <Input placeholder="Nhập số dư" />
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

export default memo(ModalAccount);
