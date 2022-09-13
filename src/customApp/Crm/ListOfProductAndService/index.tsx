import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { DeleteIcon } from '@assets/icons/DeleteIcon';
import { ModalWarning } from '@assets/icons/ModalWarning';
import { PlusIcon } from '@assets/icons/PlusIcon';
import AppNotificationContainer from '@components/AppNotificationContainer';
import ButtonCustom from '@components/Button';
import { NAME_COMMON, TAB_COMMON } from '@constants/commons';
import { Input } from 'antd';
import { getAllService } from 'customApp/Crm/slice';
import FormComponent from 'customApp/HRM/HRMManageAccount/Form/HRM/FormComponent';
import { EditInforBranch } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import FormModal from 'customComponents/FormModal';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useMemo, useState } from 'react';
import {
  createProduct,
  createService,
  deleteProduct,
  deleteService,
  getAllProduct
} from '../slice';
import ListProduct from './ListProduct';
import {
  addProduct,
  addService,
  ListOfProductAndServiceTab
} from './ListProductAndService.helper';
import ListService from './ListService';

const { Search } = Input;

function ListOfProductAndService() {
  const listProduct = useAppSelector((state) => state.crm.ListProduct);
  const listService = useAppSelector((state) => state.crm.ListService);

  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const pathname = useAppSelector(({ common }) => common);
  const { loading, error } = pathname;
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_COMMON.TAB1);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [idList, setIdList] = useState([]);
  const bodyGetAll = {
    page: 1,
    limit: 15,
    search: '',
    status: 1,
    branch_id: authState.branch_id
  };

  const getListArrIdSelect = (listId, name) => {
    setIdList(listId);
  };

  const contentList = {
    [TAB_COMMON.TAB1]: (
      <ListProduct
        name="list-product"
        value={searchValue}
        dataProduct={listProduct}
        getListId={getListArrIdSelect}
      />
    ),
    [TAB_COMMON.TAB2]: (
      <ListService
        name="list-service"
        value={searchValue}
        dataService={listService}
        getListId={getListArrIdSelect}
      />
    )
  };

  const handleClick = (e) => {
    setOpen(!open);
    setSelected(e.target.name);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const getValueForm = async (formValue, name) => {
    setOpen(false);
    if (name === NAME_COMMON.NAME1) {
      const body = {
        ...formValue,
        branch_id: authState.branch_id
      };
      await dispatch(createProduct(body));
      await dispatch(getAllProduct(bodyGetAll));
    } else if (name === NAME_COMMON.NAME2) {
      const body = {
        ...formValue,
        branch_id: authState.branch_id
      };

      await dispatch(createService(body));
      await dispatch(getAllService(bodyGetAll));
    }
  };

  const handleClickAcceptModal = async (name) => {
    setOpen(false);
    if (name === NAME_COMMON.NAME3) {
      const body = {
        id_product: idList
      };
      await dispatch(deleteProduct(body));
      await dispatch(getAllProduct(bodyGetAll));
    } else if (name === NAME_COMMON.NAME6) {
      const body = {
        id_product: idList
      };
      await dispatch(deleteService(body));
      await dispatch(getAllService(bodyGetAll));
    }
  };

  const renderBtn = useMemo(() => {
    switch (activeTabKey) {
      case TAB_COMMON.TAB1: {
        return (
          <>
            <ButtonCustom
              name={NAME_COMMON.NAME1}
              onClick={handleClick}
              value="Thêm sản phẩm"
              iconLeft={<PlusIcon />}
            />
            <ButtonCustom
              name={NAME_COMMON.NAME2}
              onClick={handleClick}
              value="Thêm dịch vụ"
              iconLeft={<PlusIcon />}
            />
            <ButtonCustom
              name={NAME_COMMON.NAME3}
              onClick={handleClick}
              value="Xóa"
              background="color-delete"
              iconLeft={<DeleteIcon />}
            />
          </>
        );
      }
      case TAB_COMMON.TAB2: {
        return (
          <>
            <ButtonCustom
              name={NAME_COMMON.NAME1}
              onClick={handleClick}
              value="Thêm sản phẩm"
              iconLeft={<PlusIcon />}
            />
            <ButtonCustom
              name={NAME_COMMON.NAME2}
              onClick={handleClick}
              value="Thêm dịch vụ"
              iconLeft={<PlusIcon />}
            />
            <ButtonCustom
              name={NAME_COMMON.NAME6}
              onClick={handleClick}
              value="Xóa"
              background="color-delete"
              iconLeft={<DeleteIcon />}
            />
          </>
        );
      }

      default:
        break;
    }
  }, [open, selected, activeTabKey]);

  const handleRenderModal = useMemo(() => {
    switch (selected) {
      case NAME_COMMON.NAME1: {
        return (
          <>
            <FormComponent
              nameForm={NAME_COMMON.NAME1}
              colSpan={12}
              widthModal={1016}
              title="Thêm sản phẩm"
              modalVisible={open}
              onCancel={handleToggle}
              formValue={addProduct}
              getValueForm={getValueForm}
            />
          </>
        );
      }
      case NAME_COMMON.NAME2: {
        return (
          <>
            <FormComponent
              nameForm={NAME_COMMON.NAME2}
              colSpan={12}
              widthModal={1016}
              title="Thêm dịch vụ"
              modalVisible={open}
              onCancel={handleToggle}
              formValue={addService}
              getValueForm={getValueForm}
            />
          </>
        );
      }
      case NAME_COMMON.NAME3: {
        return (
          <FormModal
            name={NAME_COMMON.NAME3}
            open={open}
            title="thông báo"
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa sản phẩm"
            mainContent="Sản phẩm bạn đang chọn sẽ bị xóa khỏi danh mục sản phẩm Bạn có chắc chắn về sự thay đổi này ?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggle}
          />
        );
      }
      case NAME_COMMON.NAME4: {
        return (
          <FormComponent
            nameForm={NAME_COMMON.NAME4}
            colSpan={12}
            widthModal={1016}
            title="Thêm thông tin chi nhánh 4"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={addService}
            getValueForm={getValueForm}
          />
        );
      }
      case NAME_COMMON.NAME5: {
        return (
          <FormComponent
            nameForm={NAME_COMMON.NAME5}
            colSpan={12}
            widthModal={1016}
            title="Thêm thông tin chi nhánh 5"
            modalVisible={open}
            onCancel={handleToggle}
            formValue={EditInforBranch}
            getValueForm={getValueForm}
          />
        );
      }
      case NAME_COMMON.NAME6: {
        return (
          <FormModal
            name={NAME_COMMON.NAME6}
            open={open}
            title="thông báo"
            valueBtnAccept="Xác nhận"
            valueBtnCancel="Hủy"
            headingContent="Xóa sản phẩm"
            mainContent="Sản phẩm bạn đang chọn sẽ bị xóa khỏi danh mục sản phẩm Bạn có chắc chắn về sự thay đổi này ?"
            iconPopup={<ModalWarning />}
            handleClickAccept={handleClickAcceptModal}
            handleClickCancel={handleToggle}
          />
        );
      }

      default:
        break;
    }
  }, [open, selected, activeTabKey]);

  const onChangeSearchInput = (e) => {
    const getValue = e.target.value;
    // setSearchValue(getValue);
  };

  const handleSearchInput = (value, e) => {
    const getValue = value;
    setSearchValue(getValue);
  };

  return (
    <>
      <AppNotificationContainer loading={loading} error={error} />
      <div className="gx-d-flex gx-justify-content-between">
        <div className="btn-input-search-hrm gx-d-flex">
          <Search
            name="text1"
            placeholder="Tìm kiếm"
            onChange={onChangeSearchInput}
            onSearch={handleSearchInput}
            style={{ width: 500 }}
            className="input-search"
          />
        </div>

        <div className="gx-d-flex gx-justify-content-end gx-pb-2">
          {renderBtn}
          {handleRenderModal}
        </div>
      </div>

      <div>
        <LayoutMainContent
          tabList={ListOfProductAndServiceTab}
          activeTabKey={activeTabKey}
          setActiveTabKey={setActiveTabKey}
          noPaddingLeftAndRight={true}
        >
          {contentList[activeTabKey]}
        </LayoutMainContent>
      </div>
    </>
  );
}

export default ListOfProductAndService;
