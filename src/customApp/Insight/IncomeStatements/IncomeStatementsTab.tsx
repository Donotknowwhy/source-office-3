import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { DATE_DD_MM_YYYY, formatNumber } from '@constants/commons';
import { formatCurrencyVND } from '@util/utils';
import { Pagination, Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getLedger } from '../slice';

const IncomeStatementsTab = () => {
  const incomeStatements = useAppSelector(
    (state) => state.Insight.incomeStatements.table
  );

  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const { data, count } = incomeStatements;

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

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
      title: 'Tên khách hàng',
      dataIndex: 'customer_name',
      className: 'gx-text-left',
      width: 'auto'
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      className: 'gx-text-left',
      width: 'auto'
    },
    {
      title: 'Doanh thu (VND)',
      dataIndex: 'money',
      className: 'gx-text-left',
      width: 'auto',
      render: (value) => {
        return formatCurrencyVND(value);
      }
    },
    {
      title: 'Nhân viên sale',
      dataIndex: 'sale_staff_name',
      className: 'gx-text-left',
      width: 'auto'
    }
  ];

  useEffect(() => {
    dispatch(
      getLedger({
        type: 'Phiếu thu',
        branch_id: authState.branch_id,
        page: currentPage,
        limit: pageSize,
        search: ''
      })
    );
  }, [pageSize, currentPage]);

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
        dataSource={data}
        rowKey="id"
        pagination={false}
      />
      {renderPagination()}
    </div>
  );
};

export default IncomeStatementsTab;
