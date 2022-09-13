import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch } from '@appRedux/hooks';
import { UploadIcon } from '@assets/vendors/icons/Upload';
import { DATE_FORMAT_EN_GB, YYYY_MM_DD } from '@constants/commons';
import { getBase64 } from '@constants/function';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
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
import { PickerColor } from 'customComponents/PickerColor';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { DATE_FORMAT } from 'constants/commons';
import ButtonCustom from '@components/Button';

const BASE_URL_IMG = process.env.REACT_APP_BASE_URL_IMG;
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const getToken = localStorage.getItem('token');

const { Option } = Select;

export interface IFormComponent {
  nameForm?: string;
  title?: string;
  modalVisible: boolean;
  onCancel?: () => void;
  formValue: any;
  getValueForm?: (valueForm, name, options) => void;
  widthModal?: number;
  colSpan?: number;
  data?: any;
  action?: string;
  nameBtnAccept?: string;
  nameBtnCancel?: string;
  dataHandle?: any;
}

const FormComponent = ({
  nameForm,
  title,
  modalVisible,
  onCancel,
  formValue,
  getValueForm,
  widthModal = 1016,
  colSpan = 12,
  data,
  action,
  nameBtnAccept = 'Xác nhận',
  nameBtnCancel = 'Hủy',
  dataHandle,
  ...properties
}: IFormComponent) => {
  console.log('day la dattaHandle', dataHandle);
  const dispatch = useAppDispatch();

  const [color, setColor] = useState('green');

  const [uploadState, setUploadState] = useState([]);
  const [defaultUpload, setDefaultUpload] = useState([]);
  console.log('day la default', defaultUpload);

  useEffect(() => {
    if (data) {
      Object.keys(data).map((key) => {
        if (key.includes('attachments') && data[key]) {
          const convertJSON = JSON.parse(data[key]);
          if (convertJSON.length > 0) {
            const convertArrObj = convertJSON.map((item, index) => {
              return {
                uid: _.uniqueId('key_'),
                url: `${BASE_URL_IMG}` + item.url,
                status: 'done',
                name: item.name
              };
            });
            setDefaultUpload(convertArrObj);
          } else {
            setDefaultUpload([]);
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
    } else {
      form.resetFields();
    }
  }, [data]);

  const props = {
    name: 'attachments',
    multiple: true,
    action: `${REACT_APP_BASE_URL}${action}`,
    headers: {
      Authorization: `Bearer ${getToken}`
    },
    defaultFileList: dataHandle,

    onChange(info) {
      console.log('day la info', info);
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
        if (info.fileList.length > 0) {
          const getFileList = info.fileList.map((item, index) => {
            return {
              uid: _.uniqueId('key_id'),
              name: item.name,
              url: item.response.data,
              status: item.status
            };
          });
          setDefaultUpload([...defaultUpload, ...getFileList]);

          const convertJSON = JSON.stringify(getFileList);
          form.setFieldsValue({ attachments: convertJSON });
        }
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
        // info.file.status = 'done';
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

  const handleOnChangeSelect = (value) => {};

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

    if (getValueForm) {
      getValueForm(cloneObj, nameForm, formValue);
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
          layout="vertical"
          onFinish={onFinish}
          {...wrapperCol}
          scrollToFirstError={true}
        >
          {formValue &&
            formValue.map((item, index) => (
              <div key={index}>
                <div>{item?.title}</div>
                <Row>
                  {item.detail.map((itemChild, index) => {
                    if (itemChild.type === 'dropdown') {
                      if (itemChild.options) {
                        return (
                          <Col span={colSpan} key={itemChild.name}>
                            <Form.Item
                              name={itemChild.name}
                              label={itemChild.label}
                              {...itemChild.rulesItem}
                            >
                              <Select
                                listHeight={150}
                                showSearch
                                filterOption={(input: string, option: any) =>
                                  option?.children
                                    ?.toLowerCase()
                                    .includes(input)
                                }
                                placeholder={itemChild.placeHolder}
                                onChange={handleOnChangeSelect}
                              >
                                {itemChild.options.map((optionItems, index) => (
                                  <Option
                                    value={optionItems.id || optionItems.value}
                                    key={index}
                                  >
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
                        <Col span={colSpan} key={itemChild.name}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <DatePicker
                              style={{ width: '100%' }}
                              format={DATE_FORMAT_EN_GB}
                              placeholder={itemChild.placeHolder}
                              // disabledDate={disabledDate}
                            />
                          </Form.Item>
                        </Col>
                      );
                    } else if (itemChild.type === 'radio') {
                      return (
                        <Col span={colSpan} key={itemChild.name}>
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
                        <Col span={colSpan} key={itemChild.name}>
                          <Form.Item
                            label={itemChild.label}
                            name={itemChild.name}
                          >
                            <Radio.Group>
                              <Upload
                                {...props}
                                accept="image/*"

                                // itemRender={(
                                //   ReactElement,
                                //   file,
                                //   uploadFile,
                                //   ...item
                                // ) => {
                                //   // console.log('123123', item[0].remove);
                                //   // console.log('1231234', remove);

                                //   return (
                                //     <>
                                //       <div
                                //         // key={file?.uid}
                                //         onClick={(e) => e.stopPropagation()}
                                //         className="upload-filelist-items"
                                //       >
                                //         {console.log(
                                //           'day la custom',
                                //           ReactElement,
                                //           file,
                                //           uploadFile,
                                //           ...item
                                //         )}
                                //         <a href={file?.url} target="_blank">
                                //           {file?.name}
                                //         </a>
                                //       </div>
                                //     </>
                                //   );
                                // }}
                              >
                                <Button
                                  icon={<UploadIcon />}
                                  type="primary"
                                  className="btn-upload"
                                >
                                   Tải lên tệp đính kèm
                                </Button>
                                {/* {defaultUpload &&
                                  defaultUpload.map((file, i) => (
                                    <div
                                      key={file?.uid}
                                      onClick={(e) => e.stopPropagation()}
                                      className="upload-filelist-items"
                                    >
                                      <a href={file?.url} target="_blank">
                                        {file.name}
                                      </a>
                                    </div>
                                  ))} */}
                              </Upload>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      );
                    } else if (itemChild.type === 'img') {
                      return (
                        <Col span={colSpan} key={itemChild.name}>
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
                        <Col span={colSpan} key={itemChild.name}>
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
                        <Col span={colSpan} key={itemChild.name}>
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
                        <Col span={colSpan} key={itemChild.name}>
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
                    } else if (itemChild.type === 'viewOnly') {
                      return (
                        <Col span={colSpan} key={itemChild.name}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <Input
                              type={itemChild?.typeInput}
                              placeholder={itemChild.placeHolder}
                              {...itemChild.rulesInput}
                            />
                          </Form.Item>
                        </Col>
                      );
                    } else if (itemChild.type === 'number') {
                      return (
                        <Col span={colSpan} key={itemChild.name}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <InputNumber
                              style={{ width: '100%', borderRadius: 8 }}
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                              }
                              controls={false}
                              placeholder={itemChild.placeHolder}
                            />
                          </Form.Item>
                        </Col>
                      );
                    } else {
                      return (
                        <Col span={colSpan} key={itemChild.name}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <Input
                              type={itemChild?.typeInput}
                              placeholder={itemChild.placeHolder}
                              className="gx-no-inner"
                              {...itemChild.rulesInput}
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
            <ButtonCustom
              type="button"
              value={nameBtnCancel}
              className="btn-cancel"
              onClick={onCancel}
              MarginLeftButton={false}
            />

            <ButtonCustom
              maxWidth={132}
              value={nameBtnAccept}
              className="btn-accept"
              onClick={onCancel}
            />
            {/* <Button htmlType="submit" type="primary" className="btn-ok">
              {nameBtnAccept}
            </Button> */}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FormComponent;
