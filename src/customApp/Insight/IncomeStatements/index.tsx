import { fetchStart, fetchSuccess } from '@appRedux/CommonSlice';
import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { ExportExcel } from '@assets/icons/ExportExcel';
import AppNotificationContainer from '@components/AppNotificationContainer';
import ButtonCustom from '@components/Button';
import { TOKEN_COMMON } from '@constants/ActionTypes';
import { TAB_COMMON } from '@constants/commons';
import { Input } from 'antd';
import LayoutMainContent from 'customComponents/LayoutMainContent';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { tabListIncomeStateMentsTabs } from '../insight.helper';
import { getLedger } from '../slice';
import ChartIncomeStatements from './Chart';
import IncomeStatementsTab from './IncomeStatementsTab';

const baseURL = process.env.REACT_APP_BASE_URL;

const { Search } = Input;

const page = 1;
const limit = 15;

function IncomeStatements() {
  const dispatch = useAppDispatch();
  const getToken = localStorage.getItem(TOKEN_COMMON);

  const [searchValue, setSearchValue] = useState('');
  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const pathname = useAppSelector(({ common }) => common);
  const { loading, error } = pathname;
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_COMMON.TAB1);
  const [open, setOpen] = useState(false);
  const contentList = {
    [TAB_COMMON.TAB1]: <IncomeStatementsTab />,
    [TAB_COMMON.TAB2]: <ChartIncomeStatements />
  };

  const handleClick = async (): Promise<any> => {
    setOpen(!open);

    const body = {
      type: 'Phiếu thu',
      branch_id: authState.branch_id,
      page: page,
      limit: limit,
      search: searchValue
    };

    await dispatch(fetchStart());
    await fetch(`${baseURL}insight/exportLedger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`
      },
      body: JSON.stringify(body)
    })
      .then((res) => {
        if (res.status === 200) {
          return res.blob();
        } else {
          return res.json();
        }
      })
      .then((blob) => {
        if (blob.message) {
          return;
        }
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Báo cáo doanh thu insight`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();
      });

    await dispatch(fetchSuccess());
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const deBounceValue = useCallback(
    debounce((text) => {
      setSearchValue(text);
    }, 350),
    []
  );

  const onChangeSearchInput = (e) => {};

  const handleSearchInput = (value) => {
    setSearchValue(value);
    dispatch(
      getLedger({
        type: 'Phiếu thu',
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
            placeholder="Tìm kiếm tên khách hàng,nhân viên sales ..."
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
          tabList={tabListIncomeStateMentsTabs}
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

export default IncomeStatements;
