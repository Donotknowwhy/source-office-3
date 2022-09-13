import { useAppDispatch, useAppSelector } from '@appRedux/hooks';
import { Arrowdown } from '@assets/icons/Arrowdown';
import { Select } from 'antd';
import {
  dataYears,
  selectedMonthOrYear
} from 'customComponents/FilterOption/MultiFilter.helper';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getLedgerMonth } from '../slice';
import {
  renderDataPickMonth,
  renderHighChartsOptionsIncomeStatements
} from './ConfigHighCharts.helper';
const listItem = renderDataPickMonth;
const typeSelected = selectedMonthOrYear[0].value;

const { Option } = Select;

export const ChartIncomeStatements = () => {
  const insight = useAppSelector((state) => state.Insight);
  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const { chart } = insight.incomeStatements;

  const dispatch = useAppDispatch();

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [itemSelected, setItemSelected] = useState<any>(listItem[0].value);

  const onChangePickYears = (value) => {
    setItemSelected(value);
    if (typeSelected === 'month') {
      dispatch(
        getLedgerMonth({
          type: 'Phiếu thu',
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
        type: 'Phiếu thu',
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
  }, [insight]);

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
          <Option value={item.value} key={_.uniqueId('key___')}>
            {item.name}
          </Option>
        ))}
      </Select>
    );
  }, [listItem, itemSelected]);

  return (
    <div>
      <div className="gx-p-3">{renderBtn}</div>

      <div className="gx-p-2">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
        />
      </div>
    </div>
  );
};

export default ChartIncomeStatements;
