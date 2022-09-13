import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { DeleteIcon } from '@assets/icons/DeleteIcon';
import { EditIcon } from '@assets/icons/EditIcon';
import { ModalWarning } from '@assets/icons/ModalWarning';
import ButtonCustom from '@components/Button';
import { NAME_BUTTON } from '@constants/button';
import { Pagination, Table } from 'antd';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import {
  EditAccessPoint,
  EditInforBranch
} from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import FormModal from 'customComponents/FormModal';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { deleteIpAccess, getIpAccess, updateIpAccess } from '../slice';

const AccessPoint = () => {
  const dispatch = useAppDispatch();
  const assetPoint = useAppSelector(
    (state) => state.SettingHRM.originationSettings.assetPoint
  );
  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const { data, count } = assetPoint;
  const [editForm, setEditForm] = useState(EditAccessPoint);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>();
  const bodyGetIPOfDepartment = {
    status: 1,
    branch_id: authState.branch_id
  };
  useEffect(() => {
    dispatch(
      getIpAccess({
        ...bodyGetIPOfDepartment,
        page: currentPage,
        limit: pageSize
      })
    );
  }, [currentPage, pageSize]);

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
    if (name === NAME_BUTTON.EDIT) {
      const body = {
        ip_access_id: selectedUser[0].id,
        ip_name: form.ip_name,
        ip_access_location: form.ip_access_location,
        branch_id: authState.branch_id
      };

      await dispatch(updateIpAccess(body));
      await dispatch(
        getIpAccess({
          ...bodyGetIPOfDepartment,
          page: currentPage,
          limit: pageSize
        })
      );
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
            title="Sửa thông tin điểm truy cập"
            modalVisible={open}
            onCancel={handleToggleOpen}
            formValue={editForm}
            getValueForm={getValueForm}
          />
        );
      }
      case NAME_BUTTON.DELETE: {
        return (
          <FormModal
            name={NAME_BUTTON.DELETE}
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa điểm truy cập"
            mainContent="Thông tin điểm truy cập sẽ bị xóa và ảnh hưởng đến các chức năng khác
Bạn có chắc chắn xóa điểm truy cập?"
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
            formValue={EditInforBranch}
            getValueForm={getValueForm}
          />
        );
      }

      default:
        break;
    }
  }, [open, selected]);

  const handleClickAcceptModal = async (name) => {
    setOpen(false);
    if (selectedUser) {
      if (name === NAME_BUTTON.DELETE) {
        const body = {
          ip_access_id: selectedUser[0].id
        };

        await dispatch(deleteIpAccess(body));
        await dispatch(
          getIpAccess({
            ...bodyGetIPOfDepartment,
            page: 1,
            limit: pageSize
          })
        );
      }
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
      title: 'Tên chi nhánh',
      dataIndex: 'branch_name',
      className: 'gx-text-center-th',
      width: '387px'
    },
    {
      title: 'Tên điểm truy cập',
      dataIndex: 'ip_access_location',
      className: 'gx-text-center-th ',
      width: '400px'
    },
    {
      title: 'Địa chỉ IP',
      dataIndex: 'ip_name',
      className: 'gx-text-center-th',
      width: '121px'
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

export default AccessPoint;
