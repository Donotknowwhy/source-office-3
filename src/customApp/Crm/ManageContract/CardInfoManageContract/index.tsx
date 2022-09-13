import { fetchStart, fetchSuccess } from '@appRedux/CommonSlice';
import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { ModalWarning } from '@assets/icons/ModalWarning';
import { OPTIONS_SELECTED } from '@constants/button';
import { formatCurrencyVND, handleExportExcel } from '@util/utils';
import {
  getAllContract,
  setDataInfinityManageContract,
  setTotalManageContact,
  updateStatusContract
} from 'customApp/Crm/slice';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import FormModal from 'customComponents/FormModal';
import Status from 'customComponents/Status';
import TripleDotShowMoreComponent from 'customComponents/TripleDotShowMore';
import { useState } from 'react';
import { sentContract } from './CardInfoManageContract.helper';

enum labelType {
  NEW = 'Mới',
  SHARED = 'Đã chia',
  SUPPORTED = 'Đang chăm sóc',
  CARE = 'Quan tâm',
  NOT_CARE = 'Không quan tâm',
  NOT_CONTACT = 'Không liên lạc được'
}

const body = {
  page: 1,
  limit: 15,
  status: 1,
  search: '',
  filter: ['']
};

const dataTripleDot = [
  {
    id: '1',
    name: 'Xuất hợp đồng',
    value: OPTIONS_SELECTED.EXPORT_CONTRACT,
    text_red: false
  },
  // {
  //   id: '2',
  //   name: 'Gửi hợp đồng',
  //   value: OPTIONS_SELECTED.SEND_CONTRACT,
  //   text_red: false
  // },
  {
    id: '3',
    name: 'Xóa hợp đồng',
    value: OPTIONS_SELECTED.DELETE,
    text_red: true
  }
];

const CardInfoManageContract = ({ data, getId, setShowContent }) => {
  const statusSuccess = useAppSelector(
    (state) => state.crm.quote.statusSuccess
  );
  const detailInfo = useAppSelector(
    (state) => state.crm.manageContract.detailInfo
  );

  const [selectOption, setSelectOption] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleGetData = async (e, selectOption, id) => {
    if (selectOption === OPTIONS_SELECTED.EXPORT_CONTRACT && data) {
      const body = {
        contract_management_id: data?.id,
        data_management_id: data?.customer_id
      };
      await dispatch(fetchStart());
      const res = await handleExportExcel(
        'Hợp đồng CRM',
        'crm/contract/wordExport',
        'POST',
        body
      );
      await dispatch(fetchSuccess());
    } else {
      setOpen(!open);
      setSelectOption(selectOption);
      setId(id);
    }
  };

  const getValueForm = async (form, name) => {
    if (name === OPTIONS_SELECTED.CONVERT_CONTRACT) {
    } else if (name === OPTIONS_SELECTED.SEND_QUOTE) {
      // const res = await dispatch();
      // sendEmail({
      //   email: form.email,
      //   price_declaration_id: data?.id
      // })
      // if (res.payload.status === 200) {
      //   await setOpen(false);
      // }
    }
  };

  const renderModalConfirm = () => {
    switch (selectOption) {
      case OPTIONS_SELECTED.DELETE: {
        return (
          <FormModal
            widthModal={488}
            name={OPTIONS_SELECTED.DELETE}
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa hợp đồng"
            mainContent="Hợp đồng bạn đang chọn sẽ bị xóa khỏi danh sách hợp đồng. 
Bạn có chắc chắn về sự thay đổi này ?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggleOpen}
          />
        );
      }
      case OPTIONS_SELECTED.SEND_CONTRACT: {
        return (
          <FormComponent
            // data={data}
            nameForm={OPTIONS_SELECTED.SEND_CONTRACT}
            title="Gửi hợp đồng"
            colSpan={24}
            widthModal={540}
            modalVisible={open}
            onCancel={handleToggleOpen}
            formValue={sentContract}
            getValueForm={getValueForm}
            nameBtnAccept="Gửi"
          />
        );
      }

      default:
        break;
    }
  };
  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handleClickAcceptModal = async (name) => {
    if (name === OPTIONS_SELECTED.DELETE) {
      getId(id);
      setShowContent();
      const res = await dispatch(
        updateStatusContract({
          contract_management_id: id,
          status: 0
        })
      );

      const getAll = await dispatch(getAllContract(body));
      await dispatch(setDataInfinityManageContract(getAll?.payload?.data));
      await dispatch(setTotalManageContact(res?.payload?.total));

      if (res.payload.status === 200 || res.payload.status === 201) {
        setOpen(false);
      }
    }
  };

  return (
    <div className="card-infor" onClick={(e) => getId(data?.id)}>
      {renderModalConfirm()}
      <div className="gx-d-flex gx-justify-content-between">
        <p className="card-infor-name">
          {data?.price_declaration_code || data?.contract_code}
        </p>
        <span onClick={(event) => event.stopPropagation()}>
          <TripleDotShowMoreComponent
            data={dataTripleDot}
            idUser={data?.id}
            getData={handleGetData}
          />
        </span>
      </div>
      <p>{data?.customer_name}</p>
      <div className="gx-d-flex gx-justify-content-between gx-align-items-center">
        <p>{formatCurrencyVND(data?.price || data?.money_total)}</p>
        <span className="label">
          <Status
            status={data?.price_declaration_status || data?.contract_status}
          />
        </span>
      </div>
    </div>
  );
};

export default CardInfoManageContract;
