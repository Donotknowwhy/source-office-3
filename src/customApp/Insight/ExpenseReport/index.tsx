import { fetchStart, fetchSuccess } from '@appRedux/CommonSlice';
import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { ExportExcel } from '@assets/icons/ExportExcel';
import AppNotificationContainer from '@components/AppNotificationContainer';
import ButtonCustom from '@components/Button';
import { TAB_COMMON } from '@constants/commons';
import { handleExportExcel } from '@util/utils';
import { Input } from 'antd';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import {
  tabListExpenseReport,
  tabListIncomeStateMentsTabs
} from '../insight.helper';
import { getLedger } from '../slice';
import { ChartExpenseReportTab } from './Chart';
import ExpenseReportTab from './ExpenseReportTab';

const { Search } = Input;

function ExpenseReport() {
  const dispatch = useAppDispatch();

  const page = useState(1);
  const limit = 15;
  // const insight = useAppSelector((state) => state);
  const [searchValue, setSearchValue] = useState('');
  const authState = useAppSelector((state) => state.auth.currentUser);
  const pathname = useAppSelector(({ common }) => common);
  const { loading, error } = pathname;
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_COMMON.TAB1);
  const [open, setOpen] = useState(false);
  const contentList = {
    [TAB_COMMON.TAB1]: <ExpenseReportTab />,
    [TAB_COMMON.TAB2]: <ChartExpenseReportTab />
  };
  const handleClick = async (e): Promise<any> => {
    setOpen(!open);

    const body = {
      type: 'Phiếu chi',
      branch_id: authState.branch_id,
      page: page,
      limit: limit,
      search: searchValue
    };

    dispatch(fetchStart());
    await handleExportExcel(
      'Báo cáo doanh thu insight',
      'insight/exportLedger',
      'POST',
      body
    );
    await dispatch(fetchSuccess());
  };

  const deBounceValue = useCallback(
    debounce((text) => {
      setSearchValue(text);
    }, 350),
    []
  );

  const onChangeSearchInput = (e) => {
    const getValue = e.target.value;
    deBounceValue(getValue);
  };

  const handleSearchInput = (value) => {
    dispatch(
      getLedger({
        type: 'Phiếu chi',
        branch_id: authState.branch_id,
        page: 1,
        limit: 15,
        search: value
      })
    );
  };

  return (
    <>
      <AppNotificationContainer loading={loading} error={error} />

      <div className="gx-d-flex gx-justify-content-between">
        <div className="btn-input-search-hrm gx-d-flex">
          <Search
            placeholder="Tìm kiếm"
            onChange={onChangeSearchInput}
            onSearch={handleSearchInput}
            style={{ width: 500 }}
            className="input-search"
          />
        </div>

        <div className="gx-d-flex gx-pb-2">
          <ButtonCustom
            onClick={handleClick}
            value="Xuất excel"
            iconLeft={<ExportExcel />}
          />
        </div>
      </div>

      <div>
        <LayoutMainContent
          tabList={tabListExpenseReport}
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

export default ExpenseReport;
