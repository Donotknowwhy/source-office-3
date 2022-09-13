import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { DeleteIcon } from '@assets/icons/DeleteIcon';
import { EditIcon } from '@assets/icons/EditIcon';
import { ModalWarning } from '@assets/icons/ModalWarning';
import ButtonCustom from '@components/Button';
import { NAME_BUTTON } from '@constants/button';
import { Pagination, Table } from 'antd';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import { EditDepartment } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import FormModal from 'customComponents/FormModal';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  deleteDepartment,
  getDepartment,
  updateDepartment,
  updateStatusDepartment
} from '../slice';

const Department = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const department = useAppSelector(
    (state) => state.SettingHRM.originationSettings.department
  );

  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const bodyGetDepartment = {
    status: 1,
    branch_id: authState.branch_id
  };

  const { data, count } = department;
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>();

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handleClick = (e, id) => {
    setOpen(!open);
    setSelected(e.target.name);
    const dataSelected = data.filter((item) => item.id === id);

    setSelectedUser(dataSelected);
  };

  const getValueForm = async (formValue, name) => {
    setOpen(false);
    if (selectedUser) {
      if (name === NAME_BUTTON.EDIT) {
        const body = {
          department_name: formValue.department_name,
          description: formValue.description,
          department_id: selectedUser[0].id
        };

        await dispatch(updateDepartment(body));
        await dispatch(
          getDepartment({
            ...bodyGetDepartment,
            page: 1,
            limit: pageSize
          })
        );
      }
    }
  };

  const handleRenderModal = useCallback(() => {
    switch (selected) {
      case NAME_BUTTON.EDIT: {
        return (
          <FormComponent
            data={selectedUser[0]}
            nameForm={NAME_BUTTON.EDIT}
            colSpan={12}
            widthModal={1016}
            title="Sửa thông tin phòng ban"
            modalVisible={open}
            onCancel={handleToggleOpen}
            formValue={EditDepartment}
            getValueForm={getValueForm}
          />
        );
      }
      case NAME_BUTTON.DELETE: {
        return (
          <FormModal
            name={NAME_BUTTON.DELETE}
            open={open}
            title="Thông báo"
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa phòng ban"
            mainContent="Thông tin phòng ban sẽ bị xóa khỏi cơ sở dữ liệu
Bạn có chắc chắn xóa phòng ban?"
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

  const handleClickAcceptModal = async (name) => {
    setOpen(false);
    if (name === NAME_BUTTON.DELETE) {
      const body = {
        department_id: selectedUser[0].id
      };

      await dispatch(deleteDepartment(body));
      await dispatch(
        getDepartment({
          ...bodyGetDepartment,
          page: 1,
          limit: pageSize
        })
      );
    }
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
      title: 'Tên phòng ban',
      dataIndex: 'name',
      className: 'gx-text-center-th',
      width: '451px'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      className: 'gx-text-center-th',
      width: '456px'
    },
    {
      key: '',
      title: 'Thao tác',
      className: 'gx-text-center-th',
      dataIndex: 'partner_code',
      width: 'auto',
      render: (value, record) => {
        return (
          <div className="gx-d-flex gx-justify-content-center">
            <ButtonCustom
              idUser={record.id}
              name={NAME_BUTTON.EDIT}
              onClick={handleClick}
              value=""
              iconLeft={<EditIcon />}
              disableSpacingRight={true}
            />
            <ButtonCustom
              idUser={record.id}
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

  useEffect(() => {
    dispatch(
      getDepartment({
        ...bodyGetDepartment,
        page: currentPage,
        limit: pageSize
      })
    );
  }, [pageSize, currentPage]);

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

export default Department;
