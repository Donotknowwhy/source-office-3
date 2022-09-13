import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { ModalWarning } from '@assets/icons/ModalWarning';
import { NAME_BUTTON } from '@constants/button';
import { formatCurrency, formatCurrencyVND } from '@util/utils';
import { Pagination, Table } from 'antd';
import { getAllService, updateService } from 'customApp/Crm/slice';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import { EditInforBranch } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import FormModal from 'customComponents/FormModal';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { addService } from '../ListProductAndService.helper';

const ListService = ({ value, name, getListId }: any) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const listService = useAppSelector((state) => state.crm.ListService);

  const { data, total } = listService;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedUser, setSelectedUser] = useState([]);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>();
  const bodyGetIPOfDepartment = {
    status: 1,
    branch_id: authState.branch_id
  };
  useEffect(() => {
    const body = {
      page: page,
      limit: limit,
      search: value,
      status: 1,
      branch_id: authState.branch_id
    };
    dispatch(getAllService(body));
  }, [value, page, limit]);

  const bodyGetAll = {
    page: 1,
    limit: 15,
    search: '',
    status: 1,
    branch_id: authState.branch_id
  };

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handleClick = (e, id, name) => {
    const getName = e.target.name;
    setOpen(!open);
    if (getName) {
      setSelected(getName);
    } else {
      setSelected(name);
    }
    if (id) {
      const dataSelected = data.filter((item) => item.id === id);
      setSelectedUser(dataSelected);
    }
  };

  const getValueForm = async (form, name) => {
    setOpen(false);
    if (name === NAME_BUTTON.EDIT) {
      const body = {
        ...form
      };

      await dispatch(updateService(body));
      await dispatch(getAllService(bodyGetAll));

      // await dispatch(getIpAccess(bodyGetIPOfDepartment));
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
            title="Sửa thông tin dịch vụ"
            modalVisible={open}
            onCancel={handleToggleOpen}
            formValue={addService}
            getValueForm={getValueForm}
          />
        );
      }
      case NAME_BUTTON.DELETE: {
        return (
          <FormModal
            name={NAME_BUTTON.DELETE}
            open={open}
            title="thông báo"
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
          status: 0,
          ip_access_id: selectedUser[0].id
        };

        // await dispatch(updateStatusIpAccess(body));
        // await dispatch(getIpAccess(bodyGetIPOfDepartment));
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
      title: 'Mã dịch vụ',
      dataIndex: 'service_code',
      key: 'service_code',
      className: 'gx-text-left',
      width: 'auto',
      render: (value: number) => {
        return <div>{value}</div>;
      }
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'service_name',
      key: 'service_name',
      className: 'gx-text-center-th',
      width: 'auto'
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      key: 'isupplier',
      className: 'gx-text-center-th ',
      width: 'auto'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      className: 'gx-text-center-th',
      width: 'auto'
    },
    {
      key: '',
      title: 'Đơn vị tính',
      className: 'gx-text-center-th',
      dataIndex: 'unit',
      width: 'auto'
    },
    {
      key: '',
      title: 'Thuế GTGT (%)',
      className: 'gx-text-center-th',
      dataIndex: 'added_value',
      width: 'auto'
    },
    {
      key: '',
      title: 'Đơn giá (VND)',
      className: 'gx-text-center-th',
      dataIndex: 'price',
      width: 'auto',
      render: (balance) => (
        <div className="gx-text-right">
          {formatCurrencyVND(balance as number)}
        </div>
      )
    },
    {
      key: '',
      title: 'Gia hạn',
      className: 'gx-text-center-th',
      dataIndex: 'extend',
      width: 'auto'
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: number[]) => {
      getListId(selectedRowKeys, name);

      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      // disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name
    })
  };

  const handleChangePagination = async (page: number, pageSize: any) => {
    setPage(page);
    setLimit(pageSize);
  };
  const renderPagination = () => {
    if (_.isEmpty(data)) {
      return null;
    }

    return (
      <div className="gx-d-flex gx-justify-content-end gx-pt-3">
        <Pagination
          onChange={handleChangePagination}
          pageSize={limit}
          current={page}
          showSizeChanger={true}
          total={total}
        />
      </div>
    );
  };

  return (
    <div>
      {handleRenderModal()}
      <Table
        onRow={(data) => {
          const name = NAME_BUTTON.EDIT;
          return {
            onClick: (e) => handleClick(e, data.id, name)
          };
        }}
        columns={columns}
        dataSource={data}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          columnWidth: '40px',
          ...(rowSelection as any)
        }}
        pagination={false}
      />
      {renderPagination()}
    </div>
  );
};

export default ListService;
