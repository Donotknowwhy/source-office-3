import { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Dropdown,
  Divider,
  Checkbox,
  Row,
  Col,
  DatePicker
} from 'antd';
import { useDispatch } from 'react-redux';
import Icon from '@ant-design/icons';
import FormModal from 'customComponents/FormModal';
import ModalRevenueExpenditure from './ModalRevenueExpenditure';
import { FilterIcon } from '@assets/icons/FilterIcon';
import { PlusIcon } from '@assets/icons/PlusIcon';
import { Delete } from '@assets/icons/Delete';
import { ExportExcel } from '@assets/icons/ExportExcel';
import { ModalWarning } from '@assets/icons/ModalWarning';
import { useAppSelector } from '@appRedux/hooks';
import {
  changeSinceDate,
  changeToDate,
  postRevenueExpenditures,
  changeFilter,
  deleteRevenueExpenditure,
  getRevenueExpenditures
} from './slices';
import { RECEIPT, PAYMENT, INPUT_ACCOUNT } from '../constants';
import { formatDate, handleExportExcel } from 'util/utils';
import { YYYY_MM_DD } from 'constants/commons';

const { Search } = Input;

export default function ListAccount() {
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [filterCheckbox, setFilterCheckbox] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const {
    revenueExpendituresDeletes,
    vote_type,
    account_id,
    current,
    pageSize
  } = useAppSelector((state) => state.RevenueExpenditureSlice);

  useEffect(() => {
    setFilterCheckbox([vote_type]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchValue('');
  }, [current, pageSize]);

  const PlusIconRefactor = (props) => <Icon component={PlusIcon} {...props} />;
  const FilterIconRefactor = (props) => (
    <Icon component={FilterIcon} {...props} />
  );
  const DeleteRefactor = (props) => <Icon component={Delete} {...props} />;
  const ExportExcelRefactor = (props) => (
    <Icon component={ExportExcel} {...props} />
  );

  const handleCancel = () => {
    setIsVisibleDelete(!isVisibleDelete);
  };

  const handleSubmit = () => {
    setIsVisibleDelete(!isVisibleDelete);
    dispatch(deleteRevenueExpenditure(revenueExpendituresDeletes));
  };

  const onSubmitForm = (values) => {
    const newValues = { ...values, datetime: formatDate(values.datetime._d) };
    setIsVisibleForm(false);
    dispatch(postRevenueExpenditures(newValues));
    setFilterCheckbox([]);
  };

  const onCancelForm = () => {
    setIsVisibleForm(false);
  };

  function onChange(data) {
    dispatch(changeFilter(data));
    setFilterCheckbox([...data]);
  }

  // ========================== Search
  const handleSearch = (value) => {
    dispatch(
      getRevenueExpenditures({
        account_id,
        customer_name: value
      })
    );
  };

  const onExportExcel = () => {
    handleExportExcel(
      'B??o c??o thu chi',
      `acm/ledger/export/${account_id}`,
      'GET'
    );
  };

  const menu = (
    <>
      <div className="dropdown-filter-btn">
        <h5>Lo???i phi???u</h5>
        <Divider />
        <Checkbox.Group
          style={{ width: '100%' }}
          value={filterCheckbox}
          onChange={onChange}
        >
          <Row>
            <Col span={24} className="gx-py-1">
              <Checkbox value={RECEIPT}>{RECEIPT}</Checkbox>
            </Col>
            <Col span={24} className="gx-py-1">
              <Checkbox value={PAYMENT}>{PAYMENT}</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <h5 className="gx-mt-2">Theo ng??y</h5>
        <Divider />
        <p className="gx-mt-2">T??? ng??y</p>
        <DatePicker
          onChange={(_, date) => dispatch(changeSinceDate(date))}
          className="gx-w-100"
          placeholder=""
          format={YYYY_MM_DD}
        />
        <p className="gx-mt-2">?????n ng??y</p>
        <DatePicker
          onChange={(_, date) => dispatch(changeToDate(date))}
          className="gx-w-100"
          placeholder=""
          format={YYYY_MM_DD}
        />
      </div>
    </>
  );

  return (
    <>
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
            Th??m phi???u
          </Button>
          <Button
            onClick={onExportExcel}
            className="gx-mb-2"
            type="primary"
            icon={<ExportExcelRefactor />}
          >
            Xu???t excel
          </Button>
          <Button
            onClick={() => setIsVisibleDelete(true)}
            className="gx-mb-2"
            type="primary"
            disabled={!!!revenueExpendituresDeletes.length}
            icon={<DeleteRefactor />}
          >
            X??a
          </Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button
              className="gx-mb-2"
              type="primary"
              icon={<FilterIconRefactor />}
            >
              L???c phi???u
            </Button>
          </Dropdown>
        </div>
      </div>

      <FormModal
        open={isVisibleDelete}
        title="Th??ng b??o"
        valueBtnAccept="X??c nh???n"
        valueBtnCancel="H???y"
        headingContent="X??a phi???u thanh to??n"
        mainContent="Phi???u thanh to??n s??? b??? x??a kh???i qu???n l?? thu chi. 
        B???n c?? ch???c ch???n phi???u thanh to??n?"
        iconPopup={<ModalWarning />}
        handleClickAccept={handleSubmit}
        handleClickCancel={handleCancel}
      />
      {isVisibleForm && (
        <ModalRevenueExpenditure
          isModalVisible={isVisibleForm}
          onSubmit={onSubmitForm}
          onCancel={onCancelForm}
        />
      )}
    </>
  );
}
