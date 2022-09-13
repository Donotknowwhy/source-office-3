import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { DeleteIcon } from '@assets/icons/DeleteIcon';
import { EditIcon } from '@assets/icons/EditIcon';
import { ModalWarning } from '@assets/icons/ModalWarning';
import ButtonCustom from '@components/Button';
import { NAME_BUTTON } from '@constants/button';
import { Pagination, Table } from 'antd';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import { EditPosition } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import FormModal from 'customComponents/FormModal';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  deletePosition,
  getPosition,
  updatePosition,
  updateStatusPosition
} from '../slice';

const Position = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const position = useAppSelector(
    (state) => state.SettingHRM.originationSettings.position
  );

  const { data, count } = position;

  const [selectedUser, setSelectedUser] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>();

  const getPositionBody = {
    status: 1,
    company_id: authState.company_id
  };

  useEffect(() => {
    dispatch(
      getPosition({ ...getPositionBody, page: currentPage, limit: pageSize })
    );
  }, [pageSize, currentPage]);

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
          position_id: selectedUser[0].id,
          description: formValue.description,
          department_id: authState.department_id,
          position_name: formValue.position_name
        };
        await dispatch(updatePosition(body));
        await dispatch(
          getPosition({
            ...getPositionBody,

            page: 1,
            limit: pageSize
          })
        );
      } else if (name === NAME_BUTTON.DELETE) {
        const body = {
          position_id: selectedUser[0].id,
          status: 0
        };
        await dispatch(updatePosition(body));
        await dispatch(
          getPosition({
            ...getPositionBody,
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
            title="Sửa thông tin chức vụ"
            modalVisible={open}
            onCancel={handleToggleOpen}
            formValue={EditPosition}
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
            headingContent="Xóa chức vụ"
            mainContent="Thông tin chức vụ sẽ bị xóa khỏi cơ sở dữ liệu. 
Bạn có chắc chắn xóa chức vụ?"
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
    if (selectedUser) {
      if (name === NAME_BUTTON.DELETE) {
        const body = {
          position_id: selectedUser[0].id
        };
        await dispatch(deletePosition(body));
        await dispatch(
          getPosition({
            ...getPositionBody,
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
      title: 'Tên chức vụ',
      dataIndex: 'position_name',
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
      width: 'auto',
      render: (value, reocord) => {
        return (
          <div className="gx-d-flex gx-justify-content-center">
            <ButtonCustom
              idUser={reocord.id}
              name={NAME_BUTTON.EDIT}
              onClick={handleClick}
              value=""
              iconLeft={<EditIcon />}
              disableSpacingRight={true}
            />
            <ButtonCustom
              idUser={reocord.id}
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

export default Position;
