import { UploadIcon } from '@assets/vendors/icons/Upload';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload
} from '@components/uielements';
import { DATE_FORMAT } from '@constants/commons';

const { Option } = Select;

type IProps = {
  isViewInfo?: boolean;
};

const AddProject: React.FC<IProps> = ({ isViewInfo = false }) => {
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
    <Row justify="space-between">
      <Col span={12}>
        <Form.Item
          name="projectName"
          label="Tên dự án"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]}
        >
          <Input placeholder="Nhập tên dự án" disabled={isViewInfo} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="projectDes"
          label="Mô tả dự án"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]}
        >
          <Input placeholder="Nhập mô tả dự án" disabled={isViewInfo} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="manager"
          label="Quản lý dự án"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đẩy đủ thông tin'
            }
          ]}
        >
          <Select placeholder="Chọn quản lý" disabled={isViewInfo}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="member"
          label="Thành viên tham gia"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đẩy đủ thông tin'
            }
          ]}
        >
          <Select placeholder="Chọn quản lý" disabled={isViewInfo}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="status" label="Trạng thái">
          <Select placeholder="Chọn trạng thái" disabled={isViewInfo}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="priority" label="Mức độ ưu tiên">
          <Select placeholder="Chọn mức độ ưu tiên" disabled={isViewInfo}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="progress" label="Nhập tiến độ">
          <Input placeholder="Nhập tiến độ (%)" disabled={isViewInfo} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="createdTime" label="Ngày tạo">
          <DatePicker
            style={{ width: '100%' }}
            format={DATE_FORMAT}
            placeholder="Chọn ngày tạo"
            disabled={isViewInfo}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="startedTime" label="Ngày bắt đầu">
          <DatePicker
            style={{ width: '100%' }}
            format={DATE_FORMAT}
            placeholder="Chọn ngày bắt đầu"
            disabled={isViewInfo}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="deadline" label="Deadline">
          <DatePicker
            style={{ width: '100%' }}
            format={DATE_FORMAT}
            placeholder="Chọn deadline"
            disabled={isViewInfo}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="completedTime" label="Ngày hoàn thành">
          <DatePicker
            style={{ width: '100%' }}
            format={DATE_FORMAT}
            placeholder="Chọn ngày hoàn thành"
            disabled={isViewInfo}
          />
        </Form.Item>
      </Col>
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
          <Input placeholder="Nhập liên kết" disabled={isViewInfo} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="file" label={' '}>
          <Upload {...props}>
            <Button
              icon={<UploadIcon />}
              type="primary"
              className="btn-upload"
              disabled={isViewInfo}
            >
               Tải lên tệp đính kèm
            </Button>
          </Upload>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AddProject;
