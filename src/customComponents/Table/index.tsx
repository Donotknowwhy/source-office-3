import { ModalWarning } from '@assets/icons/ModalWarning';
import { WritingIcon } from '@assets/icons/WritingIcon';
import ButtonCustom from '@components/Button';
import { DataTable } from '@constants/table';
import { Table } from 'antd';
import FormModal from 'customComponents/FormModal';
import { useState } from 'react';

function TableView() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickAcceptModal = () => {};

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      className: 'gx-text-left',
      width: '48px',
      render: (value: number) => {
        return <div>{value}</div>;
      }
    },
    {
      title: 'Trạng thái dự án',
      dataIndex: 'status_project',
      className: 'gx-text-center-th',
      width: '300px'
    },
    {
      title: 'Mã màu',
      dataIndex: 'code_color',
      className: 'ant-table-selection-column ',
      width: '270px',
      render: (value: number) => {
        return (
          <div className="gx-d-flex ant-table-selection-column--spacing">
            <div
              className="gx-mr-1 code_color"
              style={{ backgroundColor: `#${value}` }}
            ></div>
            {value}
          </div>
        );
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      className: 'gx-text-center-th',
      width: '338px'
    },
    {
      key: '',
      title: 'Thao tác',
      className: 'gx-text-center-th',
      dataIndex: 'partner_code',
      width: 'auto',
      render: () => {
        return (
          <div className="gx-d-flex gx-justify-content-center">
            <ButtonCustom
              onClick={handleClick}
              value="ahihi"
              iconLeft={<WritingIcon />}
              disableSpacingRight={true}
            />
          </div>
        );
      }
    }
  ];
  return (
    <>
      {/* <ShowModal status="success" isOpen={open} /> */}
      <FormModal
        open={open}
        title="thông báo"
        valueBtnAccept="Xác nhận"
        valueBtnCancel="Hủy"
        headingContent="Xóa công việc cá nhân"
        mainContent="Công việc bị xóa sẽ chuyển vào mục Lưu trữ. Bạn có chắc chắn xóa công việc?"
        iconPopup={<ModalWarning />}
        handleClickAccept={handleClickAcceptModal}
        handleClickCancel={handleClick}
      />

      <Table columns={columns} dataSource={DataTable} rowKey="stt" />
    </>
  );
}

export default TableView;
