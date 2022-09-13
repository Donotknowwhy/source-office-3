import { MinusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { Add } from '@assets/icons/Add';
import { UploadIcon } from '@assets/vendors/icons/Upload';
import {
  DATE_DD_MM_YYYY,
  DATE_FORMAT_EN_GB,
  YYYY_MM_DD
} from '@constants/commons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Upload
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { clearTest, getProductServiceByOne } from 'customApp/Crm/slice';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { gender, maritalStatus, relationShip } from './HRMAddNew.helper';

const BASE_URL_IMG = process.env.REACT_APP_BASE_URL_IMG;
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const getToken = localStorage.getItem('token');

const { Option } = Select;

export interface IFormDuplicateButtonBottom {
  nameForm?: string;
  title?: string;
  modalVisible: boolean;
  onCancel?: () => void;
  getValueForm?: (valueForm, name) => void;
  widthModal?: number;
  colSpan?: number;
  data?: any;
  dataAttachments?: any;
  dataAvatar?: any;
}

const FormEditHRM = ({
  dataAvatar,
  dataAttachments,
  nameForm,
  title,
  modalVisible,
  onCancel,
  getValueForm,
  widthModal = 1016,
  colSpan = 12,
  data,
  ...properties
}: IFormDuplicateButtonBottom) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('Có');

  const HRMSlice = useAppSelector((state) => state.HRMSlice) as any;

  const {
    getAllBranchData,
    getAllPositionData,
    allUserData,
    shiftData,
    getDepartmentData
  } = HRMSlice;
  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const [defaultValue, setValueDefault] = useState();

  const [stateKey, setKey] = useState(0);
  const [defaultUpload, setDefaultUpload] = useState([]);

  useEffect(() => {
    if (data) {
      Object.keys(data).map((key) => {
        if (data[key] === null) {
        }
        if (moment(data[key], 'YYYY-MM-DD', true).isValid()) {
          form.setFields([
            {
              name: key,
              value: moment(data[key])
            }
          ]);
        } else if (key === 'relationship' && data[key]) {
          const convertJSONMapKEy = JSON.parse(data[key]);
          form.setFieldsValue({
            [key]: convertJSONMapKEy
          });
        } else {
          form.setFields([
            {
              name: key,
              value: data[key]
            }
          ]);
        }
      });
    }
    return () => {
      dispatch(clearTest({}));
    };
  }, [data]);

  const props = {
    multiple: true,
    action: `${REACT_APP_BASE_URL}hrm/updateFile`,
    headers: {
      Authorization: `Bearer ${getToken}`
    },

    defaultFileList: dataAttachments,
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
        if (info.fileList.length > 0) {
          const getFileList = info.fileList.map((item, index) => {
            if (item?.response) {
              return {
                uid: _.uniqueId('key_'),
                name: item.name,
                url: item.response.data,
                status: item.status
              };
            } else {
              return {
                ...item
              };
            }
          });

          const convertJSON = JSON.stringify(getFileList);
          form.setFieldsValue({ attachments: convertJSON });
        }
      }
    }
  };

  const propImg = {
    multiple: true,
    action: `${REACT_APP_BASE_URL}hrm/updateAvatar`,
    headers: {
      Authorization: `Bearer ${getToken}`
    },
    defaultFileList: dataAvatar,

    onChange(info) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
        if (info.fileList.length > 0) {
          const getFileList = info.fileList.map((item, index) => {
            return {
              uid: _.uniqueId('key_id'),
              name: item.response.data,
              url: `${BASE_URL_IMG}` + item.response.data,
              status: item.status
            };
          });
          setDefaultUpload(getFileList);

          const convertJSON = JSON.stringify(getFileList);
          form.setFieldsValue({ avatar: convertJSON });
        }
      }
    }
  };

  const [form] = useForm();

  const onFinish = (value) => {
    if (value.relationship) {
    }
    const cloneObj = {} as any;
    Object.keys(value).map((key) => {
      if (value[key]) {
        if (key.includes('date') || key.includes('birth_day')) {
          cloneObj[key] = moment(value[key]).format(YYYY_MM_DD);
        } else if (
          key.includes('service_products') ||
          key.includes('payment_information') ||
          key.includes('relationship')
        ) {
          if (key.includes('date')) {
            cloneObj[key] = moment(value[key]).format(YYYY_MM_DD);
          }
          cloneObj[key] = JSON.stringify(value[key]);
        } else {
          cloneObj[key] = value[key];
        }
      }
    });

    if (getValueForm) {
      getValueForm(cloneObj, nameForm);
    }
  };

  const onChangeRadio = (e) => {
    setValue(e.target.value);
  };

  const handleValueChangeSelect = (value, key) => {
    setValueDefault(value);
    setKey(key);
  };

  const beforeUploadImgAvatar = (file) => {
    const fileName: string = file.name.toLowerCase();
    const isJpgOrPng =
      (file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg') &&
      (fileName.endsWith('.jpeg') ||
        fileName.endsWith('.png') ||
        fileName.endsWith('.jpg'));
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M || !isJpgOrPng) {
      form.setFields([
        {
          name: 'avatar',
          errors: [
            'Ảnh upload lên chỉ có thể là JPEG,JPG,PNG và kích thước không vượt quá 2MB'
          ]
        }
      ]);
    }
    return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE;
  };

  useEffect(() => {
    if (defaultValue) {
      dispatch(
        getProductServiceByOne({
          code: defaultValue
        })
      );
    }
  }, [defaultValue]);

  return (
    <div className="hrm-manage-account-add-new-form">
      <Modal
        title={title}
        visible={modalVisible}
        onCancel={onCancel}
        width={widthModal} //1016
        closable={false}
        className="form-task-modal"
        footer={null}
      >
        <Form
          form={form}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            relationship: [
              {
                relationship: 'Bố',
                relation_name: '',
                relation_birth_day: '',
                service_name: '',
                relation_work: '',
                relation_phone: '',
                relation_status: 'Có'
              }
            ]
          }}
        >
          <Row gutter={[30, 0]}>
            <Col span={11}>
              <Form.Item
                label="Thông tin cá nhân"
                name="avatar"
                className=" gx-d-block"
              >
                <Radio.Group>
                  <Upload
                    name={'avatar'}
                    {...propImg}
                    accept="image/*"
                    // accept="application/vnd.ms-excel"
                    beforeUpload={beforeUploadImgAvatar}
                    maxCount={1}
                  >
                    <Button
                      icon={<UploadIcon />}
                      type="primary"
                      className="btn-upload"
                      // disabled={true}
                    >
                       Tải lên ảnh đại diện
                    </Button>
                  </Upload>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Mã nhân viên"
                name="staff_code"
                className=" gx-d-block"
              >
                <Input readOnly className="gx-input-view-only" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Họ và tên"
                name="staff_name"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Giới tính"
                name="gender"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Select placeholder="Nhập giới tính">
                  {gender.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Ngày sinh"
                name="birth_day"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <DatePicker
                  placeholder="Nhập ngày sinh"
                  style={{ width: '100%' }}
                  format={DATE_FORMAT_EN_GB}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Input placeholder="Nhập số điện thoại" type={'number'} />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Email"
                name="email"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Tình trạng hôn nhân"
                name="marital_status"
                className=" gx-d-block"
              >
                <Select placeholder="Nhập tình trạng kết hôn">
                  {maritalStatus.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Địa chỉ thường trú"
                name="permanent_address"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Input placeholder="Nhập địa chỉ thường trú" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Địa chỉ tạm trú"
                name="temporary_address"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Input placeholder="Nhập địa chỉ tạm trú" />
              </Form.Item>
            </Col>
          </Row>
          {/* tt phap ly */}
          <p>Thông tin pháp lý</p>
          <Row gutter={[30, 0]}>
            <Col span={11}>
              <Form.Item
                label="Số CCCD/CMND"
                name="id_card"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Input placeholder="Nhập số CCCD/CMND" type={'number'} />

                {/* <Select placeholder="Nhập số CCCD/CMND">
                  {JSONbank.map((option) => (
                    <Option value={option.value}>{option.name}</Option>
                  ))}
                </Select> */}
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Ngày cấp"
                name="supply_date"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <DatePicker
                  placeholder="Nhập ngày cấp"
                  style={{ width: '100%' }}
                  format={DATE_FORMAT_EN_GB}
                />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item
                label="Nơi cấp"
                name="provide_address"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Input placeholder="Nhập nơi cấp" />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item
                label="Mã số thuế"
                name="tax_code"
                className=" gx-d-block"
              >
                <Input placeholder="Nhập mã số thuế" />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item
                label="Số BHXH"
                name="insurance_code"
                className=" gx-d-block"
              >
                <Input type={'number'} placeholder="Nhập mã số BHXH" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Tệp đính kèm"
                name="attachments"
                className=" gx-d-block"
              >
                <Radio.Group>
                  <Upload
                    name={'attachments'}
                    {...props}
                    accept="image/*"
                    beforeUpload={(file) => {
                      return true;
                    }}
                  >
                    <Button
                      icon={<UploadIcon />}
                      type="primary"
                      className="btn-upload"
                      // disabled={true}
                    >
                       Tải lên tệp đính kèm
                    </Button>
                  </Upload>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <p>Thông tin công việc</p>

          <Row gutter={[30, 0]}>
            <Col span={11}>
              <Form.Item
                label="Chi nhánh"
                name="branch_id"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Select placeholder="Nhập Chi nhánh">
                  {getAllBranchData.map((option, index) => (
                    <Option value={option.id} key={index}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Phòng ban"
                name="department_id"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Select placeholder="Nhập phòng ban">
                  {getDepartmentData.map((option, index) => (
                    <Option value={option.id} key={index}>
                      {option.department_name || option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Chức vụ"
                name="position_id"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Select placeholder="Nhập Chức vụ">
                  {getAllPositionData.map((option, index) => (
                    <Option value={option.id} key={index}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Quản lý trực tiếp"
                name="manager_id"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Select placeholder="Nhập quản lý trực tiếp">
                  {allUserData.map((option, index) => (
                    <Option value={option.id} key={index}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Ca làm việc"
                name="shift_id"
                className=" gx-d-block"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                ]}
              >
                <Select placeholder="Nhập ca làm việc">
                  {shiftData.map((option, index) => (
                    <Option value={option.id} key={index}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="relationship">
            {(fields, { add, remove }) => (
              <Row gutter={[30, 0]}>
                {fields.map(({ key, name, ...restField }) => (
                  <Col span={24} key={key} style={{}}>
                    <p>Gia đình và người phụ thuộc </p>
                    <Row gutter={[30, 0]} className="111">
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Mối quan hệ"
                          name={[name, 'relationship']}
                          className="gx-d-block"
                        >
                          <Select placeholder="Nhập mối quan hệ">
                            {relationShip.map((item) => (
                              <Option value={item.value} key={item.id}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Họ và tên"
                          name={[name, 'relation_name']}
                          className="gx-d-block"
                        >
                          <Input placeholder="Nhập họ và tên" />
                        </Form.Item>
                      </Col>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Năm Sinh"
                          name={[name, 'relation_birth_day']}
                          className="gx-d-block"
                        >
                          <Input placeholder="Nhập năm Sinh" />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Nghề nghiệp"
                          name={[name, 'relation_work']}
                          className="gx-d-block"
                        >
                          <Input placeholder="Nhập nghề nghiệp" />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Số điện thoại"
                          name={[name, 'relation_phone']}
                          className="gx-d-block"
                        >
                          <Input
                            placeholder="Nhập số điện thoại"
                            type={'number'}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Người phụ thuộc"
                          name={[name, 'relation_status']}
                          className="gx-d-block"
                        >
                          <Radio.Group value={value} onChange={onChangeRadio}>
                            <Radio value="Có">Có</Radio>
                            <Radio value="Không">Không</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                ))}
                <Col>
                  <Form.Item>
                    <div className="gx-d-flex gx-align-items-center">
                      <div className="gx-pointer-cursor" onClick={() => add()}>
                        {<Add />}
                      </div>

                      <span className="gx-ml-2">
                        Thêm gia đình và người phụ thuộc
                      </span>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Form.List>

          <div className="gx-d-flex gx-justify-content-center">
            <Button style={{ width: '110px' }} onClick={() => onCancel()}>
              Hủy
            </Button>
            <Button type="primary" style={{ width: '110px' }} htmlType="submit">
              Xác nhân
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FormEditHRM;
