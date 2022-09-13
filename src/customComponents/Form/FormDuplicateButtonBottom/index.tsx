import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useAppDispatch } from '@appRedux/hooks';
import { UploadIcon } from '@assets/vendors/icons/Upload';
import ButtonCustom from '@components/Button';
import { YYYY_MM_DD } from '@constants/commons';
import { getBase64 } from '@constants/function';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  TimePicker,
  Upload
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { getProductServiceByOne } from 'customApp/Crm/slice';
import { PickerColor } from 'customComponents/PickerColor';
import moment from 'moment';
import { useEffect, useState } from 'react';

const { Option } = Select;

export interface IFormDuplicateButtonBottom {
  nameForm?: string;
  title?: string;
  modalVisible: boolean;
  onCancel?: () => void;
  formValue: any;
  getValueForm?: (valueForm, name) => void;
  widthModal?: number;
  colSpan?: number;
  data?: any;
  test?: any;
  handleDuplicate: (nameButtonDuplicate, name) => void;
}

const FormDuplicateButtonBottom = ({
  nameForm,
  title,
  modalVisible,
  onCancel,
  formValue,
  getValueForm,
  widthModal = 1016,
  colSpan = 12,
  data,
  handleDuplicate,
  test,
  ...properties
}: IFormDuplicateButtonBottom) => {
  const dispatch = useAppDispatch();

  const [idSelected, setIdSelected] = useState();

  const [color, setColor] = useState('green');

  const [uploadState, setUploadState] = useState([]);
  const [defaultUpload, setDefaultUpload] = useState([]);

  useEffect(() => {
    if (data) {
      Object.keys(data).map((key) => {
        if (key.includes('attachments')) {
          const convertJSON = JSON.parse(data[key]);
          if (convertJSON.length > 0) {
            const convertArrObj = convertJSON.map((item, index) => {
              return {
                url: item,
                status: 'done',
                name: `test ${index}`
              };
            });
            setDefaultUpload(convertArrObj);
          }
        } else if (moment(data[key], 'YYYY-MM-DD', true).isValid()) {
          form.setFields([
            {
              name: key,
              value: moment(data[key])
            }
          ]);
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
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    FileList: defaultUpload,
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }

      const arr = [];
      if (info.file.status === 'done') {
        info.fileList.map((item) => {
          getBase64(item.originFileObj, (beCard) => {
            arr.push(beCard);
          });
        });
        form.setFieldsValue({
          attachments: {
            attachments: arr
          }
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  const propsImg = {
    name: 'file',
    action: 'http://192.168.1.153/api/v3/desktop/hrm/uploadImg',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        info.file.status = 'done';
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (beCard) => {
          form.setFieldsValue({
            avatar: beCard
          });
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const [form] = useForm();

  const onFinish = (value) => {
    const cloneObj = {} as any;

    Object.keys(value).map((key) => {
      if (value[key]) {
        if (key.includes('date')) {
          cloneObj[key] = moment(value[key]).format(YYYY_MM_DD);
        } else {
          cloneObj[key] = value[key];
        }
      }
    });

    if (cloneObj?.attachments) {
      cloneObj.attachments = JSON.stringify(cloneObj.attachments);
    }

    if (getValueForm) {
      getValueForm(cloneObj, nameForm);
    }
  };

  const handleGetValueColor = (color, name) => {
    if (color) {
      setColor(color.hex);
      form.setFieldsValue({
        [name]: color.hex
      });
    }
  };
  const disabledDate = (current: moment.Moment) => {
    return current.isAfter(new Date());
  };

  const wrapperCol = {
    wrapperCol: {
      span: 22
    },
    labelCol: {
      span: 22
    }
  };

  useEffect(() => {
    if (idSelected) {
      dispatch(
        getProductServiceByOne({
          code: idSelected
        })
      );
    }
  }, [idSelected]);

  const handleClickOptions = (id) => {
    if (id) setIdSelected(id);
  };

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
        <Form form={form} layout="vertical" onFinish={onFinish} {...wrapperCol}>
          {formValue &&
            formValue.map((item) => (
              <div>
                <div>{item?.title}</div>
                <Row>
                  {item.delete && <span>X</span>}
                  {item.detail.map((itemChild) => {
                    if (itemChild.type === 'dropdown') {
                      if (itemChild.options) {
                        return (
                          <Col span={colSpan} key={itemChild.id}>
                            <Form.Item
                              name={itemChild.name}
                              label={itemChild.label}
                              {...itemChild.rulesItem}
                            >
                              <Select
                                placeholder={itemChild.placeHolder}
                                onChange={handleClickOptions}
                              >
                                {itemChild.options.map((optionItems, index) => (
                                  <Option value={optionItems.id} key={index}>
                                    {optionItems?.name ||
                                      optionItems?.description}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        );
                      }
                    } else if (itemChild.type === 'datePicker') {
                      return (
                        <Col span={colSpan}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <DatePicker
                              style={{ width: '100%' }}
                              // format={YYYY_MM_DD}
                              placeholder={itemChild.placeHolder}
                              // disabledDate={disabledDate}
                            />
                          </Form.Item>
                        </Col>
                      );
                    } else if (itemChild.type === 'radio') {
                      return (
                        <Col span={colSpan}>
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
                        <Col span={colSpan}>
                          <Form.Item
                            label={itemChild.label}
                            name={itemChild.name}
                          >
                            <Radio.Group>
                              <Upload
                                {...props}
                                accept="image/*"
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
                        <Col span={colSpan}>
                          <Form.Item
                            label={itemChild.label}
                            name={itemChild.name}
                          >
                            <Radio.Group>
                              <Upload
                                {...propsImg}
                                accept="image/*"
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
                    } else if (itemChild.type === 'pickColor') {
                      return (
                        <Col span={colSpan}>
                          <Form.Item
                            label={itemChild.label}
                            name={itemChild.name}
                          >
                            <Input
                              suffix={
                                <PickerColor
                                  name={itemChild.name}
                                  colorDefault="green"
                                  getValueColor={handleGetValueColor}
                                />
                              }
                            />
                          </Form.Item>
                        </Col>
                      );
                    } else if (itemChild.type === 'timePicker') {
                      return (
                        <Col span={colSpan}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <TimePicker
                              use12Hours
                              format="h:mm:ss A"
                              style={{ width: '100%' }}
                              // onChange={onChangeTimePicker}
                              placeholder={itemChild.placeHolder}
                            />
                          </Form.Item>
                        </Col>
                      );
                    } else if (itemChild.type === 'password') {
                      return (
                        <Col span={colSpan}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <Input.Password
                              placeholder={itemChild.placeHolder}
                              iconRender={(visible) =>
                                visible ? (
                                  <EyeTwoTone />
                                ) : (
                                  <EyeInvisibleOutlined />
                                )
                              }
                            />
                          </Form.Item>
                        </Col>
                      );
                    } else if (itemChild.type === 'number') {
                      return (
                        <Col span={colSpan}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <Input
                              type={'number'}
                              // style={{ width: '100%', borderRadius: 8 }}
                              // formatter={(value) =>
                              //   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                              // }
                              placeholder={itemChild.placeHolder}
                            />
                          </Form.Item>
                        </Col>
                      );
                    } else if (itemChild.type === 'button-duplicate') {
                      return (
                        <Col span={24}>
                          <div className="gx-d-flex gx-align-items-center">
                            <ButtonCustom
                              type="button"
                              value=""
                              // iconLeft={}
                              name={itemChild.name}
                              onClick={(e) =>
                                handleDuplicate(e, itemChild.name)
                              }
                            />
                            <span className="gx-ml-2">{itemChild.label}</span>
                          </div>
                        </Col>
                      );
                    } else if (itemChild.type === 'fullWidth') {
                      return (
                        <Col span={24}>
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
                    } else {
                      return (
                        <Col span={colSpan}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <Input
                              {...itemChild.rulesInput}
                              type={itemChild?.typeInput}
                              placeholder={itemChild.placeHolder}
                            />
                          </Form.Item>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </div>
            ))}

          <div className="gx-d-flex gx-justify-content-center btn-footer">
            <Button className="btn-cancel" onClick={() => onCancel()}>
              Hủy
            </Button>
            <Button htmlType="submit" type="primary" className="btn-ok">
              Lưu
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FormDuplicateButtonBottom;
