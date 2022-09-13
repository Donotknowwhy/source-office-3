import { useState, useEffect } from 'react';
import { Button, Input, Dropdown, Divider, Checkbox, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import Icon from '@ant-design/icons';
import ManageAccount from '../index';
import FormModal from 'customComponents/FormModal';
import ModalAccount from './ModalAccount';
import { FilterIcon } from '@assets/icons/FilterIcon';
import { PlusIcon } from '@assets/icons/PlusIcon';
import { Delete } from '@assets/icons/Delete';
import { ModalWarning } from '@assets/icons/ModalWarning';
import { useAppSelector } from '@appRedux/hooks';
import {
  deleteAccount,
  postAccount,
  changeFilter,
  getAccounts
} from '../slices';
import { BANK, CASH, INPUT_ACCOUNT } from '../../constants';

const { Search } = Input;
export default function ListAccount() {
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [filterCheckbox, setFilterCheckbox] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const { accountDeletes, account_type, current, pageSize } = useAppSelector(
    (state) => state.ManageAccount
  );

  useEffect(() => {
    setSearchValue('');
  }, [current, pageSize]);

  useEffect(() => {
    setFilterCheckbox([account_type]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PlusIconRefactor = (props) => <Icon component={PlusIcon} {...props} />;
  const FilterIconRefactor = (props) => (
    <Icon component={FilterIcon} {...props} />
  );
  const DeleteRefactor = (props) => <Icon component={Delete} {...props} />;

  const handleCancel = () => {
    setIsVisibleDelete(!isVisibleDelete);
  };

  const handleSubmit = () => {
    setIsVisibleDelete(!isVisibleDelete);
    dispatch(deleteAccount({ accountDeletes, isAccountBackup: false }));
  };

  const onSubmitModal = (values) => {
    setIsVisibleForm(false);
    dispatch(postAccount(values));
    setFilterCheckbox([]);
  };

  const onCancelModal = () => {
    setIsVisibleForm(false);
  };

  const onChange = (data) => {
    dispatch(changeFilter(data));
    setFilterCheckbox([...data]);
  };

  // ========================== Search
  const handleSearch = (value) => {
    dispatch(
      getAccounts({
        isAccountBackup: false,
        search: value,
        page: current,
        limit: pageSize
      })
    );
  };

  const menu = (
    <>
      <div className="dropdown-filter-btn">
        <p>Loại tài khoản</p>
        <Divider />
        <Checkbox.Group value={filterCheckbox} onChange={onChange}>
          <Row>
            <Col span={24} className="gx-py-1">
              <Checkbox value={BANK}>{BANK}</Checkbox>
            </Col>
            <Col span={24} className="gx-py-1">
              <Checkbox value={CASH}>{CASH}</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </div>
    </>
  );

  return (
    <ManageAccount isAccountBackup={false}>
      <div className="gx-d-flex gx-align-items-center gx-justify-content-between">
        <Search
          placeholder={INPUT_ACCOUNT}
          onChange={(event) => setSearchValue(event.target?.value)}
          onSearch={handleSearch}
          style={{ width: 500 }}
          className="acm__input gx-mb-2 input-search"
          value={searchValue}
        />
        <div className="gx-d-flex gx-justify-content-end">
          <Button
            onClick={() => setIsVisibleForm(true)}
            className="gx-mb-2"
            type="primary"
            icon={<PlusIconRefactor />}
          >
            Thêm tài khoản
          </Button>
          <Button
            onClick={() => setIsVisibleDelete(true)}
            className="gx-mb-2"
            type="primary"
            disabled={!!!accountDeletes.length}
            icon={<DeleteRefactor />}
          >
            Xóa
          </Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button
              className="gx-mb-2"
              type="primary"
              icon={<FilterIconRefactor />}
            >
              Lọc tài khoản
            </Button>
          </Dropdown>
        </div>
      </div>

      <FormModal
        open={isVisibleDelete}
        title="Thông báo"
        valueBtnAccept="Xác nhận"
        valueBtnCancel="Hủy"
        headingContent="Xóa Tài khoản"
        mainContent="Tài khoản bị xóa sẽ chuyển vào mục Lưu trữ. 
        Bạn có chắc chắn xóa tài khoản?"
        iconPopup={<ModalWarning />}
        handleClickAccept={handleSubmit}
        handleClickCancel={handleCancel}
      />
      {isVisibleForm && (
        <ModalAccount
          isModalVisible={isVisibleForm}
          onSubmit={onSubmitModal}
          onCancel={onCancelModal}
        />
      )}
    </ManageAccount>
  );
}
