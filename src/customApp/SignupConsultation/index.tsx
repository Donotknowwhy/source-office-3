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

const SignUpConsultation = () => {
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
      title="Đăng kí tư vấn với"
      subTitle="Vui lòng điền đầy đủ thông tin để đăng kí tư vấn."
    >
      <Form
        className="signupConsultation"
        name="formSignuponsultation"
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

        <Form.Item label={PHONE} name="businessCode">
          <Input placeholder={ENTER_PHONE} />
        </Form.Item>

        <Form.Item label="Ghi chú" className="gx-mb-4 gx-pb-2" name="note">
          <Input.TextArea rows={4} placeholder="Nhập ghi chú" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signupConsultation__btn-submit gx-mb-0"
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

export default SignUpConsultation;
