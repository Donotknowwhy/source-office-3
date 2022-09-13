import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { PlusIcon } from '@assets/icons/PlusIcon';
import { UploadIcon } from '@assets/vendors/icons/Upload';
import ButtonCustom from '@components/Button';
import { DATE_DD_MM_YYYY, YYYY_MM_DD } from '@constants/commons';
import { getBase64 } from '@constants/function';
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Upload
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import {
  clearData,
  createStaffInformation,
  getAllBranch,
  getAllDepartment,
  getAllPosition,
  getAllUser,
  getShift
} from 'customApp/HRM/HRMManageAccount/slice';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { addRelationShip } from './HRMAddNew.helper';
const BASE_URL_IMG = process.env.REACT_APP_BASE_URL_IMG;

const { Option } = Select;

const { Panel } = Collapse;

const HRMManageAccountAddNew = ({
  title,
  modalVisible,
  onCancel,
  formValue,
  data,
  ...properties
}: any) => {
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const [defaultImg, setDefautImg] = useState([]);

  const [defaultUpload, setDefaultUpload] = useState([]);
  const [uploadState, setUploadState] = useState([]);

  const handleCloseForm = () => {
    if (onCancel) {
      onCancel();
    }
    dispatch(clearData({}));
  };

  useEffect(() => {
    if (data) {
      Object.keys(data).map((key) => {
        if (data[key] === null) {
        }
        if (key.includes('attachments')) {
          const convertJSON = JSON.parse(data[key]);
          if (convertJSON.length > 0) {
            const convertArrObj = convertJSON.map((item, index) => {
              return {
                url: `${BASE_URL_IMG}` + item,
                status: 'done',
                name: item
              };
            });
            setDefaultUpload(convertArrObj);
          }
        } else if (key.includes('avatar')) {
          setDefautImg([
            {
              url: `${BASE_URL_IMG}` + data[key],
              status: 'done',
              name: data[key],
              uid: _.uniqueId('key_')
            }
          ]);
        } else if (key.includes('relationship')) {
          if (data[key]) {
            const convertJSON = JSON.parse(data[key]);
            if (convertJSON.length > 0) {
              Object.keys(convertJSON[0]).forEach((key) => {
                form.setFields([
                  {
                    name: key,
                    value: convertJSON[0][key]
                  }
                ]);
              });
            }
          }
        } else if (moment(data[key], YYYY_MM_DD, true).isValid()) {
          if (data[key] !== null) {
            form.setFields([
              {
                name: key,
                value: moment(data[key]).format(YYYY_MM_DD)
              }
            ]);
          }
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
  }, [data]);

  const props = {
    multiple: true,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        info.file.status = 'done';
      }
      const arr = [];
      if (info.file.status === 'done') {
        info.fileList.map((item) => {
          getBase64(item.originFileObj, (beCard) => {
            arr.push(beCard);
          });

          form.setFieldsValue({
            attachments: {
              attachments: arr
            }
          });
        });
      }
    }
  };

  const propsUploadImg = {
    multiple: false,
    action: 'http://192.168.1.153/api/v3/desktop/hrm/uploadImg',
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      if (file.fileList.length === 2) {
        return false;
      }
    },
    onChange(info) {
      info.file.status = 'done';

      if (info.file.status !== 'uploading') {
      }
      getBase64(info.file, (beCard) => {
        form.setFieldsValue({
          avatar: beCard
        });
      });
      const arr = [];
      if (info.file.status === 'done') {
      }
    }
  };

  const [form] = useForm();

  const onFinish = (value) => {
    const obj = {} as any;

    const objAddRelationShip = {
      relationship: {}
    };

    Object.keys(value).map((key) => {
      if (value[key]) {
        if (key.includes('relation')) {
          objAddRelationShip.relationship[key] = value[key];
          delete value[key];
        } else {
          obj[key] = value[key];
        }
      }
    });

    obj.birth_day = moment(obj.birth_day).format(YYYY_MM_DD);
    obj.supply_date = moment(obj.supply_date).format(YYYY_MM_DD);
    const jsonObj = JSON.stringify([objAddRelationShip.relationship]);
    obj.relationship = jsonObj;
    obj.company_id = authState.company_id;

    obj.branch_id = parseInt(obj.branch_id);
    obj.attachments = JSON.stringify(obj.attachments);

    const mergeObj = { ...obj };

    dispatch(createStaffInformation(mergeObj));
  };

  const defaultOpen = formValue.map((item) => item.idParent);

  useEffect((): any => {
    const body = {
      branch_id: authState.branch_id
    };

    const bodyBranch = {
      status: 1,
      branch_id: authState.branch_id
    };

    dispatch(getAllPosition(body));
    dispatch(getAllUser(body));
    dispatch(getAllBranch(body));
    dispatch(getShift(body));
    // dispatch(getDepartment(bodyBranch));
    dispatch(getAllDepartment(bodyBranch));

    return () => {
      dispatch(clearData({}));
    };
  }, []);
  const disabledDate = (current: moment.Moment) => {
    return current.isAfter(new Date());
  };

  const handleBeforeUploadFile = (file) => {};

  const wrapperCol = {
    wrapperCol: {
      span: 22
    },
    labelCol: {
      span: 22
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  return (
    <div className="hrm-manage-account-add-new-form">
      <Modal
        title={title}
        visible={modalVisible}
        // onOk={handleOk}
        onCancel={handleCloseForm}
        width={1016}
        closable={false}
        className="form-task-modal"
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} {...wrapperCol}>
          {formValue &&
            formValue.map((item) => (
              <Collapse defaultActiveKey={defaultOpen}>
                <Panel header={item.title} key={item.idParent}>
                  <Row>
                    {item.detail.map((itemChild) => {
                      if (itemChild.type === 'dropdown') {
                        if (itemChild.options) {
                          return (
                            <Col span={12} key={itemChild.id}>
                              <Form.Item
                                name={itemChild.name}
                                label={itemChild.label}
                                {...itemChild.rulesItem}
                              >
                                <Select placeholder={itemChild.placeHolder}>
                                  {itemChild.options.map(
                                    (optionItems, index) => (
                                      <Option
                                        value={optionItems.id}
                                        key={index}
                                      >
                                        {optionItems.name}
                                      </Option>
                                    )
                                  )}
                                </Select>
                              </Form.Item>
                            </Col>
                          );
                        }
                      } else if (itemChild.type === 'datePicker') {
                        return (
                          <Col span={12}>
                            <Form.Item
                              name={itemChild.name}
                              label={itemChild.label}
                              {...itemChild.rulesItem}
                            >
                              <DatePicker
                                style={{ width: '100%' }}
                                format={DATE_DD_MM_YYYY}
                                placeholder={itemChild.placeHolder}
                                disabledDate={disabledDate}
                              />
                            </Form.Item>
                          </Col>
                        );
                      } else if (itemChild.type === 'radio') {
                        return (
                          <Col span={12}>
                            <Form.Item
                              name={itemChild.name}
                              label={itemChild.label}
                            >
                              <Radio.Group value={itemChild.options[0].name}>
                                {itemChild.options.map((optionRadio, index) => (
                                  <Radio value={optionRadio.name} key={index}>
                                    {optionRadio.name}
                                  </Radio>
                                ))}
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        );
                      } else if (itemChild.type === 'upload') {
                        return (
                          <Col span={12}>
                            <Form.Item
                              label={itemChild.label}
                              name={itemChild.name}
                            >
                              <Radio.Group>
                                <Upload
                                  name={itemChild.name}
                                  {...props}
                                  accept="image/*"
                                  // customRequest={dummyRequest}
                                  beforeUpload={(file) => true}

                                  // showUploadList={false}
                                >
                                  <Button
                                    icon={<UploadIcon />}
                                    type="primary"
                                    className="btn-upload"
                                    disabled={false}
                                  >
                                     Tải lên tệp đính kèm
                                  </Button>
                                </Upload>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        );
                      } else if (itemChild.type === 'img') {
                        return (
                          <Col span={12}>
                            <Form.Item
                              label="Ảnh đại diện"
                              name={itemChild.name}
                            >
                              <Radio.Group>
                                <Upload
                                  name={itemChild.name}
                                  {...propsUploadImg}
                                  accept="image/*"
                                  // customRequest={dummyRequest}
                                  // showUploadList={false}
                                >
                                  <Button
                                    icon={<UploadIcon />}
                                    type="primary"
                                    className="btn-upload"
                                    disabled={false}
                                  >
                                     Tải lên tệp đính kèm
                                  </Button>
                                </Upload>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        );
                      }
                      return (
                        <Col span={12}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <Input
                              type={itemChild?.typeInput}
                              placeholder={itemChild.placeHolder}
                            />
                          </Form.Item>
                        </Col>
                      );
                    })}
                  </Row>
                </Panel>
              </Collapse>
            ))}

          <div className="gx-d-flex gx-align-items-center gx-justify-content-start">
            <ButtonCustom
              value=""
              className="gx-ml-0"
              iconRight={<PlusIcon />}
              disableSpacingRight={true}
              MarginLeftButton={false}
            />
            <label>Thêm gia đình và người phụ thuộc </label>
          </div>

          <div className="gx-d-flex gx-justify-content-center btn-footer">
            <Button className="btn-cancel" onClick={handleCloseForm}>
              Hủy
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className="btn-ok"
              onClick={handleCloseForm}
            >
              Lưu
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default HRMManageAccountAddNew;
