import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { formatNumber, DATE_DD_MM_YYYY } from '@constants/commons';
import { formatCurrencyVND } from '@util/utils';
import { Pagination, Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getLedger } from '../slice';

const ExpenseReportTab = () => {
  const expense = useAppSelector((state) => state.Insight.expenseReport.table);
  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const { data, count } = expense;
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState([]);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>();

  const handleClick = (e, id) => {
    setOpen(!open);
    setSelected(e.target.name);
    const dataSelected = data.filter((item) => item.id === id);
    setSelectedUser(dataSelected);
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
      title: 'Ngày',
      key: 'datetime',
      dataIndex: 'datetime',
      className: 'gx-text-left',
      width: 'auto',
      render: (value) => {
        return <div>{moment(value).format(DATE_DD_MM_YYYY)}</div>;
      }
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      className: 'gx-text-left',
      width: '476px'
    },
    {
      title: 'Tổng chi phí đơn vị (VND)',
      dataIndex: 'money',
      className: 'gx-text-left',
      width: 'auto',
      render: (value, records) => {
        return formatCurrencyVND(value);
      }
    }
  ];

  useEffect(() => {
    dispatch(
      getLedger({
        type: 'Phiếu chi',
        branch_id: authState.branch_id,
        page: currentPage,
        limit: pageSize,
        search: ''
      })
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
      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
        rowKey="id"
      />
      {renderPagination()}
    </div>
  );
};

export default ExpenseReportTab;
