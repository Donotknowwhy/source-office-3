import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { AddForm } from '@assets/icons/AddForm';
import { EditForm } from '@assets/icons/EditForm';
import { ModalWarning } from '@assets/icons/ModalWarning';
import ButtonCustom from '@components/Button';
import { TAB_COMMON } from '@constants/commons';
import classNames from 'classnames';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import FormEditOnly from 'customApp/HRM/HRMManageAccount/Form/HRM/FormEditOnly';
import {
  createLaborContract,
  getDetailUserHRM,
  updateLaborContract
} from 'customApp/HRM/HRMManageAccount/slice';
import FormCustomNoModal from 'customComponents/Form';
import FormModal from 'customComponents/FormModal';
import { useEffect, useState } from 'react';
import { dataLaborContract } from './DetailEmployee.helper';

const LaborContract = ({ dataContract }: any) => {
  const dispatch = useAppDispatch();
  const pathname = useAppSelector(({ common }) => common.pathname);
  const [selected, setSelected] = useState('');
  const [dataHandle, setDataHandle] = useState<any>([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [formConfirm, setFormConfirm] = useState('');

  const getId = useAppSelector((state) => state.HRMSlice.idEmployee);

  const { data } = dataContract;

  const [open, setOpen] = useState(false);

  const handleClick = (e, id, name) => {
    if (name === TAB_COMMON.TAB1) {
      if (true) {
        setOpenConfirmModal(true);
        setFormConfirm(TAB_COMMON.TAB1);
      }
    } else {
      setOpen(!open);
      setSelected(e.target.name);
    }
  };

  useEffect(() => {
    if (data) {
      const convertData = data.map((item) => {
        if (item?.attachments) {
          return {
            ...item,
            // eslint-disable-next-line
            ['attachments']: JSON.parse(item?.attachments)
          };
        }
        return { ...item };
      });

      setDataHandle(convertData);
    }
  }, [data]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const getValueForm = async (formValue, name) => {
    formValue.staff_id = getId;

    if (name === TAB_COMMON.TAB1) {
      const res = await dispatch(
        createLaborContract({ ...formValue, staff_id: getId })
      );
      await dispatch(
        getDetailUserHRM({
          staff_id: getId
        })
      );
      if (res.payload.status === 200 || res.payload.status === 201) {
        setOpen(false);
      }
    } else if (name === TAB_COMMON.TAB2) {
      const req = {
        ...formValue,
        contract_id: data[0].id
      };

      const res = await dispatch(updateLaborContract(req));
      await dispatch(
        getDetailUserHRM({
          staff_id: getId
        })
      );
      if (res.payload.status === 200) {
        setOpen(false);
      }
    }
  };

  const handleClickAcceptModal = async (name) => {
    if (name === TAB_COMMON.TAB1) {
      setOpenConfirmModal(false);
      setOpen(true);
      setSelected(name);
    }
  };
  const handleCancelModal = () => {
    setOpenConfirmModal(false);
  };

  const renderModalConfirm = () => {
    switch (formConfirm) {
      case TAB_COMMON.TAB1: {
        return (
          <FormModal
            name={TAB_COMMON.TAB1}
            open={openConfirmModal}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Tạo hợp đồng mới"
            mainContent="Hợp đồng cũ sẽ không còn hiệu lực và lưu trong phần lưu trữ
Bạn có chắc chắn về thao tác này?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleCancelModal}
          />
        );
      }

      default:
        break;
    }
  };

  const handleRenderModal = () => {
    switch (selected) {
      case TAB_COMMON.TAB1: {
        return (
          <FormComponent
            nameForm={TAB_COMMON.TAB1}
            colSpan={12}
            widthModal={1016}
            title="Tạo hợp đồng mới"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={dataLaborContract}
            getValueForm={getValueForm}
            action="hrm/updateFileLaborContract"
          />
        );
      }
      case TAB_COMMON.TAB2: {
        return (
          <>
            {dataHandle.length > 0 && (
              <FormEditOnly
                data={dataHandle[0]}
                nameForm={TAB_COMMON.TAB2}
                colSpan={12}
                widthModal={1016}
                title="Cập nhật hợp đồng"
                modalVisible={open}
                onCancel={handleToggle}
                formValue={dataLaborContract}
                getValueForm={getValueForm}
                action="hrm/updateFileLaborContract"
                attachmentsData={dataHandle[0]?.attachments}
              />
            )}
          </>
        );
      }

      default:
        break;
    }
  };

  return (
    <div>
      <div
        className={classNames(
          'gx-d-flex gx-justify-content-end gx-pl-3 gx-pt-3 gx-pr-3 gx-align-items-center ',
          {
            'gx-justify-content-between': data.length > 0
          }
        )}
      >
        {data.length > 0 && <div>Hợp đồng lao động</div>}

        {pathname !== '/hrm/storage' && (
          <div className="gx-d-flex">
            <ButtonCustom
              iconLeft={<AddForm />}
              name={TAB_COMMON.TAB1}
              value=""
              onClick={handleClick}
              background={'color-white'}
              MarginLeftButton={false}
            />
            {data.length > 0 && (
              <ButtonCustom
                name={TAB_COMMON.TAB2}
                value=""
                iconLeft={<EditForm />}
                onClick={handleClick}
                background={'color-white'}
                MarginLeftButton={false}
              />
            )}
          </div>
        )}
      </div>
      {renderModalConfirm()}
      {handleRenderModal()}

      {data.length > 0 ? (
        <>
          <FormCustomNoModal
            data={dataContract.data[0]}
            nameForm={TAB_COMMON.TAB1}
            colSpan={12}
            widthModal={1016}
            title="Hợp đồng lao động"
            modalVisible={open}
            formValue={dataLaborContract}
          />
        </>
      ) : null}
    </div>
  );
};

export default LaborContract;
