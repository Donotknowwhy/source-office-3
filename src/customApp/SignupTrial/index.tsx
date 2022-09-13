import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useAuth } from '../../authentication';
import PublicLayout from 'containers/PublicLayout';
import AppNotificationContainer from '@components/AppNotificationContainer';
import {
  BUSINESS_NAME,
  ENTER_BUSINESS_NAME,
  EMAIL,
  ENTER_EMAIL,
  PHONE,
  ENTER_PHONE,
  REGISTER_NOW,
  FIELD_REQUIRED,
  REGEX_EMAIL,
  VALIDATE_EMAIL
} from 'constants/index';

const SignUpTrial = () => {
  const { isLoading, error } = useAuth();
  const [form] = Form.useForm();
  const [disabledButton, setDisableButton] = useState(false);

  const onFinish = (values) => {};

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisableButton(hasErrors);
  };

  return (
    <PublicLayout
      title="Đăng kí dùng thử"
      subTitle="Vui lòng điền đầy đủ thông tin để nhận tài khoản dùng thử."
    >
      <Form
        className="signupTrial"
        name="formSignupTrial"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        onFieldsChange={handleFormChange}
        form={form}
      >
        <Form.Item
          name="businessName"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
          label={BUSINESS_NAME}
        >
          <Input placeholder={ENTER_BUSINESS_NAME} />
        </Form.Item>
        <Form.Item
          label="Mã số doanh nghiệp"
          name="company_code"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input placeholder="Nhập mã số doanh nghiệp" />
        </Form.Item>

        <Form.Item
          label={EMAIL}
          name="email"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            {
              pattern: new RegExp(REGEX_EMAIL),
              message: VALIDATE_EMAIL
            }
          ]}
        >
          <Input placeholder={ENTER_EMAIL} />
        </Form.Item>
        <Form.Item label={PHONE} name="phone" className="gx-mb-4 gx-pb-2">
          <Input placeholder={ENTER_PHONE} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signupTrial__btn-submit gx-mb-0"
            block
            disabled={disabledButton}
          >
            {REGISTER_NOW}
          </Button>
        </Form.Item>
      </Form>
      <AppNotificationContainer loading={isLoading} error={error} />
    </PublicLayout>
  );
};

export default SignUpTrial;
