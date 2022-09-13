import { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import Icon from '@ant-design/icons';
import ManageAccount from '../index';
import FormModal from 'customComponents/FormModal';
import { Delete } from '@assets/icons/Delete';
import { Restore } from '@assets/icons/Restore';
import { ModalWarning } from '@assets/icons/ModalWarning';
import { useAppSelector } from '@appRedux/hooks';
import { deleteAccount, putStatusAccount, getAccounts } from '../slices';
import { INPUT_ACCOUNT } from '../../constants';

const { Search } = Input;

export default function StorageAcm() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const { accountDeletes, current, pageSize } = useAppSelector(
    (state) => state.ManageAccount
  );

  useEffect(() => {
    setSearchValue('');
  }, [current, pageSize]);

  const DeleteRefactor = (props) => <Icon component={Delete} {...props} />;
  const RestoreRefactor = (props) => <Icon component={Restore} {...props} />;

  const handleCancel = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  const handleSubmit = () => {
    setIsVisibleModal(!isVisibleModal);
    isDeleteModal
      ? dispatch(deleteAccount({ accountDeletes, isAccountBackup: true }))
      : dispatch(putStatusAccount(accountDeletes));
  };

  // ========================== Search
  const handleSearch = (value) => {
    dispatch(
      getAccounts({
        isAccountBackup: true,
        search: value,
        page: current,
        limit: pageSize
      })
    );
  };

  return (
    <ManageAccount isAccountBackup>
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
            onClick={() => {
              setIsDeleteModal(false);
              setIsVisibleModal(true);
            }}
            className="gx-mb-2"
            type="primary"
            disabled={!!!accountDeletes.length}
            icon={<RestoreRefactor />}
          >
            Khôi phục
          </Button>
          <Button
            danger
            onClick={() => {
              setIsDeleteModal(true);
              setIsVisibleModal(true);
            }}
            className="gx-mb-2"
            type="primary"
            disabled={!!!accountDeletes.length}
            icon={<DeleteRefactor />}
          >
            Xóa
          </Button>
        </div>
      </div>
      <FormModal
        open={isVisibleModal}
        title="Thông báo"
        valueBtnAccept={isDeleteModal ? 'Xác nhận' : 'Đồng ý'}
        valueBtnCancel="Hủy"
        headingContent={isDeleteModal ? 'Xóa Tài khoản' : 'Khôi phục tài khoản'}
        mainContent={
          isDeleteModal
            ? `Tài khoản bị xóa sẽ bị xóa vĩnh viễn. 
        Bạn có chắc chắn xóa tài khoản`
            : `Tài khoản khôi phục sẽ chuyển danh sách tài khoản ban đầu.
        Bạn có chắc chắn về sự thay đổi này?`
        }
        iconPopup={<ModalWarning />}
        handleClickAccept={handleSubmit}
        handleClickCancel={handleCancel}
      />
    </ManageAccount>
  );
}
