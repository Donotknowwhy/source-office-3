import { Button, Form, Modal, Select } from '@components/uielements';
import { useForm } from 'antd/lib/form/Form';
import AddProject from './Project/AddProject';
import EditTask from './Project/EditTask';

export enum modalTaskMode {
  // Dự án
  PROJECT_ADD_PROJECT, // Thêm dự án
  PROJECT_VIEW_INFO, // Xem thông tin dự án
  PROJECT_EDIT_TASK, // Sửa thông tin task
  PROJECT_ADD_WORKING, // Thêm công việc
  PROJECT_ADD_SUB_TASK, // Thêm sub task
  // Cá nhân
  PERSON_EDIT_SUB_TASK, // Sửa thông tin sub task
  PERSON_ADD_WORKING, // Thêm công việc cá nhân
  PERSON_EDIT_DETAIL_TASK, // Sửa thông tin chi tiết task
  PERSON_ADD_SUB_TASK, // Thêm sub task
  PERSON_VIEW_DETAIL_WORKING, // Xem chi tiết công việc cá nhân
  PERSON_VIEW_WORKING // Xem công việc cá nhân
}

type IProps = {
  mode: number;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
};

const FormTaskModal2: React.FC<IProps> = ({
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

  const renderFormItem = () => {
    switch (mode) {
      case modalTaskMode.PROJECT_ADD_PROJECT:
        return <AddProject />;
      case modalTaskMode.PROJECT_VIEW_INFO:
        return <AddProject isViewInfo={true} />;
      case modalTaskMode.PROJECT_EDIT_TASK:
        return <EditTask />;
      case modalTaskMode.PROJECT_ADD_WORKING:
        return <EditTask isAddWorking={true} />;
      case modalTaskMode.PERSON_ADD_WORKING:
        return <EditTask />;
      case modalTaskMode.PERSON_ADD_SUB_TASK:
        return <EditTask />;
      case modalTaskMode.PERSON_VIEW_DETAIL_WORKING:
        return <EditTask isViewWorking={true} />;
      case modalTaskMode.PERSON_VIEW_WORKING:
        return <EditTask />;
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
        {renderFormItem()}
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

export default FormTaskModal2;
