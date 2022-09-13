import { UploadIcon } from '@assets/vendors/icons/Upload';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload
} from '@components/uielements';
import { DATE_FORMAT } from '@constants/commons';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';

const { Option } = Select;

export enum modalTaskMode {
  // Dự án
  PROJECT_ADD_PROJECT, // Thêm dự án
  PROJECT_VIEW_INFO, // Xem thông tin dự án
  PROJECT_EDIT_TASK, // Sửa thông tin task
  PROJECT_ADD_WORKING, // Thêm công việc
  PROJECT_ADD_SUB_TASK, // Thêm sub task
  // Cá nhân
  PERSON_EDIT_SUB_TASK, // Sửa thông tin sub task
  PERSON_ADD_SUB_TASK, // Thêm sub task
  PERSON_VIEW_DETAIL_WORKING, // Xem chi tiết công việc cá nhân
  PERSON_VIEW_WORKING // Xem công việc cá nhân
}

type IProps = {
  mode: number;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
};

const FormTaskModal: React.FC<IProps> = ({
  mode,
  isModalVisible,
  setIsModalVisible
}) => {
  const [form] = useForm();

  const formItemLayout = {
    labelCol: { span: 22 },
    wrapperCol: { span: 22 }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setIsModalVisible(false);
  };

  const renderContent = () => {
    switch (mode) {
      case modalTaskMode.PROJECT_ADD_PROJECT || modalTaskMode.PROJECT_VIEW_INFO:
        return {
          name: ['projectName', 'projectDes', 'manager', 'member', 'progress'],
          label: [
            'Tên dự án',
            'Mô tả dự án',
            'Quản lý dự án',
            'Thành viên tham gia',
            'Tiến độ (%)'
          ],
          placeholder: [
            'Nhập tên dự án',
            'Nhập mô tả dự án',
            'Chọn quản lý',
            'Chọn thành viên tham gia',
            'Nhập tiến độ'
          ]
        };
      default:
        return {
          name: ['workingName', 'workingDes', 'asignee', 'performer', 'time'],
          label: [
            'Tên công việc',
            'Mô tả công việc',
            'Người giao',
            'Người thực hiện',
            'Thời gian ước tính (đơn vị giờ)'
          ],
          placeholder: [
            'Nhập tên công việc',
            'Nhập mô tả công việc',
            'Chọn người giao',
            'Chọn người thực hiện',
            'Nhập thời gian ước tính'
          ]
        };
    }
  };

  const renderTitle = () => {
    switch (mode) {
      case modalTaskMode.PROJECT_ADD_PROJECT:
        return 'Thêm dự án';
      case modalTaskMode.PROJECT_VIEW_INFO:
        return 'Xem thông tin dự án';
      case modalTaskMode.PROJECT_EDIT_TASK:
        return 'Sửa thông tin task';
      case modalTaskMode.PROJECT_ADD_WORKING:
        return 'Thêm task mới';
      case modalTaskMode.PROJECT_ADD_SUB_TASK:
        return 'Thêm sub task mới';
      case modalTaskMode.PERSON_EDIT_SUB_TASK:
        return 'Sửa thông tin sub task';
      case modalTaskMode.PERSON_ADD_SUB_TASK:
        return 'Thêm sub task';
      case modalTaskMode.PERSON_VIEW_DETAIL_WORKING:
        return 'Xem chi tiết công việc cá nhân';
      case modalTaskMode.PERSON_VIEW_WORKING:
        return 'Xem công việc cá nhân';
    }
  };

  // upload props
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <Modal
      title={renderTitle()}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
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
        <Row justify="space-between">
          <Col span={12}>
            <Form.Item
              name={renderContent()?.name[0]}
              label={renderContent()?.label[0]}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đầy đủ thông tin'
                }
              ]}
            >
              <Input
                placeholder={renderContent().placeholder[0]}
                disabled={
                  mode === modalTaskMode.PROJECT_VIEW_INFO ||
                  mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                  mode === modalTaskMode.PERSON_VIEW_WORKING
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={renderContent()?.name[1]}
              label={renderContent()?.label[1]}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đẩy đủ thông tin'
                }
              ]}
            >
              <Input
                placeholder={renderContent().placeholder[1]}
                disabled={
                  mode === modalTaskMode.PROJECT_VIEW_INFO ||
                  mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                  mode === modalTaskMode.PERSON_VIEW_WORKING
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={renderContent()?.name[2]}
              label={renderContent()?.label[2]}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đẩy đủ thông tin'
                }
              ]}
            >
              <Select
                placeholder={renderContent().placeholder[2]}
                disabled={
                  mode === modalTaskMode.PROJECT_VIEW_INFO ||
                  mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                  mode === modalTaskMode.PERSON_VIEW_WORKING
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={renderContent().name[3]}
              label={renderContent().label[3]}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đẩy đủ thông tin'
                }
              ]}
            >
              <Select
                placeholder={renderContent().placeholder[3]}
                disabled={
                  mode === modalTaskMode.PROJECT_VIEW_INFO ||
                  mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                  mode === modalTaskMode.PERSON_VIEW_WORKING
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status" label="Trạng thái">
              <Select
                placeholder="Chọn trạng thái"
                disabled={
                  mode === modalTaskMode.PROJECT_VIEW_INFO ||
                  mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                  mode === modalTaskMode.PERSON_VIEW_WORKING
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priority"
              label="Mức độ ưu tiên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đẩy đủ thông tin'
                }
              ]}
            >
              <Select
                placeholder="Chọn mức độ ưu tiên"
                disabled={
                  mode === modalTaskMode.PROJECT_VIEW_INFO ||
                  mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                  mode === modalTaskMode.PERSON_VIEW_WORKING
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </Col>
          {mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ? (
            ''
          ) : (
            <Col span={12}>
              <Form.Item
                name={renderContent().name[4]}
                label={renderContent().label[4]}
              >
                <Input
                  placeholder={renderContent().placeholder[4]}
                  disabled={
                    mode === modalTaskMode.PROJECT_VIEW_INFO ||
                    mode === modalTaskMode.PERSON_VIEW_WORKING
                  }
                />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item name="createdTime" label="Ngày tạo">
              <DatePicker
                style={{ width: '100%' }}
                format={DATE_FORMAT}
                placeholder="Chọn ngày tạo"
                disabled={
                  mode === modalTaskMode.PROJECT_VIEW_INFO ||
                  mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                  mode === modalTaskMode.PERSON_VIEW_WORKING
                }
              />
            </Form.Item>
          </Col>
          {mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ? (
            ''
          ) : (
            <Col span={12}>
              <Form.Item name="startedTime" label="Ngày bắt đầu">
                <DatePicker
                  style={{ width: '100%' }}
                  format={DATE_FORMAT}
                  placeholder="Chọn ngày bắt đầu"
                  disabled={
                    mode === modalTaskMode.PROJECT_VIEW_INFO ||
                    mode === modalTaskMode.PERSON_VIEW_WORKING
                  }
                />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item
              name="deadline"
              label="Deadline"
              rules={[{ required: true }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format={DATE_FORMAT}
                placeholder="Chọn deadline"
                disabled={
                  mode === modalTaskMode.PROJECT_VIEW_INFO ||
                  mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                  mode === modalTaskMode.PERSON_VIEW_WORKING
                }
              />
            </Form.Item>
          </Col>
          {mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ? (
            ''
          ) : (
            <Col span={12}>
              <Form.Item name="completedTime" label="Ngày hoàn thành">
                <DatePicker
                  style={{ width: '100%' }}
                  format={DATE_FORMAT}
                  placeholder="Chọn ngày hoàn thành"
                  disabled={
                    mode === modalTaskMode.PROJECT_VIEW_INFO ||
                    mode === modalTaskMode.PERSON_VIEW_WORKING
                  }
                />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item
              name="link"
              label="Liên kết"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đẩy đủ thông tin'
                }
              ]}
            >
              <Input
                placeholder="Nhập liên kết"
                disabled={
                  mode === modalTaskMode.PROJECT_VIEW_INFO ||
                  mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                  mode === modalTaskMode.PERSON_VIEW_WORKING
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="file" label={' '}>
              <Upload {...props}>
                <Button
                  icon={<UploadIcon />}
                  type="primary"
                  className="btn-upload"
                  disabled={
                    mode === modalTaskMode.PROJECT_VIEW_INFO ||
                    mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                    mode === modalTaskMode.PERSON_VIEW_WORKING
                  }
                >
                   Tải lên tệp đính kèm
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          {mode === modalTaskMode.PROJECT_ADD_WORKING ||
          mode === modalTaskMode.PERSON_ADD_SUB_TASK ? (
            <Col span={12}>
              <Form.Item
                name="priority"
                label="Loại task"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đẩy đủ thông tin'
                  }
                ]}
              >
                <Select placeholder="Chọn loại task">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
          ) : (
            ''
          )}
          <Col span={24}>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox
                disabled={
                  mode === modalTaskMode.PROJECT_VIEW_INFO ||
                  mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
                  mode === modalTaskMode.PERSON_VIEW_WORKING
                }
              >
                Thêm vào Calendar
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <div className="gx-d-flex gx-justify-content-center btn-footer">
          <Button className="btn-cancel" onClick={handleCancel}>
            Hủy
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            className="btn-ok"
            disabled={
              mode === modalTaskMode.PROJECT_VIEW_INFO ||
              mode === modalTaskMode.PERSON_VIEW_DETAIL_WORKING ||
              mode === modalTaskMode.PERSON_VIEW_WORKING
            }
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FormTaskModal;
