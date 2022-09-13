import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { ModalWarning } from '@assets/icons/ModalWarning';
import ButtonCustom from '@components/Button';
import { NAME_BUTTON } from '@constants/button';
import { TAB_COMMON } from '@constants/commons';
import { managementAccount } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import {
  deleteAccountUser,
  getAccount,
  updateAccount
} from 'customApp/HRM/HRMManageAccount/slice';
import FormCustomNoModal from 'customComponents/Form';
import FormModal from 'customComponents/FormModal';
import { useState } from 'react';
import { IGOfficeAccount } from './DetailEmployee.type';

const GOfficeAccount = ({ dataAccount }: IGOfficeAccount) => {
  console.log('day la data', dataAccount);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState('');
  const pathname = useAppSelector(({ common }) => common.pathname);
  const idSelected = useAppSelector((state) => state.HRMSlice.idEmployee);

  const handleClick = async (e, id, name) => {
    setOpen(!open);
    setSelect(name);
  };

  const handleClickAcceptModal = async (name) => {
    if (name === NAME_BUTTON.RESET_PASSWORD) {
      const bodyUpdateAccount = {
        staff_id: idSelected,
        password: (Math.random() + 1).toString(36).substring(2)
      };
      const res = await dispatch(updateAccount(bodyUpdateAccount));
      if (res.payload.status === 200) {
        setOpen(false);
      }
    } else if (name === NAME_BUTTON.DELETE) {
      const res = await dispatch(
        deleteAccountUser({
          staff_id: idSelected
        })
      );
      await dispatch(
        getAccount({
          staff_id: idSelected
        })
      );

      if (res.payload.status === 200) {
        setOpen(false);
      }
    }
  };

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const renderForm = () => {
    switch (select) {
      case NAME_BUTTON.RESET_PASSWORD: {
        return (
          <FormModal
            name={NAME_BUTTON.RESET_PASSWORD}
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xác nhận đặt lại mật khẩu"
            mainContent="Mật khẩu sẽ được đặt lại. 
Bạn có chắc chắn về sự thay đổi này?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggleOpen}
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
            headingContent="Xóa tài khoản nhân sự"
            mainContent="Tài khoản nhân sự bạn chọn sẽ bị xóa.
Bạn có chắc chắn về sự thay đổi này?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggleOpen}
          />
        );
      }

      default:
        break;
    }
  };

  return (
    <div>
      {renderForm()}
      {dataAccount.data.length > 0 ? (
        <>
          <FormCustomNoModal
            data={dataAccount[0]}
            nameForm={TAB_COMMON.TAB1}
            colSpan={12}
            widthModal={1016}
            title="Thêm thông tin chi nhánh"
            modalVisible={true}
            formValue={managementAccount}
          />
          <div className="gx-d-flex gx-justify-content-end gx-p-3">
            {pathname !== '/hrm/storage' && (
              <>
                <ButtonCustom
                  value="Đặt lại mật khẩu"
                  name={NAME_BUTTON.RESET_PASSWORD}
                  onClick={handleClick}
                />
                <ButtonCustom
                  value="Xóa tài khoản"
                  name={NAME_BUTTON.DELETE}
                  background="color-delete"
                  onClick={handleClick}
                />
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default GOfficeAccount;
