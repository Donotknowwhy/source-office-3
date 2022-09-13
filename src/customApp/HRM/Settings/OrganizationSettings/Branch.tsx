import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { DeleteIcon } from '@assets/icons/DeleteIcon';
import { EditIcon } from '@assets/icons/EditIcon';
import { ModalWarning } from '@assets/icons/ModalWarning';
import ButtonCustom from '@components/Button';
import { NAME_BUTTON } from '@constants/button';
import { Pagination, Table } from 'antd';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import { EditInforBranch } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import FormModal from 'customComponents/FormModal';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { deleteBranch, getBranch, updateBranch } from '../slice';

const Branch = () => {
  const branch = useAppSelector(
    (state) => state.SettingHRM.originationSettings.branch
  );
  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const { data, count } = branch;
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState([]);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>();

  const bodyGetBranch = {
    status: 1,
    company_id: authState.company_id
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

  const getValueForm = async (formValue, name) => {
    setOpen(false);
    if (selectedUser) {
      if (name === NAME_BUTTON.EDIT) {
        const body = {
          branch_name: formValue.branch_name,
          address: formValue.address,
          branch_phone: formValue.branch_phone,
          branch_id: selectedUser[0].id
        };

        await dispatch(updateBranch(body));
        await dispatch(
          getBranch({
            ...bodyGetBranch,
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
            title="Sửa thông tin chi nhánh"
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
            name={NAME_BUTTON.DELETE}
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa chi nhánh"
            mainContent="Thông tin chi nhánh sẽ bị xóa.
Bạn có chắc chắn với thao tác này ?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggleOpen}
          />
        );
      }
      default:
        break;
    }
  }, [open, selected, selectedUser]);

  const handleClickAcceptModal = async (name) => {
    setOpen(false);

    if (name === NAME_BUTTON.DELETE) {
      const body = {
        branch_id: selectedUser[0].id
      };

      await dispatch(deleteBranch(body));
      await dispatch(
        getBranch({
          ...bodyGetBranch,
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
      title: 'Tên chi nhánh',
      key: 'branch_name',
      dataIndex: 'branch_name',
      className: 'gx-text-center-th',
      width: '387px'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      className: 'gx-text-center-th',
      width: '400px'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'branch_phone',
      className: 'gx-text-center-th',
      width: '121px'
    },
    {
      key: '',
      title: 'Thao tác',
      className: 'gx-text-center-th',
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
      getBranch({ ...bodyGetBranch, page: currentPage, limit: pageSize })
    );
  }, [currentPage, pageSize]);

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

export default Branch;
