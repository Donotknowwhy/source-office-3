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
            valueBtnAccept="X??c nh???n"
            valueBtnCancel="H???y"
            headingContent="X??c nh???n ?????t l???i m???t kh???u"
            mainContent="M???t kh???u s??? ???????c ?????t l???i. 
B???n c?? ch???c ch???n v??? s??? thay ?????i n??y?"
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
            valueBtnAccept="X??c nh???n"
            valueBtnCancel="H???y"
            headingContent="X??a t??i kho???n nh??n s???"
            mainContent="T??i kho???n nh??n s??? b???n ch???n s??? b??? x??a.
B???n c?? ch???c ch???n v??? s??? thay ?????i n??y?"
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
            title="Th??m th??ng tin chi nh??nh"
            modalVisible={true}
            formValue={managementAccount}
          />
          <div className="gx-d-flex gx-justify-content-end gx-p-3">
            {pathname !== '/hrm/storage' && (
              <>
                <ButtonCustom
                  value="?????t l???i m???t kh???u"
                  name={NAME_BUTTON.RESET_PASSWORD}
                  onClick={handleClick}
                />
                <ButtonCustom
                  value="X??a t??i kho???n"
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
