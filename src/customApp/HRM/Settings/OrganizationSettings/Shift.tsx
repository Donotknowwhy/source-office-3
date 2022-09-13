import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { DeleteIcon } from '@assets/icons/DeleteIcon';
import { EditIcon } from '@assets/icons/EditIcon';
import { ModalWarning } from '@assets/icons/ModalWarning';
import ButtonCustom from '@components/Button';
import { NAME_BUTTON } from '@constants/button';
import { Pagination, Table } from 'antd';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import { editShift } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import FormModal from 'customComponents/FormModal';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { deleteShift, getShiftAdmin, updateShift } from '../slice';
import FormShift from './FormShift';

const Shift = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const shift = useAppSelector(
    (state) => state.SettingHRM.originationSettings.shift
  );

  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const { data, count } = shift;
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>();
  const body = {
    company_id: authState.company_id,
    status: 1
  };
  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handleClick = (e, id) => {
    setOpen(!open);
    setSelected(e.target.name);
    const dataSelected = data.filter((item) => item.id === id);
    setSelectedUser(dataSelected);
  };

  const getValueForm = async (form, name) => {
    setOpen(false);
    if (selectedUser) {
      if (name === NAME_BUTTON.EDIT) {
        await dispatch(
          updateShift({
            ...form,
            shift_id: selectedUser[0].id
          })
        );
        await dispatch(
          getShiftAdmin({ ...body, page: currentPage, limit: pageSize })
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getShiftAdmin({ ...body, page: currentPage, limit: pageSize }));
  }, [pageSize, currentPage]);

  const handleRenderModal = useCallback(() => {
    switch (selected) {
      case NAME_BUTTON.EDIT: {
        return (
          <FormShift
            data={selectedUser[0]}
            nameForm={NAME_BUTTON.EDIT}
            colSpan={12}
            widthModal={1016}
            title="Sửa thông tin ca làm việc"
            modalVisible={open}
            onCancel={handleToggleOpen}
            // formValue={editShift}
            getValueForm={getValueForm}
          />
        );
      }
      case NAME_BUTTON.DELETE: {
        return (
          <FormModal
            // idUser={selectedUser[0].id}
            open={open}
            title="Thông báo"
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa ca làm việc"
            mainContent="Thông tin ca làm việc bị xóa khỏi cơ sở dữ liệu
Bạn có chắc chắn xóa ca làm việc?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggleOpen}
          />
        );
      }
      case NAME_BUTTON.ADD_NEW: {
        return (
          <FormComponent
            nameForm={NAME_BUTTON.EDIT}
            colSpan={12}
            widthModal={1016}
            title="Thêm thông tin thôi việc"
            modalVisible={open}
            onCancel={handleToggleOpen}
            formValue={editShift}
            getValueForm={getValueForm}
          />
        );
      }

      default:
        break;
    }
  }, [open, selected]);

  const handleClickAcceptModal = async () => {
    setOpen(false);
    await dispatch(
      deleteShift({
        shift_id: selectedUser[0].id
      })
    );
    await dispatch(getShiftAdmin({ ...body, page: 1, limit: 10 }));
  };

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
      title: 'Ca làm việc',
      dataIndex: 'shift_name',
      className: 'gx-text-center-th',
      width: '451px'
    },
    {
      title: 'Thứ 2',
      dataIndex: 'code_color',
      className: 'ant-table-selection-column ',
      width: '456px',
      render: (value, records) => (
        <>
          <p>{records.mon_in}</p>
          <p>{records.mon_out}</p>
        </>
      )
    },
    {
      title: 'Thứ 3',
      dataIndex: 'code_color',
      className: 'ant-table-selection-column ',
      width: '456px',
      render: (value, records) => (
        <>
          <p>{records.tue_in}</p>
          <p>{records.tue_out}</p>
        </>
      )
    },
    {
      title: 'Thứ 4',
      dataIndex: 'code_color',
      className: 'ant-table-selection-column ',
      width: '456px',
      render: (value, records) => (
        <>
          <p>{records.wed_in}</p>
          <p>{records.wed_out}</p>
        </>
      )
    },
    {
      title: 'Thứ 5',
      dataIndex: 'code_color',
      className: 'ant-table-selection-column ',
      width: '456px',
      render: (value, records) => (
        <>
          <p>{records.thu_in}</p>
          <p>{records.thu_out}</p>
        </>
      )
    },
    {
      title: 'Thứ 6',
      dataIndex: 'code_color',
      className: 'ant-table-selection-column ',
      width: '456px',
      render: (value, records) => (
        <>
          <p>{records.fri_in}</p>
          <p>{records.fri_out}</p>
        </>
      )
    },
    {
      title: 'Thứ 7',
      dataIndex: 'code_color',
      className: 'ant-table-selection-column ',
      width: '456px',
      render: (value, records) => (
        <>
          <p>{records.sat_in}</p>
          <p>{records.sat_out}</p>
        </>
      )
    },
    {
      title: 'Chủ nhật',
      dataIndex: 'code_color',
      className: 'ant-table-selection-column ',
      width: '456px',
      render: (value, records) => (
        <>
          <p>{records.sun_in}</p>
          <p>{records.sun_out}</p>
        </>
      )
    },
    {
      key: '',
      title: 'Thao tác',
      className: 'gx-text-center-th',
      dataIndex: 'partner_code',
      width: 'auto',
      render: (value, records) => {
        return (
          <div className="gx-d-flex gx-justify-content-center">
            <ButtonCustom
              idUser={records.id}
              name={NAME_BUTTON.EDIT}
              onClick={handleClick}
              value=""
              iconLeft={<EditIcon />}
              disableSpacingRight={true}
            />
            <ButtonCustom
              idUser={records.id}
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

  const rowSelection = {
    onChange: (selectedRowKeys: number[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      // disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name
    })
  };

  const handleChangePagination = async (page: number, pageSize: any) => {
    setPageSize(pageSize);
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (_.isEmpty(data)) {
      return null;
    }

    return (
      <div className="gx-d-flex gx-justify-content-end gx-pt-3">
        <Pagination
          onChange={handleChangePagination}
          pageSize={pageSize}
          current={currentPage}
          showSizeChanger={true}
          total={count}
        />
      </div>
    );
  };

  return (
    <div>
      {handleRenderModal()}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="stt"
        pagination={false}
      />
      {renderPagination()}
    </div>
  );
};

export default Shift;
