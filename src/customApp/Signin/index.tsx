import AppNotificationContainer from '@components/AppNotificationContainer';
import { Button, Form, Input } from 'antd';
import { BUSINESS_CODE, ENTER_BUSINESS_CODE } from 'constants/index';
import PublicLayout from 'containers/PublicLayout';
import { useState } from 'react';
import { useAuth } from '../../authentication';
import validateRule from './../../constants/fieldRules';

const SignIn = () => {
  const { isLoading, userSignin } = useAuth();
  const [form] = Form.useForm();
  const [disabledButton, setDisableButton] = useState(false);

  const onFinish = (values) => {
    userSignin(values);
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisableButton(hasErrors);
  };

  return (
    <PublicLayout
      title="Chào mừng đến với"
      subTitle="Đăng nhập để bắt đầu làm việc"
    >
      <Form
        className="signin"
        name="formSignin"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        onFieldsChange={handleFormChange}
        form={form}
        // initialValues={{
        //   username: 'thucle',
        //   password: '12345678',
        //   company_code: 'gemstech'
        // }}
      >
        <Form.Item name="company_code" label={BUSINESS_CODE}>
          <Input placeholder={ENTER_BUSINESS_CODE} />
        </Form.Item>
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[validateRule.fieldRequiredRule()]}
        >
          <Input placeholder="Nhập tên đăng nhập" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            validateRule.fieldRequiredRule(),
            validateRule.minLengthRule(8)
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked">
          <div className="gx-d-flex gx-justify-content-between">
            <Checkbox className="signin__remember-password">
              Nhớ mật khẩu
            </Checkbox>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>
        </Form.Item> */}

        <Form.Item shouldUpdate className="gx-mb-3">
          <Button
            type="primary"
            htmlType="submit"
            className="signin__btn-submit gx-m-0"
            block
            disabled={disabledButton}
          >
            Đăng nhập
          </Button>
        </Form.Item>
        {/* <Form.Item>
          <div className="gx-d-flex">
            <Button className="signin__btn" block>
              <Link to={PATH.SIGNIN_TRIAL}>Dùng thử miễn phí</Link>
            </Button>
            <Button className="signin__btn" block>
              <Link to={PATH.SIGNIN_CONSULTATION}>Liên hệ tư vấn</Link>
            </Button>
          </div>
        </Form.Item> */}
      </Form>

      {/* <div className="signin__footer gx-d-flex gx-justify-content-center gx-align-items-center ">
        <p className="gx-m-0 gx-mr-3">Liên hệ với chúng tôi:</p>
        <div>
          <Phone className="gx-mr-3" />
          <Email className="gx-mr-3" />
          <Web />
        </div>
      </div> */}
      <AppNotificationContainer loading={isLoading} />
    </PublicLayout>
  );
};

export default SignIn;
