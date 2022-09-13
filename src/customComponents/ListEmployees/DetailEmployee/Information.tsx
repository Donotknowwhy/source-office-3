import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { EditForm } from '@assets/icons/EditForm';
import ButtonCustom from '@components/Button';
import { TAB_COMMON } from '@constants/commons';
import { Row } from 'antd';
import FormEditHRM from 'customApp/HRM/HRMManageAccount/Form/HRM/FormEditHRM';
import { viewEmployeeHRM } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import {
  getDetailUserInformation,
  getListHRM,
  updateGenInfo
} from 'customApp/HRM/HRMManageAccount/slice';
import FormCustomNoModal from 'customComponents/Form';
import { useEffect, useState } from 'react';
import { IInformation } from './DetailEmployee.type';

const Information = ({ dataInformation }: IInformation) => {
  const ACTION_API = 'listStaff';
  const STATUS_API = 1;
  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const pathname = useAppSelector(({ common }) => common.pathname);

  const idEmployee = useAppSelector((state) => state.HRMSlice.idEmployee);

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [dataHandle, setDataHandle] = useState([]);

  useEffect(() => {
    if (dataInformation.data) {
      const convertData = dataInformation?.data?.map((item) => {
        const obj = {} as any;
        if (item?.attachments) {
          obj.attachments = JSON.parse(item?.attachments);
        }
        if (item?.avatar) {
          obj.avatar = JSON.parse(item?.avatar);
        }
        return {
          ...item,
          ...obj
        };
      });
      setDataHandle(convertData);
    }
  }, [dataInformation.data]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCancel = () => {
    setOpen(!open);
  };

  const getValueForm = async (formValue, name) => {
    setOpen(false);
    if (formValue) {
      await dispatch(
        updateGenInfo({
          ...formValue,
          company_id: authState.company_id,
          staff_id: idEmployee
        })
      );
      await dispatch(getDetailUserInformation({ staff_id: idEmployee }));
      const req = {
        page: 1,
        limit: 15,
        search: '',
        action: ACTION_API,
        status: STATUS_API,
        branch_id: authState.branch_id,
        filter: ''
      };
      await dispatch(getListHRM(req));
    }
  };

  return (
    <div>
      {dataHandle.length > 0 && (
        <FormEditHRM
          data={dataInformation?.data[0]}
          title="Sửa thông tin nhân sự"
          modalVisible={open}
          onCancel={handleCancel}
          getValueForm={getValueForm}
          dataAttachments={dataHandle[0].attachments}
          dataAvatar={dataHandle[0].avatar}
        />
      )}
      <Row
        className="gx-justify-content-between gx-align-items-center gx-pl-4 gx-pt-4 gx-pr-4 gx-pb-0"
        gutter={[15, 0]}
      >
        <div className="form-custom-no-modal-title">Thông tin cá nhân</div>
        {pathname !== '/hrm/storage' && (
          <ButtonCustom
            iconLeft={<EditForm />}
            value=""
            name={TAB_COMMON.TAB1}
            onClick={handleClick}
            className=""
            background={'color-white'}
          />
        )}
      </Row>
      <FormCustomNoModal
        data={dataInformation?.data[0]}
        nameForm={TAB_COMMON.TAB1}
        colSpan={12}
        widthModal={1016}
        modalVisible={true}
        formValue={viewEmployeeHRM}
      />
    </div>
  );
};

export default Information;
