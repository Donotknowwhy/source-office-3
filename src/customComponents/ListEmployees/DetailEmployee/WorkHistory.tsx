import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { Add } from '@assets/icons/Add';
import ButtonCustom from '@components/Button';
import { OPTIONS_SELECTED } from '@constants/button';
import { formatDateENGB, TAB_COMMON } from '@constants/commons';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import FormEditOnly from 'customApp/HRM/HRMManageAccount/Form/HRM/FormEditOnly';
import {
  createWorkingHistory,
  deleteWorkHistory,
  getDetailUserWorkingHistory,
  updateWorkHistory
} from 'customApp/HRM/HRMManageAccount/slice';
import TripleDotShowMoreComponent from 'customComponents/TripleDotShowMore';
import { dataDeleteAndEditOnly } from 'customComponents/TripleDotShowMore/tripleDot.helper';
import { useEffect, useState } from 'react';
import { dataWorkingHistoryForm } from './DetailEmployee.helper';
import { IDataWorking } from './DetailEmployee.type';
import ParseJSON from './ParseJSON';

const WorkHistory = ({ dataWorking }: IDataWorking) => {
  const pathname = useAppSelector(({ common }) => common.pathname);
  const idSelected = useAppSelector((state) => state.HRMSlice.idEmployee);
  const [dataSelect, setDataSelect] = useState([]);
  const [dataHandle, setDataHandle] = useState([]);
  const { data } = dataWorking;
  const [selected, setSelected] = useState('');
  const [activeForm, setActiveForm] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setOpen(!open);
  };

  const getValueForm = async (formData, name) => {
    setOpen(false);
    setActiveForm(name);

    if (name === TAB_COMMON.TAB1) {
      const body = {
        ...formData,
        staff_id: idSelected
      };

      await dispatch(createWorkingHistory(body));
      await dispatch(
        getDetailUserWorkingHistory({
          staff_id: idSelected
        })
      );
    } else if (name === OPTIONS_SELECTED.EDIT) {
      const body = {
        ...formData,
        work_history_id: dataSelect[0].id
      };
      await dispatch(updateWorkHistory(body));
      await dispatch(
        getDetailUserWorkingHistory({
          staff_id: idSelected
        })
      );
    }
    return;
  };

  const handleGetData = async (e, selectOption, id) => {
    setActiveForm(selectOption);

    if (id) {
      const dataSelected = data.filter((item) => item.id === id);
      setDataSelect(dataSelected);
    }

    if (selectOption === OPTIONS_SELECTED.DELETE) {
      const body = {
        work_history_id: id
      };
      await dispatch(deleteWorkHistory(body));
      await dispatch(
        getDetailUserWorkingHistory({
          staff_id: idSelected
        })
      );
    } else if (selectOption === OPTIONS_SELECTED.EDIT) {
      setOpen(!open);
    }
    return;
  };

  const renderForm = () => {
    switch (activeForm) {
      case OPTIONS_SELECTED.EDIT: {
        return (
          <FormEditOnly
            data={dataSelect[0]}
            nameForm={OPTIONS_SELECTED.EDIT}
            colSpan={12}
            widthModal={1016}
            title="Sửa Lịch sử công tác"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={dataWorkingHistoryForm}
            getValueForm={getValueForm}
            attachmentsData={dataHandle[0]?.attachments}
            action={'hrm/updateFileWorkHistory'}
          />
        );
      }

      default: {
        return <></>;
      }
    }
  };

  const handleClick = (e) => {
    setOpen(!open);
    setSelected(e.target.name);
  };

  const handleRenderModal = () => {
    switch (selected) {
      case TAB_COMMON.TAB1: {
        return (
          <FormComponent
            nameForm={TAB_COMMON.TAB1}
            colSpan={12}
            widthModal={1016}
            title="Thêm lịch sử công việc"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={dataWorkingHistoryForm}
            getValueForm={getValueForm}
            action="hrm/updateFileWorkHistory"
          />
        );
      }

      default:
        break;
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
        return {
          ...item
        };
      });

      setDataHandle(convertData);
    }
  }, [data]);

  return (
    <div className="gx-m-3 gx-pt-3">
      {handleRenderModal()}

      {renderForm()}

      {data.length === 0 ? (
        <></>
      ) : (
        data.map((item) => {
          const parseJSON = JSON.parse(item?.attachments);
          return (
            <div
              className="detail-employee-working-history gx-mb-2"
              key={item?.id}
            >
              <div className="detail-employee-working-history__date">
                <span className="detail-employee-working-history__date--text">
                  {formatDateENGB(item?.date)}
                </span>
              </div>
              <div className="detail-employee-working-history__main-content gx-pt-4">
                <div className="gx-d-flex gx-justify-content-between gx-mr-4">
                  <div className="detail-employee-working-history__title gx-pb-1">
                    {item?.event}
                  </div>
                  <div>
                    <TripleDotShowMoreComponent
                      idUser={item?.id}
                      getData={handleGetData}
                      data={dataDeleteAndEditOnly}
                    />
                  </div>
                </div>

                <p className="detail-employee-working-history__description">
                  {item?.description}
                </p>

                <ParseJSON data={parseJSON} />
              </div>
            </div>
          );
        })
      )}

      {pathname !== '/hrm/storage' && (
        <div
          className="gx-d-flex gx-align-items-center"
          // data.length === 0
        >
          <ButtonCustom
            iconLeft={<Add />}
            value=""
            name={TAB_COMMON.TAB1}
            onClick={handleClick}
            background={'color-white'}
            MarginLeftButton={false}
          />
          <span>Thêm lịch sử công tác</span>
        </div>
      )}
    </div>
  );
};

export default WorkHistory;
