import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { Arrowdown } from '@assets/icons/Arrowdown';
import { Select } from 'antd';
import {
  dataYears,
  selectedMonthOrYear
} from 'customComponents/FilterOption/MultiFilter.helper';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  renderDataPickMonth,
  renderHighChartsOptionsIncomeStatements
} from '../IncomeStatements/ConfigHighCharts.helper';
import { getLedgerMonth } from '../slice';

const { Option } = Select;

export const ChartExpenseReportTab = () => {
  const expenseReport = useAppSelector((state) => state.Insight.expenseReport);
  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const { chart } = expenseReport;

  const dispatch = useAppDispatch();

  const [typeSelected, setTypeSelected] = useState(
    selectedMonthOrYear[0].value
  );
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [listItem, setListItem] = useState<any>(renderDataPickMonth);

  const [itemSelected, setItemSelected] = useState<any>(listItem[0].value);

  const onChange = (name, ...props) => {
    setTypeSelected(name);
    const getTypeSelect = name === 'month' ? renderDataPickMonth : dataYears;
    setListItem(getTypeSelect);
  };

  const onChangePickYears = (value) => {
    setItemSelected(value);
    if (typeSelected === 'month') {
      dispatch(
        getLedgerMonth({
          type: 'Phiếu chi',
          branch_id: authState.branch_id,
          date_current: value
        })
      );
    }
  };

  const onSearch = () => {};

  useEffect(() => {
    dispatch(
      getLedgerMonth({
        type: 'Phiếu chi',
        branch_id: authState.branch_id,
        date_current: new Date().getFullYear()
      })
    );
  }, []);

  const options: any = useMemo(() => {
    if (chart.data.length > 0) {
      const categories = chart.data.map((item) => item.label.toString());
      const dataTotalNumber = chart.data.map((item) => item.total);
      return renderHighChartsOptionsIncomeStatements(
        categories,
        dataTotalNumber,
        itemSelected
      );
    }
  }, [expenseReport, chart.data, itemSelected]);

  const renderBtn = useMemo(() => {
    return (
      <Select
        value={itemSelected}
        showSearch
        optionFilterProp="children"
        onChange={onChangePickYears}
        onSearch={onSearch}
        suffixIcon={<Arrowdown />}
      >
        {listItem.map((item) => (
          <Option value={item.value} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    );
  }, [listItem, itemSelected]);

  return (
    <div>
      <div className="gx-p-2">{renderBtn}</div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  );
};

export default ChartExpenseReportTab;
