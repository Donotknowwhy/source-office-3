import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select
} from '@components/uielements';
import { useForm } from 'antd/lib/form/Form';

const { Option } = Select;
const FormBusiness = ({ isModalVisible, setIsModalVisible }) => {
  const [form] = useForm();

  const formItemLayout = {
    labelCol: { span: 22 },
    wrapperCol: { span: 22 }
  };

  const onFinish = (values) => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Tạo cơ hội kinh doanh"
      visible={isModalVisible}
      onOk={() => {
        setIsModalVisible(false);
      }}
      onCancel={() => {
        setIsModalVisible(false);
      }}
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
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name="nameBusiness"
              label="Tên cơ hội kinh doanh"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đầy đủ thông tin'
                }
              ]}
            >
              <Input placeholder="Nhập tên cơ hội kinh doanh" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nameCustomer"
              label="Tên khách hàng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đầy đủ thông tin'
                }
              ]}
            >
              <Input placeholder="Nhập tên khách hàng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="value"
              label="Giá trị(đơn vị VNĐ)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đầy đủ thông tin'
                }
              ]}
            >
              <Input placeholder="Nhập giá trị" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đầy đủ thông tin'
                }
              ]}
            >
              <Select placeholder="Chọn quản lý">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <div className="gx-d-flex gx-justify-content-center btn-footer">
          <Button className="btn-cancel" onClick={handleCancel}>
            Hủy
          </Button>
          <Button htmlType="submit" type="primary" className="btn-ok">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FormBusiness;
