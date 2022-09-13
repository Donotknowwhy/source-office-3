import { selectAuthState } from '@appRedux/Authslice';
import { useAppSelector } from '@appRedux/hooks';
import { Add } from '@assets/icons/Add';
import { ModalWarning } from '@assets/icons/ModalWarning';
import { DATE_FORMAT, TIME_FORMAT } from '@constants/commons';
import FormModal from 'customComponents/FormModal';
import FormOneCol from 'customComponents/FormOneCol';
import TripleDotShowMoreComponent from 'customComponents/TripleDotShowMore';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteHistorySupportById,
  getCareHistoryType,
  getHistorySupport,
  selectCrmState
} from './../../customApp/Crm/slice';

type IProps = {
  data?: any;
};

const listFields = [
  {
    type: 'select',
    name: 'care_type_name',
    label: 'Loại chăm sóc',
    children: [
      {
        name: 'jack',
        value: 1
      },
      {
        name: 'jack1',
        value: 2
      },
      {
        name: 'jack2',
        value: 3
      }
    ],
    require: true
  },
  {
    type: 'input',
    label: 'Nội dung',
    name: 'care_content',
    require: true
  }
];

const dataTripleDot = [
  {
    id: '1',
    name: 'Sửa lịch sự chăm sóc ',
    value: 'edit',
    text_red: false
  },
  {
    id: '1',
    name: 'Xóa lịch sử chăm sóc',
    value: 'delete',
    text_red: true
  }
];

const HistorySupport: React.FC<IProps> = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modeModal, setModeModal] = useState('');
  const [chooseItem, setChooseItem] = useState<any>('');
  const { dataCommonById, dataCustomerById } = useAppSelector(selectCrmState);
  const { currentUser } = useAppSelector(selectAuthState);
  const pathname = useAppSelector(({ common }) => common.pathname);

  const [isModalDelete, setIsModalDelete] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCareHistoryType({ branch_id: currentUser?.staff?.branch_id }));
    dispatch(
      getHistorySupport({
        data_management_id:
          pathname === '/crm/manage-data'
            ? dataCommonById[0]?.id
            : dataCustomerById[0]?.id
      })
    );
  }, [
    dispatch,
    currentUser?.staff?.branch_id,
    dataCommonById,
    dataCustomerById,
    pathname
  ]);

  const renderModal = useCallback(() => {
    if (modeModal === 'add') {
      return (
        <FormOneCol
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          title="Thêm lịch sử chăm sóc"
          listFields={listFields}
          mode={modeModal}
        />
      );
    } else if (modeModal === 'edit') {
      return (
        <FormOneCol
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          title="Sửa lịch sử chăm sóc"
          listFields={listFields}
          mode={modeModal}
          data={chooseItem}
        />
      );
    } else {
      return null;
    }
  }, [modeModal, isModalVisible, chooseItem]);

  const handleOnClick = async (e, selectOption, id) => {
    if (selectOption === 'edit') {
      setModeModal('edit');
      setIsModalVisible(true);
    } else {
      setIsModalDelete(true);
    }
  };

  const handleSubmit = async () => {
    chooseItem && (await dispatch(deleteHistorySupportById(chooseItem?.id)));
    setIsModalDelete(false);
    await dispatch(
      getHistorySupport({
        data_management_id:
          pathname === '/crm/manage-data'
            ? dataCommonById[0]?.id
            : dataCustomerById[0]?.id
      })
    );
  };

  return (
    <div className="history-support">
      {data &&
        data?.map((item, index) => {
          return (
            <div className="history-support-card" key={index}>
              <div className="gx-d-flex gx-justify-content-between">
                <span style={{ wordBreak: 'break-all' }}>
                  {item?.care_type_name}:  {item?.care_content}  
                  <span className="text-disable">
                    {moment(item?.care_time).format(DATE_FORMAT)}
                  </span>
                </span>
                <span onClick={() => setChooseItem(item)}>
                  <TripleDotShowMoreComponent
                    data={dataTripleDot}
                    idUser={item?.id}
                    getData={handleOnClick}
                  />
                </span>
              </div>
              <p className="text-disable">
                {item?.creator} đã cập nhật lúc{' '}
                {moment(item?.care_time).format(TIME_FORMAT)}
              </p>
            </div>
          );
        })}
      <div className="gx-d-flex gx-align-items-center gx-mt-3">
        <span
          onClick={() => {
            setModeModal('add');
            setIsModalVisible(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          <Add />
        </span>
           <span>Thêm lịch sử chăm sóc</span>
      </div>
      {renderModal()}
      <FormModal
        open={isModalDelete}
        title="Thông báo"
        valueBtnAccept={'Đồng ý'}
        valueBtnCancel="Hủy"
        headingContent={'Xóa lịch sử chăm sóc'}
        mainContent={
          'Lịch sử chăm sóc bạn chọn sẽ bị xoá khỏi danh sách Bạn có chắc chắn về sự thay đổi này ?'
        }
        iconPopup={<ModalWarning />}
        handleClickAccept={handleSubmit}
        handleClickCancel={() => {
          setIsModalDelete(false);
        }}
      />
    </div>
  );
};

export default HistorySupport;
