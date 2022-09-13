import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined
} from '@ant-design/icons';
import { UploadIcon } from '@assets/vendors/icons/Upload';
import { DATE_FORMAT_EN_GB, YYYY_MM_DD } from '@constants/commons';
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  TimePicker,
  Upload
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { PickerColor } from 'customComponents/PickerColor';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
const BASE_URL_IMG = process.env.REACT_APP_BASE_URL_IMG;

export interface IFormComponent {
  nameForm?: string;
  title?: string;
  modalVisible: boolean;
  onCancel?: () => void;
  formValue: any;
  getValueForm?: (valueForm, name) => void;
  widthModal?: number;
  colSpan?: number;
  data?: any;
}

const FormCustomNoModal = ({
  nameForm,
  title,
  modalVisible,
  onCancel,
  formValue,
  getValueForm,
  widthModal = 1016,
  colSpan = 12,
  data,
  ...properties
}: IFormComponent) => {
  const [form] = useForm();
  const [defaultImg, setDefautImg] = useState([
    {
      url: '',
      status: '',
      name: '',
      uid: ''
    }
  ]);

  const [defaultUpload, setDefaultUpload] = useState([]);

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        if (key.includes('attachments') && data[key]) {
          const convertJSON = JSON.parse(data[key]);
          if (convertJSON) {
            const convertArrObj = convertJSON.forEach((item) => {
              return {
                url: `${BASE_URL_IMG}` + item.url,
                status: 'done',
                name: item.name
              };
            });
            setDefaultUpload(convertArrObj);
          } else {
            setDefaultUpload([]);
          }
        } else if (key.includes('avatar') && data[key]) {
          const convertJSON = JSON.parse(data[key]);
          if (convertJSON) {
            if (convertJSON.length > 0) {
              setDefautImg([
                {
                  url: convertJSON[0].url,
                  status: 'done',
                  name: convertJSON[0].name,
                  uid: convertJSON[0].uid
                }
              ]);
            }
          }
        } else if (key.includes('relationship') && data[key]) {
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
          form.setFields([
            {
              name: key,
              value: moment(data[key]).format(DATE_FORMAT_EN_GB)
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

    return () => {
      setDefautImg([
        {
          url: '',
          status: '',
          name: '',
          uid: ''
        }
      ]);
    };
  }, [data, form]);

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    fileList: defaultUpload,
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
        // info.fileList.map((item) => {
        //   getBase64(item.originFileObj, (beCard) => {
        //     arr.push(beCard);
        //   });
        // });
        // form.setFieldsValue({
        //   attachments: {
        //     attachments: arr
        //   }
        // });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const onFinish = (value) => {
    const cloneObj = {} as any;

    Object.keys(value).forEach((key) => {
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
      form.setFieldsValue({
        [name]: color.hex
      });
    }
  };
  // const disabledDate = (current: moment.Moment) => {
  //   return current.isAfter(new Date());
  // };

  const wrapperCol = {
    wrapperCol: {
      span: 23
    },
    labelCol: {
      span: 23
    }
  };

  return (
    <div className="form-custom-no-modal">
      <Form
        form={form}
        initialValues={{}}
        layout="vertical"
        onFinish={onFinish}
        {...wrapperCol}
      >
        {formValue &&
          formValue.forEach((item) => (
            <div key={_.uniqueId('key-random__')}>
              <div className="form-custom-no-modal__title gx-pb-2">
                {item?.title}
              </div>
              <Row>
                {item.detail.forEach((itemChild) => {
                  if (itemChild.type === 'dropdown') {
                    if (itemChild.options) {
                      return (
                        <Col span={colSpan} key={itemChild.id}>
                          <Form.Item
                            name={itemChild.name}
                            label={itemChild.label}
                            {...itemChild.rulesItem}
                          >
                            <Input
                              placeholder={itemChild.placeHolder}
                              readOnly
                              className="gx-input-view-only"
                              // onChange={handleOnChangeSelect}
                            ></Input>
                          </Form.Item>
                        </Col>
                      );
                    }
                  } else if (itemChild.type === 'datePicker') {
                    return (
                      <Col span={colSpan} key={itemChild.id}>
                        <Form.Item
                          name={itemChild.name}
                          label={itemChild.label}
                          {...itemChild.rulesItem}
                        >
                          <Input
                            placeholder={itemChild.placeHolder}
                            readOnly
                            className="gx-input-view-only"
                            // disabledDate={disabledDate}
                          />
                        </Form.Item>
                      </Col>
                    );
                  } else if (itemChild.type === 'radio') {
                    return (
                      <Col span={colSpan} key={itemChild.id}>
                        <Form.Item
                          name="relation_status"
                          label={itemChild.label}
                        >
                          <Radio.Group disabled={true}>
                            <Radio value="Có">Có</Radio>
                            <Radio value="Không">Không</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    );
                  } else if (itemChild.type === 'upload') {
                    return (
                      <Col span={colSpan} key={itemChild.id}>
                        <Form.Item
                          label={itemChild.label}
                          name={itemChild.name}
                        >
                          <Radio.Group>
                            <Upload
                              {...props}
                              accept="image/*"
                              disabled={true}
                              // showUploadList={false}
                            >
                              <Button
                                icon={<UploadIcon />}
                                type="primary"
                                className="btn-upload"
                                disabled={true}
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
                      <Col span={colSpan} key={itemChild.id}>
                        <Avatar
                          size={60}
                          src={
                            defaultImg[0]?.url !== '' ? (
                              defaultImg[0]?.url
                            ) : (
                              <UserOutlined />
                            )
                          }
                          style={{ backgroundColor: '#cccccc' }}
                        />
                      </Col>
                    );
                  } else if (itemChild.type === 'pickColor') {
                    return (
                      <Col span={colSpan} key={itemChild.id}>
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
                      <Col span={colSpan} key={itemChild.id}>
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
                      <Col span={colSpan} key={itemChild.id}>
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
                  } else {
                    return (
                      <Col span={colSpan} key={itemChild.id}>
                        <Form.Item
                          name={itemChild.name}
                          label={itemChild.label}
                          {...itemChild.rulesItem}
                        >
                          {/* <Tooltip title={data[itemChild?.name]}> */}
                          <Input
                            type={itemChild?.typeInput}
                            placeholder={itemChild.placeHolder}
                            {...itemChild.rulesInput}
                            readOnly
                            // value={data[itemChild?.name]}
                            className="gx-input-view-only"
                          />
                          {/* </Tooltip> */}
                        </Form.Item>
                      </Col>
                    );
                  }
                })}
              </Row>
            </div>
          ))}
      </Form>
    </div>
  );
};

export default FormCustomNoModal;
