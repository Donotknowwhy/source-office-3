import { memo } from 'react';
import { Col, Collapse, Row, Drawer, Space, Avatar, Dropdown } from 'antd';
import { Warning } from '@assets/icons/Warning';
import { User } from '@assets/icons/User';
import { Attachment } from '@assets/icons/Attachment';
import { Chat } from '@assets/icons/Chat';
import { TripleDotIcon } from '@assets/icons/TripleDotIcon';
import { Close } from '@assets/icons/Close';
import { HypeLink } from '@assets/icons/HypeLink';
import { PlusIcon } from '@assets/icons/PlusIcon';
import { Upload } from '@assets/icons/Upload';
import { AddLink } from '@assets/icons/AddLink';
import CommentProject from 'customComponents/CommentProject';
import './detail-task.less';

const { Panel } = Collapse;

export interface IDetailTask {
  visible?: boolean;
  onClose?: any;
}

const DetailTask = ({ visible, onClose }: IDetailTask) => {
  const comments = [
    {
      id: '1',
      img_url_avatar_user: '',
      user_name: 'Hai Tran1',
      update_date: '12:30 20/01/2022',
      comment:
        'Cần chốt thiết kế trước timeline của chức năng trước 1 tuần nhé.'
    },
    {
      id: '2',
      img_url_avatar_user: '',
      user_name: 'Mr T1',
      update_date: '18:20 20/01/2022',
      comment:
        'Điều chỉnh nhân sự bên web để đảm bảo tiến độ công việc cho ngày 10/2.'
    }
  ];

  const attachments = [
    'palletdsafasssssssssssssssssssssssssssssssss.png',
    'pallets.png'
  ];

  const links = [
    'https://drive.google.com/drive/u/',
    'https://drive.google.com/drive/u/asgsdfgdsfgdsgsdfgsdgfsdg'
  ];

  const menu = (
    <div>
      <p>item</p>
      <p>item</p>
    </div>
  );
  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <div className="detail-task gx-d-flex">
        <div className="detail-task__function gx-d-flex gx-align-items-center">
          <Warning />
          <User />
          <Attachment />
          <Chat />
        </div>
        <div className="detail-task__content">
          <div className="detail-task__header gx-d-flex">
            <h3>GO-02</h3>
            <Row gutter={[18, 0]}>
              <Col span={12}>
                <Dropdown overlay={menu}>
                  <TripleDotIcon onClick={(e) => e.preventDefault()} />
                </Dropdown>
              </Col>
              <Col span={12}>
                <Close onClick={onClose} />
              </Col>
            </Row>
          </div>
          <p className="gx-pb-1">Chụp ảnh tư liệu</p>

          <Collapse defaultActiveKey={['1', '2', '3', '4']}>
            <Panel header="Chi tiết" key="1">
              <div className="detail-task__panel gx-d-flex">
                <p>Trạng thái:</p>
                <p>Chưa thực hiện</p>
              </div>
              <div className="detail-task__panel gx-d-flex">
                <p>Ưu tiên:</p>
                <p>Trung bình</p>
              </div>
              <div className="detail-task__panel gx-d-flex">
                <p>Ước tính:</p>
                <p>3h</p>
              </div>
              <div className="detail-task__panel gx-d-flex">
                <p>Deadline:</p>
                <p>22/01/2022</p>
              </div>
            </Panel>
            <Panel header="Nhân sự" key="2">
              <div className="detail-task__panel gx-d-flex gx-mb-1">
                <p>Người giao:</p>
                <Space size={4}>
                  <Avatar size={24} src="https://joeschmoe.io/api/v1/random" />
                  <h5 className="gx-mb-0">Đỗ Trường Giang</h5>
                </Space>
              </div>
              <div className="detail-task__panel gx-d-flex">
                <p>Người nhận:</p>
                <Space size={4}>
                  <Avatar size={24} src="https://joeschmoe.io/api/v1/random" />
                  <h5 className="gx-mb-0">Dương Xuân Sơn</h5>
                </Space>
              </div>
            </Panel>

            <Panel header="Đính kèm" key="3">
              <div className="detail-task__panel gx-d-flex">
                <p>Tệp đính kèm:</p>
                <div className="detail-task__panel-media gx-d-flex gx-justify-content-between">
                  <div>
                    {attachments.map((item, index) => (
                      <Space
                        key={index}
                        size={5}
                        align="center"
                        className="gx-d-flex gx-w-100"
                      >
                        <Attachment className="detail-task__logo-attachment" />
                        <h5 className="gx-text-overflow-ellipsis">{item}</h5>
                      </Space>
                    ))}
                  </div>
                  <Upload className="gx-mt-1 detail-task__panel-icon" />
                </div>
              </div>

              <div className="detail-task__panel gx-d-flex gx-mt-1">
                <p>Liên kết:</p>
                <div className="detail-task__panel-media gx-d-flex gx-justify-content-between">
                  <div>
                    {links.map((item, index) => (
                      <Space
                        key={index}
                        className="gx-d-flex gx-w-100"
                        size={3}
                        align="center"
                      >
                        <HypeLink />
                        <h5 className="gx-text-overflow-ellipsis">{item}</h5>
                      </Space>
                    ))}
                  </div>
                  <AddLink className="gx-mt-1 detail-task__panel-icon" />
                </div>
              </div>

              <div className="detail-task__add-task gx-d-flex gx-align-items-center gx-mt-1">
                <div>
                  <PlusIcon />
                </div>
                <p className="gx-ms-2 gx-mb-0 gx-ml-2">Tạo sub task</p>
              </div>
            </Panel>

            <Panel
              header="Bình luận"
              key="4"
              className="item-container__comment gx-mb-3"
            >
              <CommentProject data={comments} />
            </Panel>
          </Collapse>
        </div>
      </div>
    </Drawer>
  );
};

export default memo(DetailTask);
