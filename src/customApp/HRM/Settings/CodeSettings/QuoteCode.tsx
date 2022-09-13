import { useAppDispatch } from '@appRedux/hooks';
import { DeleteIcon } from '@assets/icons/DeleteIcon';
import { EditIcon } from '@assets/icons/EditIcon';
import { ModalWarning } from '@assets/icons/ModalWarning';
import ButtonCustom from '@components/Button';
import { NAME_BUTTON } from '@constants/button';
import { DataTable } from '@constants/table';
import { Table } from 'antd';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import { EditInforBranch } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import FormModal from 'customComponents/FormModal';
import { useCallback, useState } from 'react';

const QuoteCode = () => {
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handleClick = (e) => {
    setOpen(!open);
    setSelected(e.target.name);
  };

  const getValueForm = (form, name) => {
    if (name === NAME_BUTTON.EDIT) {
    }
  };

  const handleRenderModal = useCallback(() => {
    switch (selected) {
      case NAME_BUTTON.EDIT: {
        return (
          <FormComponent
            nameForm={NAME_BUTTON.EDIT}
            colSpan={12}
            widthModal={1016}
            title="Thêm thông tin thôi việc"
            modalVisible={open}
            onCancel={handleToggleOpen}
            formValue={EditInforBranch}
            getValueForm={getValueForm}
          />
        );
      }
      case NAME_BUTTON.DELETE: {
        return (
          <FormModal
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa công việc cá nhân"
            mainContent="Công việc bị xóa sẽ chuyển vào mục Lưu trữ. Bạn có chắc chắn xóa công việc?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggleOpen}
          />
        );
      }
      case NAME_BUTTON.ADD_NEW: {
        return (
          <FormModal
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa công việc cá nhân"
            mainContent="Công việc bị xóa sẽ chuyển vào mục Lưu trữ. Bạn có chắc chắn xóa công việc?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggleOpen}
          />
        );
      }

      default:
        break;
    }
  }, [open, selected]);

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
      title: 'Tiền tố',
      dataIndex: 'status_project',
      className: 'gx-text-center-th',
      width: '451px'
    },
    {
      title: 'Hậu tố',
      dataIndex: 'code_color',
      className: 'ant-table-selection-column ',
      width: '456px'
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
              name={NAME_BUTTON.EDIT}
              onClick={handleClick}
              value=""
              iconLeft={<EditIcon />}
              disableSpacingRight={true}
            />
            <ButtonCustom
              name={NAME_BUTTON.DELETE}
              onClick={handleClick}
              value=""
              iconLeft={<DeleteIcon />}
              disableSpacingRight={true}
            />
          </div>
        );
      }
    }
  ];

  return (
    <div>
      {handleRenderModal()}
      <Table
        columns={columns}
        dataSource={DataTable}
        rowKey="stt"
        rowSelection={{
          type: 'checkbox',
          columnWidth: '40px'
        }}
      />
    </div>
  );
};

export default QuoteCode;
