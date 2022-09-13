import { ReactNode, useState, useEffect, memo } from 'react';
import { Table, Checkbox } from 'antd';
import HeaderLayout from 'customComponents/HeaderLayout';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@appRedux/hooks';
import ModalAccount from './ListAccount/ModalAccount';
import {
  getAccounts,
  putAccount,
  changeCurrent,
  changePageSize
} from './slices';
import { selectSingleCheckbox, selectMultiCheckbox } from './slices';
import { IAccount } from './modules';
import { formatCurrency } from 'util/utils';
import { DEFAULT_VALUE_INPUT } from '@constants/index';

interface IManageProps {
  children?: ReactNode;
  isAccountBackup?: boolean;
}

export const ManageAccount = ({ children, isAccountBackup }: IManageProps) => {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [accountSelect, setAccountSelect] = useState<IAccount>();

  const dispatch = useDispatch();
  const {
    accounts,
    checkBoxes,
    checkBoxMulti,
    account_type,
    total,
    timeErrorDelete,
    current,
    pageSize
  } = useAppSelector((state) => state.ManageAccount);

  useEffect(() => {
    dispatch(
      getAccounts({
        account_type,
        isAccountBackup,
        page: current,
        limit: pageSize
      })
    );
  }, [
    dispatch,
    isAccountBackup,
    account_type,
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

  const handleShowDetail = (data) => {
    setAccountSelect(data);
    setIsVisibleForm(true);
  };

  const onSubmitModal = (values) => {
    setIsVisibleForm(false);
    const finalAccountSelect = {
      ...accountSelect,
      account_name: values.account_name,
      account_type: values.account_type,
      surplus: values.surplus,
      account_number: values.account_number,
      bank_code: values.bank_code
    };
    dispatch(putAccount(finalAccountSelect));
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
      title: 'STT',
      dataIndex: 'id',
      width: '48px',
      render: (id: number, _, index: number) => (
        <span>{(current - 1) * pageSize + index + 1}</span>
      )
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'account_name',
      width: 'auto'
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'account_type',
      width: '175px'
    },
    {
      title: 'Ngân hàng',
      dataIndex: 'bank_code',
      width: 'auto',
      render: (bank_code) => <div>{bank_code || DEFAULT_VALUE_INPUT}</div>
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'account_number',
      width: '250px',
      render: (account_number) => (
        <div>{account_number || DEFAULT_VALUE_INPUT}</div>
      )
    },
    {
      title: 'Số dư',
      dataIndex: 'surplus',
      className: 'gx-text-right',
      key: 'balance',
      render: (balance) => (
        <div className="gx-text-right">{formatCurrency(balance as number)}</div>
      )
    },
    {
      title: (
        <Checkbox
          checked={checkBoxMulti}
          onChange={handleMultiCheckbox}
          disabled={!!!accounts.length}
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
    }
  ];

  return (
    <div className="manage-account acm">
      {children}
      <HeaderLayout title="Quản lí tài khoản" />
      <Table
        onRow={(data) => {
          return {
            onClick: () => !isAccountBackup && handleShowDetail(data)
          };
        }}
        columns={columns}
        dataSource={accounts || []}
        rowKey="id"
        className={!isAccountBackup && 'table-cursor'}
        pagination={{
          current,
          pageSize,
          total,
          showTotal: (totalRecord) => `${totalRecord} Tài khoản`,
          onChange: onNextPage,
          showSizeChanger: true
        }}
      />
      {isVisibleForm && (
        <ModalAccount
          title="Thông tin chi tiết tài khoản"
          isModalVisible={isVisibleForm}
          onSubmit={onSubmitModal}
          onCancel={onCancelModal}
          accountSelect={accountSelect}
        />
      )}
    </div>
  );
};

export default memo(ManageAccount);
