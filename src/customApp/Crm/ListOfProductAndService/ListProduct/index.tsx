import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { NAME_BUTTON } from '@constants/button';
import { formatCurrency, formatCurrencyVND } from '@util/utils';
import { Pagination, Table } from 'antd';
import { getAllProduct, updateProduct } from 'customApp/Crm/slice';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { addProduct } from '../ListProductAndService.helper';

const ListProduct = ({ value, name, getListId }: any) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const listProduct = useAppSelector((state) => state.crm.ListProduct);

  const { data, total } = listProduct;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>();
  useEffect(() => {
    const body = {
      page: page,
      limit: limit,
      search: value,
      status: 1,
      branch_id: authState.branch_id
    };
    dispatch(getAllProduct(body));
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
        ...form,
        id_product: selectedUser[0].id
      };

      await dispatch(updateProduct(body));
      await dispatch(getAllProduct(bodyGetAll));

      //   await dispatch(getIpAccess(bodyGetIPOfDepartment));
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
            title="Sửa thông tin sản phẩm"
            modalVisible={open}
            onCancel={handleToggleOpen}
            formValue={addProduct}
            getValueForm={getValueForm}
          />
        );
      }

      default:
        break;
    }
  }, [open, selected]);

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
      title: 'Mã sản phẩm',
      dataIndex: 'product_code',
      key: 'product_code',
      className: 'gx-text-left',
      width: 'auto',
      render: (value: number) => {
        return <div>{value}</div>;
      }
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'product_name',
      key: 'product_name',
      className: 'gx-text-center-th',
      width: 'auto'
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      key: 'supplier',
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
      key: 'unit',
      title: 'Đơn vị tính',
      className: 'gx-text-center-th',
      dataIndex: 'unit',
      width: 'auto'
    },
    {
      key: 'added_value',
      title: 'Thuế GTGT (%)',
      className: 'gx-text-center-th',
      dataIndex: 'added_value',
      width: 'auto'
    },
    {
      key: 'price',
      title: 'Đơn giá (VND)',
      className: 'gx-text-center-th',
      dataIndex: 'price',
      width: 'auto',
      render: (balance) => (
        <div className="gx-text-right">
          {formatCurrencyVND(balance as number)}
        </div>
      )
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
          pageSize={page}
          current={limit}
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

export default ListProduct;
