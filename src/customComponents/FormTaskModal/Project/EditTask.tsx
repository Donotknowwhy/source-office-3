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
  isAddWorking?: boolean;
  isViewWorking?: boolean;
};

const EditTask: React.FC<IProps> = ({
  isAddWorking = false,
  isViewWorking = false
}) => {
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
          name="workingName"
          label="Tên công việc"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]}
        >
          <Input placeholder="Nhập tên công việc" disabled={isViewWorking} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="workingDes"
          label="Mô tả công việc"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]}
        >
          <Input placeholder="Nhập mô tả công việc" disabled={isViewWorking} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="asignee"
          label="Người giao"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đẩy đủ thông tin'
            }
          ]}
        >
          <Select placeholder="Chọn người giao" disabled={isViewWorking}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="performer"
          label="Người thực hiện"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đẩy đủ thông tin'
            }
          ]}
        >
          <Select placeholder="Chọn người thực hiện" disabled={isViewWorking}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="status" label="Trạng thái">
          <Select placeholder="Chọn trạng thái" disabled={isViewWorking}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="priority" label="Mức độ ưu tiên">
          <Select placeholder="Chọn mức độ ưu tiên" disabled={isViewWorking}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="time" label="Thời gian ước tính (đơn vị giờ)">
          <Input
            placeholder="Nhập thời gian ước tính"
            disabled={isViewWorking}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="createdTime" label="Ngày tạo">
          <DatePicker
            style={{ width: '100%' }}
            format={DATE_FORMAT}
            placeholder="Chọn ngày tạo"
            disabled={isViewWorking}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="startedTime" label="Ngày bắt đầu">
          <DatePicker
            style={{ width: '100%' }}
            format={DATE_FORMAT}
            placeholder="Chọn ngày bắt đầu"
            disabled={isViewWorking}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="deadline" label="Deadline">
          <DatePicker
            style={{ width: '100%' }}
            format={DATE_FORMAT}
            placeholder="Chọn deadline"
            disabled={isViewWorking}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="completedTime" label="Ngày hoàn thành">
          <DatePicker
            style={{ width: '100%' }}
            format={DATE_FORMAT}
            placeholder="Chọn ngày hoàn thành"
            disabled={isViewWorking}
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
          <Input placeholder="Nhập liên kết" disabled={isViewWorking} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="file" label={' '}>
          <Upload {...props}>
            <Button
              icon={<UploadIcon />}
              type="primary"
              className="btn-upload"
              disabled={isViewWorking}
            >
               Tải lên tệp đính kèm
            </Button>
          </Upload>
        </Form.Item>
      </Col>
      {isAddWorking ? (
        <Col span={12}>
          <Form.Item name="taskType" label="Loại task">
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
    </Row>
  );
};

export default EditTask;
