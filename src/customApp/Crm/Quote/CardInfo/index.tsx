import { fetchStart, fetchSuccess } from '@appRedux/CommonSlice';
import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { ModalWarning } from '@assets/icons/ModalWarning';
import { OPTIONS_SELECTED } from '@constants/button';
import { formatCurrencyVND, handleExportExcel } from '@util/utils';
import {
  clearTest,
  createContract,
  deletePriceDeclaration,
  getAllPriceDeclaration,
  sendEmail,
  setDataInfinityQuote,
  setPageQuote,
  updateStatusPriceDeclaration
} from 'customApp/Crm/slice';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import FormModal from 'customComponents/FormModal';
import Status from 'customComponents/Status';
import TripleDotShowMoreComponent from 'customComponents/TripleDotShowMore';
import { useState } from 'react';
import FormMoveContractManagement from '../FormMoveContractManagement';
import { sentCode } from './CardInfo';

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
  limit: 10,
  status: 1,
  search: ''
};

const dataTripleDot = [
  {
    id: '2',
    name: 'Xuất báo giá',
    value: OPTIONS_SELECTED.EXPORT_QUOTE,
    text_red: false
  },
  {
    id: '3',
    name: 'Gửi báo giá',
    value: OPTIONS_SELECTED.SEND_QUOTE,
    text_red: false
  },
  {
    id: '4',
    name: 'Xóa báo giá',
    value: OPTIONS_SELECTED.DELETE,
    text_red: true
  }
];

export interface ICardInfor {
  data: ICardInforData;
  getId: (id: string | number) => void;
  setShowContent: () => void;
}

export interface ICardInforData {
  customer_name: string;
  id: number;
  money_total: any;
  price_declaration_code: string;
  price_declaration_status: string;
}

const CardInfor = ({ data, getId, setShowContent }: ICardInfor) => {
  const pathname = useAppSelector(({ common }) => common);

  const { loading, error } = pathname;
  const detailInfo = useAppSelector(
    (state) => state.crm.quote.detailInfor.data
  );
  const [selectOption, setSelectOption] = useState();

  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleGetData = async (e, selectOption, id) => {
    if (id) {
      setId(id);
    }

    if (selectOption === OPTIONS_SELECTED.EXPORT_QUOTE && data) {
      const body = {
        price_declaration_id: id
      };
      await dispatch(fetchStart());
      await handleExportExcel(
        'Báo giá CRM',
        'crm/declaration/pdfExport',
        'POST',
        body
      );
      await dispatch(fetchSuccess());
    } else {
      setOpen(!open);
      setSelectOption(selectOption);
    }
  };

  const handleToggleOpen = () => {
    setOpen(!open);
  };
  const getValueForm = async (form, name) => {
    if (name === OPTIONS_SELECTED.CONVERT_CONTRACT) {
    } else if (name === OPTIONS_SELECTED.SEND_QUOTE) {
      const res = await dispatch(
        sendEmail({
          email: form.email,
          price_declaration_id: data?.id
        })
      );
      if (res.payload.status === 200) {
        await setOpen(false);
      }
    }
  };

  const renderModalConfirm = () => {
    switch (selectOption) {
      case OPTIONS_SELECTED.EXPORT_QUOTE: {
        return (
          <FormModal
            widthModal={488}
            name={OPTIONS_SELECTED.EXPORT_QUOTE}
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa báo giá"
            mainContent="Báo giá bạn đang chọn sẽ bị xóa khỏi danh sách báo giá.
 Bạn có chắc chắn về sự thay đổi này ?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggleOpen}
          />
        );
      }
      case OPTIONS_SELECTED.SEND_QUOTE: {
        return (
          <FormComponent
            data={data}
            nameForm={OPTIONS_SELECTED.SEND_QUOTE}
            title="Gửi báo giá"
            colSpan={24}
            widthModal={540}
            modalVisible={open}
            onCancel={handleToggleOpen}
            formValue={sentCode}
            getValueForm={getValueForm}
          />
        );
      }
      case OPTIONS_SELECTED.DELETE: {
        return (
          <FormModal
            widthModal={488}
            name={OPTIONS_SELECTED.DELETE}
            open={open}
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa báo giá"
            mainContent="Báo giá bạn đang chọn sẽ bị xóa khỏi danh sách báo giá.
 Bạn có chắc chắn về sự thay đổi này ?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggleOpen}
          />
        );
      }
    }
  };

  const handleClickAcceptModal = async (name) => {
    if (name === OPTIONS_SELECTED.DELETE) {
      setShowContent();
      const res = await dispatch(
        updateStatusPriceDeclaration({
          price_declaration_id: id,
          status: 0
        })
      );

      const refreshData = await dispatch(getAllPriceDeclaration(body));
      if (res.payload.status === 200) {
        setOpen(false);
        if (refreshData?.payload?.status === 200) {
          dispatch(setDataInfinityQuote(refreshData?.payload?.data));
          dispatch(setPageQuote(1));
        }
      }
    }
  };

  return (
    <div className="card-infor" onClick={(e) => getId(data?.id)}>
      {renderModalConfirm()}
      <div className="gx-d-flex gx-justify-content-between">
        <p className="card-infor-name">{data?.price_declaration_code}</p>
        <span onClick={(e) => e.stopPropagation()}>
          <TripleDotShowMoreComponent
            data={dataTripleDot}
            idUser={data?.id}
            getData={handleGetData}
          />
        </span>
      </div>
      <p>{data?.customer_name}</p>
      <div className="gx-d-flex gx-justify-content-between gx-align-items-center">
        <p>{formatCurrencyVND(data?.money_total)}</p>
        <span className="label">
          <Status status={data?.price_declaration_status} />
        </span>
      </div>
    </div>
  );
};

export default CardInfor;
