import { useState, useEffect } from 'react';
import { Table, Checkbox, Select } from 'antd';
import HeaderLayout from 'customComponents/HeaderLayout';
import { useAppDispatch } from 'appRedux/store';
import { ArrowDrop } from '@assets/icons/ArrowDrop';
import { useAppSelector } from '@appRedux/hooks';
import HeaderAction from './HeaderAction';
import ModalRevenueExpenditure from './ModalRevenueExpenditure';
import {
  getRevenueExpenditures,
  changeAccountId,
  selectSingleCheckbox,
  selectMultiCheckbox,
  changeCurrent,
  changePageSize,
  changeRevenueExpenditureSelect
} from './slices';
import { getAccounts, putRevenueExpenditures } from './slices';
import { formatCurrency } from '@util/utils';
import { IRevenueExpenditure } from './modules';
import { RECEIPT, PAYMENT } from '../constants';
import { DEFAULT_VALUE_INPUT } from '@constants/index';

const { Option } = Select;

function ManageRevenueExpenditure() {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [revenueExpenditureSelect, setRevenueExpenditureSelect] =
    useState<IRevenueExpenditure>();

  const dispatch = useAppDispatch();
  const {
    account_id,
    revenueExpenditures,
    accounts,
    since,
    toDate,
    vote_type,
    checkBoxMulti,
    checkBoxes,
    timeErrorDelete,
    pageSize,
    current,
    total
  } = useAppSelector((state) => state.RevenueExpenditureSlice);

  useEffect(() => {
    dispatch(getAccounts())
      .unwrap()
      .then((res) => dispatch(changeAccountId(res[0]?.id)));
  }, [dispatch]);

  useEffect(() => {
    account_id &&
      dispatch(
        getRevenueExpenditures({
          account_id,
          vote_type,
          since,
          toDate,
          page: current,
          limit: pageSize
        })
      );
  }, [
    account_id,
    dispatch,
    since,
    toDate,
    vote_type,
    timeErrorDelete,
    current,
    pageSize
  ]);

  const handleCheckbox = (index: number, id: number) => {
    dispatch(selectSingleCheckbox({ index, id }));
  };

  const handleMultiCheckbox = () => {
    dispatch(selectMultiCheckbox());
  };

  const handleShowDetail = (data: IRevenueExpenditure) => {
    setRevenueExpenditureSelect(data);
    setIsVisibleForm(true);
    dispatch(changeRevenueExpenditureSelect(data.surplus));
  };

  const onSubmitModal = (values) => {
    setIsVisibleForm(false);
    const finalAccountSelect = {
      ...revenueExpenditureSelect,
      type: values?.type,
      account_id: values?.account_id,
      datetime: values?.datetime,
      customer_id: values?.customer_id,
      accounting: values?.accounting,
      money: values?.money,
      content: values?.content,
      surplus: values?.surplus,
      sale_staff_id: values?.sale_staff_id,
      note: values?.note
    };
    dispatch(putRevenueExpenditures(finalAccountSelect));
  };

  const onCancelModal = () => {
    setIsVisibleForm(false);
  };

  const onNextPage = (page: number, pageSize: number) => {
    dispatch(changeCurrent(page));
    dispatch(changePageSize(pageSize));
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={checkBoxMulti}
          onChange={handleMultiCheckbox}
          disabled={!!!revenueExpenditures.length}
        />
      ),
      className: 'acm__checkbox gx-text-end',
      dataIndex: 'id',
      width: '40px',
      render: (id, _, index: number) => (
        <Checkbox
          checked={checkBoxes[index]}
          onClick={(event) => {
            event.stopPropagation();
            handleCheckbox(index, id);
          }}
          value={index}
        />
      )
    },
    {
      title: 'STT',
      dataIndex: 'id',
      width: '48px',
      render: (id: number, _, index: number) => (
        <span>{(current - 1) * pageSize + index + 1}</span>
      )
    },
    {
      title: 'Ngày',
      dataIndex: 'datetime',
      width: '120px',
      render: (datetime) => <span>{datetime.slice(0, 11)}</span>
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customer_name',
      width: '400px'
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'customer_id',
      width: '130px'
    },
    {
      title: 'Nhân viên sale',
      dataIndex: 'sale_staff_name',
      width: '140px'
    },
    {
      title: 'Hạch toán',
      dataIndex: 'accounting',
      width: '100px'
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      width: 'auto',
      render: (content) => <span>{content || DEFAULT_VALUE_INPUT}</span>
    },
    {
      title: 'Thu',
      dataIndex: 'money',
      className: 'gx-text-right',
      width: '144px',
      render: (money, data: IRevenueExpenditure) => (
        <div className="gx-text-right">
          {data.type === RECEIPT ? formatCurrency(money) : DEFAULT_VALUE_INPUT}
        </div>
      )
    },
    {
      title: 'Chi',
      dataIndex: 'money',
      className: 'gx-text-right',
      width: '144px',
      render: (money, data: IRevenueExpenditure) => (
        <div className="gx-text-right">
          {data.type === PAYMENT ? formatCurrency(money) : DEFAULT_VALUE_INPUT}
        </div>
      )
    },
    {
      title: 'Số dư',
      dataIndex: 'surplus',
      className: 'gx-text-right',
      width: '144px',
      render: (surplus) => (
        <div className="gx-text-right">{formatCurrency(surplus)}</div>
      )
    }
  ];

  const headerRight = (
    <Select
      value={account_id || (accounts.length && accounts[0].id)}
      className="revenue-expenditure__select"
      placeholder="Chọn tài khoản"
      onChange={(accountId) => dispatch(changeAccountId(accountId))}
      suffixIcon={<ArrowDrop />}
    >
      {accounts.map((item) => {
        const accountInformation =
          item.account_name +
          (item.bank_code ? ` - ${item.bank_code}` : '') +
          (item.account_number ? ` - ${item.account_number}` : '');
        return (
          <Option key={item.id} value={item.id}>
            {accountInformation}
          </Option>
        );
      })}
    </Select>
  );

  return (
    <div className="revenue-expenditure acm">
      <HeaderAction />
      <HeaderLayout title="Quản lí thu chi" headerRight={headerRight} />
      <Table
        onRow={(data) => {
          return {
            onClick: () => handleShowDetail(data)
          };
        }}
        columns={columns}
        dataSource={revenueExpenditures || []}
        rowKey="id"
        className="table-cursor"
        scroll={{ x: 1650 }}
        pagination={{
          current,
          pageSize,
          total,
          showTotal: (totalRecord) => `${totalRecord} Phiếu thanh toán`,
          onChange: onNextPage,
          showSizeChanger: true
        }}
      />
      {isVisibleForm && (
        <ModalRevenueExpenditure
          isModalVisible={isVisibleForm}
          onSubmit={onSubmitModal}
          onCancel={onCancelModal}
          revenueExpenditureSelect={revenueExpenditureSelect}
          title="Thông tin phiếu thanh toán"
        />
      )}
    </div>
  );
}

export default ManageRevenueExpenditure;
