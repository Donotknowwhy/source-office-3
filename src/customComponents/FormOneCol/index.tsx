import { selectAuthState } from '@appRedux/Authslice';
import { useAppSelector } from '@appRedux/hooks';
import { Button, Form, Input, Modal, Select } from '@components/uielements';
import { DATE_TIME_HISTORY_FORMAT } from '@constants/commons';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createHistorySupportById,
  getHistorySupport,
  getHistorySupportCustomer,
  selectCrmState,
  updateHistorySupportById
} from './../../customApp/Crm/slice';

const { Option } = Select;

type IProps = {
  title: string;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  listFields: {
    type: string;
    name: string;
    label: string;
    children?: { name: string; value: number }[];
    require: boolean;
  }[];
  mode?: string;
  data?: any;
};

const FormOneCol: React.FC<IProps> = ({
  title,
  isModalVisible,
  setIsModalVisible,
  listFields,
  mode,
  data
}) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const { currentUser } = useAppSelector(selectAuthState);
  const { careHistoryType, dataCommonById, dataCustomerById } =
    useAppSelector(selectCrmState);
  const pathname = useAppSelector(({ common }) => common.pathname);

  const onFinish = async (values) => {
    if (mode === 'edit') {
      await dispatch(
        updateHistorySupportById({
          ...values,
          care_time: moment().format(DATE_TIME_HISTORY_FORMAT),
          staff_id: currentUser?.staff?.id,
          data_management_id:
            pathname === '/crm/manage-data'
              ? dataCommonById[0]?.id
              : dataCustomerById[0]?.id,
          care_history_id: data?.id
        })
      );
    } else if (mode === 'add') {
      await dispatch(
        createHistorySupportById({
          ...values,
          care_time: moment().format(DATE_TIME_HISTORY_FORMAT),
          staff_id: currentUser?.staff?.id,
          data_management_id:
            pathname === '/crm/manage-data'
              ? dataCommonById[0]?.id
              : dataCustomerById[0]?.id
        })
      );
      await form.resetFields();
    }
    await setIsModalVisible(false);
    if (pathname === '/crm/manage-data') {
      await dispatch(
        getHistorySupport({ data_management_id: dataCommonById[0]?.id })
      );
    } else {
      await dispatch(
        getHistorySupportCustomer({
          data_management_id: dataCustomerById[0]?.id
        })
      );
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      care_type_name: data?.care_type_name,
      care_content: data?.care_content
    });
  }, [form, data?.care_type_name, data?.care_content]);

  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      width={520}
      closable={false}
      className="form-task-modal form-history-support"
      footer={null}
    >
      <Form onFinish={onFinish} form={form} layout="vertical">
        {listFields &&
          listFields.map((field, index) => {
            return (
              <Form.Item
                name={field.name}
                label={field.label}
                rules={
                  field.require
                    ? [
                        {
                          required: true,
                          message: 'Vui lòng nhập đầy đủ thông tin'
                        }
                      ]
                    : null
                }
                key={index}
              >
                {field.type === 'input' ? (
                  <Input placeholder="Nhập nội dung" />
                ) : (
                  <Select>
                    {careHistoryType?.map((item, index) => {
                      return (
                        <Option value={item?.care_type_name} key={item?.id}>
                          {item?.care_type_name}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            );
          })}
        <div className="gx-d-flex gx-justify-content-center btn-footer">
          <Button
            className="btn-cancel"
            onClick={() => setIsModalVisible(false)}
          >
            Hủy
          </Button>
          <Button htmlType="submit" type="primary" className="btn-ok">
            {mode === 'add' ? 'Thêm' : 'Sửa'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FormOneCol;
