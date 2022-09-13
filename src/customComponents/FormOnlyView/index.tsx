import { useAppSelector } from '@appRedux/hooks';
import { EditForm } from '@assets/icons/EditForm';
import { UploadIcon } from '@assets/vendors/icons/Upload';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Tooltip,
  Upload
} from '@components/uielements';
import { useForm } from 'antd/lib/form/Form';
import EditFormDataModal from 'customApp/Crm/ManageData/EditFormDataModal';
import _ from 'lodash';
import { useEffect, useState } from 'react';

type IProps = {
  listFields: {
    title: string;
    fields: {
      name: string;
      label: string;
    }[];
  }[];
  data?: any;
  listData?: any;
  setListData?: any;
};

const FormOnlyView: React.FC<IProps> = ({
  listFields,
  data,
  listData,
  setListData
}) => {
  const [form] = useForm();
  const BASE_URL_IMG = process.env.REACT_APP_BASE_URL_IMG;
  const [isEditModal, setIsEditModal] = useState(false);
  const pathname = useAppSelector(({ common }) => common.pathname);

  const [defaultUpload, setDefaultUpload] = useState([]);

  useEffect(() => {
    form.setFieldsValue({
      data_name: data?.data_name,
      phone_number: data?.phone_number,
      email: data?.email,
      person_in_charge: data?.person_in_charge,
      source: data?.source,
      data_status: data?.data_status,
      products_and_services_of_interest:
        data?.products_and_services_of_interest,
      classify: data?.classify,
      company_name: data?.company_name,
      procurator: data?.procurator,
      position: data?.position,
      registered_business_address: data?.registered_business_address,
      tax_code: data?.tax_code,
      business_areas: data?.business_areas,
      company_address: data?.company_address,
      website: data?.website,
      note: data?.note,
      // attachments: data?.attachments,
      link: data?.link
    });
    if (data) {
      Object.keys(data).forEach((key) => {
        if (key.includes('attachments')) {
          const convertJSON = JSON.parse(data[key]);
          if (convertJSON) {
            const convertArrObj = convertJSON.forEach((item, index) => {
              return {
                uid: _.uniqueId(),
                url: `${BASE_URL_IMG}` + item.url,
                status: 'done',
                name: item.name
              };
            });
            setDefaultUpload(convertArrObj);
          }
        }
      });
    }
  }, [form, data, BASE_URL_IMG]);

  const props = {
    name: 'attachments',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    fileList: [...defaultUpload],
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
        if (info.fileList.length > 0) {
          const getFileList = info.fileList.forEach((item, index) => {
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
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        if (key.includes('attachments')) {
          const convertJSON = JSON.parse(data[key]);
          if (convertJSON) {
            const convertArrObj = convertJSON.map((item, index) => {
              return {
                uid: _.uniqueId('key__'),
                url: `${process.env.REACT_APP_BASE_URL_IMG}` + item.url,
                status: 'done',
                name: item.name
              };
            });
            setDefaultUpload(convertArrObj);
          } else {
            setDefaultUpload([]);
          }
        }
      });
    }
  }, [data]);

  return (
    <>
      {listFields &&
        listFields.map((item, index) => {
          return (
            <Card
              title={item?.title}
              className="form-only-view"
              bordered={false}
              key={index}
              extra={
                index === 0 ? (
                  <span onClick={() => setIsEditModal(true)}>
                    <EditForm />
                  </span>
                ) : (
                  ''
                )
              }
            >
              <Form layout="vertical" form={form}>
                <Row justify="space-between" gutter={16}>
                  {data &&
                    item?.fields.map((field, index) => {
                      return (
                        <Col span={12} key={index}>
                          <Form.Item name={field?.name} label={field?.label}>
                            {field?.name !== 'attachments' ? (
                              <Tooltip title={data[field?.name]}>
                                <Input readOnly value={data[field?.name]} />
                              </Tooltip>
                            ) : (
                              <Upload
                                {...props}
                                accept="image/*"
                                disabled={true}
                                defaultFileList={[...defaultUpload]}

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
                            )}
                          </Form.Item>
                        </Col>
                      );
                    })}
                  {/* <Col span={12}>
                    <Form.Item label="Tệp đính kèm" name="attachments">
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
                    </Form.Item>
                  </Col> */}
                </Row>
              </Form>
            </Card>
          );
        })}
      <EditFormDataModal
        title={
          pathname === '/crm/manage-data'
            ? 'Sửa data'
            : 'Sửa thông tin khách hàng'
        }
        isModalVisible={isEditModal}
        setIsModalVisible={setIsEditModal}
        data={data}
        mode="edit"
        listData={listData}
        setListData={setListData}
      />
    </>
  );
};

export default FormOnlyView;
