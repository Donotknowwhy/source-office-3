import { useMemo, useRef, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { renderHighChartsOptions } from './highchart.helper';
import { PrintReport } from '@assets/icons/PrintReport';
import { FilterIcon } from '@assets/icons/FilterIcon';

import LayoutMainContent from 'customComponents/LayoutMainContent';
import ButtonAction from '@components/Button';
import FilterOption from 'customComponents/FilterOption';
import {
  dataYears,
  testDataMonth,
  dataSelect
} from 'customComponents/FilterOption/MultiFilter.helper';
import { Select } from 'antd';

const { Option } = Select;

const StatisticComponent = () => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [listItem, setListItem] = useState<any>(testDataMonth);
  const [activeTabKey, setActiveTabKey] = useState('tab1');
  const [itemSelected, setItemSelected] = useState<any>(
    dataSelect[0].radio_group[0].value
  );

  const options: any = useMemo(() => {
    return renderHighChartsOptions();
  }, []);

  const tabList = [
    {
      key: 'tab1',
      tab: 'Thống kê dự án'
    },
    {
      key: 'tab2',
      tab: 'Thông kê công việc cá  nhân'
    }
  ];
  const onChange = () => {};

  const onSearch = () => {};
  const handleGetValueSelect = (selected) => {
    const listOptionFilter = selected === 'month' ? testDataMonth : dataYears;
    setItemSelected(selected);
    setListItem(listOptionFilter);
  };

  const contentList = {
    tab1: <p>content1</p>,
    tab2: (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', zIndex: '1', right: 12, top: 18 }}>
          <Select
            defaultValue={listItem[0].value}
            showSearch
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
          >
            {listItem.map((item) => (
              <Option value={item.value} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
        />
      </div>
    )
  };
  return (
    <div>
      <div className="gx-d-flex gx-justify-content-end gx-pb-2">
        <ButtonAction value="In báo cáo" iconLeft={<PrintReport />} />
        <FilterOption
          valueBtn="Lọc"
          itemSelected={itemSelected}
          data={dataSelect}
          iconLeft={<FilterIcon />}
          valueSelected={handleGetValueSelect}
        />
      </div>

      <LayoutMainContent
        tabList={tabList}
        activeTabKey={activeTabKey}
        setActiveTabKey={setActiveTabKey}
      >
        {contentList[activeTabKey]}
      </LayoutMainContent>
    </div>
  );
};

export default StatisticComponent;
