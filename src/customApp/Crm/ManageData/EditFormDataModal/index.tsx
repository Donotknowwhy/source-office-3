import { selectAuthState } from '@appRedux/Authslice';
import { useAppSelector } from '@appRedux/hooks';
import { UploadIcon } from '@assets/vendors/icons/Upload';
import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload
} from '@components/uielements';
import { getBase64 } from '@constants/function';
import { useForm } from 'antd/lib/form/Form';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createCommonData,
  getAllCustomer,
  getAllData,
  getCareProduct,
  getCommonDataById,
  getCustomerById,
  selectCrmState,
  setCustomerInfinity,
  setDataInfinity,
  setPageCustomerScroll,
  setPageScroll,
  updateCommonCustomerById,
  updateCommonDataById
} from './../../slice';

const { Panel } = Collapse;
const { Option } = Select;

type IProps = {
  title: string;
  isModalVisible: any;
  setIsModalVisible: (isModalVisible: any) => void;
  data?: any;
  mode: string;
  listData?: any;
  setListData?: any;
};

const EditFormDataModal = ({
  title,
  isModalVisible,
  setIsModalVisible,
  data,
  mode,
  listData,
  setListData
}: IProps) => {
  const BASE_URL_IMG = process.env.REACT_APP_BASE_URL_IMG;
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const [form] = useForm();
  const dispatch = useDispatch();
  const { currentUser } = useAppSelector(selectAuthState);
  const { statusData, sourceData, allUser, careProduct, businessData } =
    useAppSelector(selectCrmState);
  const pathname = useAppSelector(({ common }) => common.pathname);
  const [uploadDefault, setUploadDefault] = useState();
  const [json, setJSON] = useState('');

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
      address: data?.address,
      tax_code: data?.tax_code,
      business_areas: data?.business_areas,
      company_address: data?.company_address,
      website: data?.website,
      note: data?.note,
      attachments: data?.attachments,
      link: data?.link
    });
  }, [form, data]);

  useEffect(() => {
    dispatch(getCareProduct({ branch_id: currentUser?.staff?.branch_id }));
  }, [dispatch, currentUser?.staff?.branch_id]);

  const formItemLayout = {
    labelCol: { span: 22 },
    wrapperCol: { span: 22 }
  };

  const onFinish = async (values) => {
    if (mode === 'edit') {
      if (pathname === '/crm/manage-data') {
        await dispatch(
          updateCommonDataById({
            ...values,
            data_management_id: data?.id,
            branch_id: currentUser?.staff?.branch_id,
            attachments: json
          })
        );
      } else {
        await dispatch(
          updateCommonCustomerById({
            ...values,
            data_management_id: data?.id,
            branch_id: currentUser?.staff?.branch_id,
            attachments: json
          })
        );
      }
    } else if (mode === 'add') {
      await dispatch(
        createCommonData({
          ...values,
          branch_id: currentUser?.staff?.branch_id,
          attachments: json
        })
      );
    }
    if (pathname === '/crm/manage-data') {
      const res: any = await dispatch(
        getAllData({
          page: 1,
          limit: 10,
          company_id: currentUser?.staff?.company_id
        })
      );
      dispatch(setDataInfinity(res?.payload?.data));
      dispatch(setPageScroll(1));
      // setListData(res?.payload?.data);
      dispatch(
        getCommonDataById({
          data_management_id: data?.id
        })
      );
    } else if (pathname === '/crm/manage-customer') {
      const res: any = await dispatch(
        getAllCustomer({
          page: 1,
          limit: 10,
          company_id: currentUser?.staff?.company_id
        })
      );
      dispatch(setCustomerInfinity(res?.payload?.data));
      dispatch(setPageCustomerScroll(1));
      // setListData(res?.payload?.data);
      dispatch(
        getCustomerById({
          data_management_id: data?.id
        })
      );
    }
    await setIsModalVisible(false);
  };

  const getToken = localStorage.getItem('token');

  // upload props
  const props = {
    name: 'attachments',
    action: `${REACT_APP_BASE_URL}crm/updateFile`,
    multiple: true,
    headers: {
      Authorization: `Bearer ${getToken}`
    },
    defaultFileList: uploadDefault,
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
        if (info.fileList.length > 0) {
          const getFileList = info.fileList.map((item, index) => {
            return {
              uid: _.uniqueId('key_'),
              name: item.name,
              url: item.response.data,
              status: item.status
            };
          });

          const convertJSON = JSON.stringify(getFileList);

          setJSON(convertJSON);
          form.setFieldsValue({ attachments: convertJSON });
        }
      }
    }
  };

  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
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
        scrollToFirstError={true}
      >
        <Collapse defaultActiveKey={['1', '2']}>
          <Panel header="Thông tin liên lạc" key="1">
            <Row>
              <Col span={12}>
                <Form.Item
                  name="data_name"
                  label={
                    pathname === '/crm/manage-data'
                      ? 'Tên data'
                      : 'Tên khách hàng'
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập đầy đủ thông tin'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone_number"
                  label="Số điện thoại"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập đầy đủ thông tin'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập đầy đủ thông tin'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="person_in_charge"
                  label="Người phụ trách"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập đầy đủ thông tin'
                    }
                  ]}
                >
                  <Select
                    showSearch
                    filterOption={(input: string, option: any) =>
                      option?.children?.toLowerCase().includes(input)
                    }
                  >
                    {allUser &&
                      allUser?.map((item) => {
                        return (
                          <Option key={item?.id} value={item?.name}>
                            {item?.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="source" label="Nguồn">
                  <Select>
                    {sourceData &&
                      sourceData?.map((item) => {
                        return (
                          <Option value={item?.source_name} key={item?.id}>
                            {item?.source_name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Col>
              {pathname === '/crm/manage-data' ? (
                <Col span={12}>
                  <Form.Item
                    name="data_status"
                    label="Trạng thái"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập đầy đủ thông tin'
                      }
                    ]}
                  >
                    <Select>
                      {statusData &&
                        statusData?.map((item) => {
                          return (
                            <Option key={item?.id} value={item?.status_name}>
                              {item?.status_name}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}
              <Col span={12}>
                <Form.Item
                  name="products_and_services_of_interest"
                  label="Sản phẩm dịch vụ quan tâm"
                >
                  <Select
                    showSearch
                    filterOption={(input: string, option: any) =>
                      option?.children?.toLowerCase().includes(input)
                    }
                  >
                    {careProduct &&
                      careProduct?.map((item) => {
                        return (
                          <Option value={item?.product_name} key={item?.code}>
                            {item?.product_name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="classify" label="Phân loại">
                  <Select>
                    <Option value="Cá nhân">Cá nhân</Option>
                    <Option value="Doanh nghiệp">Doanh nghiệp</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Panel>

          <Panel header="Thông tin công ty" key="2">
            <Row>
              <Col span={12}>
                <Form.Item name="company_name" label="Tên công ty">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="procurator" label="Người đại diện">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="position" label="Chức vụ">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="registered_business_address"
                  label="Địa chỉ DKKD"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="tax_code" label="Mã số thuế">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="business_areas" label="Lĩnh vực kinh doanh">
                  <Select
                    showSearch
                    filterOption={(input: string, option: any) =>
                      option?.children?.toLowerCase().includes(input)
                    }
                  >
                    {businessData &&
                      businessData?.map((item) => {
                        return (
                          <Option
                            key={item?.id}
                            value={item?.business_areas_name}
                          >
                            {item?.business_areas_name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="company_address" label="Địa chỉ công ty">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="website" label="Website">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="link" label="Liên kết">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="note" label="Ghi chú">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="attachments">
                  <Upload
                    {...props}
                    accept="image/*"
                    beforeUpload={(file) => true}
                  >
                    <Button
                      icon={<UploadIcon />}
                      type="primary"
                      className="btn-upload"
                    >
                      Tải lên tệp đính kèm
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Panel>
        </Collapse>
        <div className="gx-d-flex gx-justify-content-center btn-footer">
          <Button
            className="btn-cancel"
            onClick={() => setIsModalVisible(false)}
          >
            Hủy
          </Button>
          <Button htmlType="submit" type="primary" className="btn-ok">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditFormDataModal;
