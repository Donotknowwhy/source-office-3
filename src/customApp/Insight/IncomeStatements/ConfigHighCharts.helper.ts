// import { renderYears } from './Chart';

export function renderHighChartsOptionsIncomeStatements(
  categories,
  dataTotalNumber,
  itemSelected
): any {
  return {
    chart: {
      type: 'column',
      height: 500
    },
    title: {
      text: `Biểu đồ báo cáo doanh thu theo tháng của năm ${itemSelected}`,
      verticalAlign: 'bottom',
      align: 'center',
      useHTML: true,
      style: {
        fontFamily: 'SF Pro Display',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '20px'
      }
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    legend: {
      x: 0,
      align: 'left',
      verticalAlign: 'top',
      borderColor: '#CCC',
      title: {
        text: 'Biểu đồ thống kê dự án theo tháng'
      },
      enabled: false
    },

    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: 'Total: {point.y}'
    },

    plotOptions: {
      series: {
        cursor: 'ponter'
      },
      column: {
        stacking: 'normal'
      }
    },
    series: [
      {
        data: dataTotalNumber,
        fillColor: 'red',
        color: 'rgb(34, 97, 165)'
      }
    ],
    credits: {
      enabled: false
    }
  };
}

export const renderYears = (numOfPoints: number) => {
  return Array(numOfPoints)
    .fill(0)
    .map((_, index) => new Date().getFullYear() - index);
};

const thisMonth = renderYears(5);

export const renderDataPickMonth = thisMonth.map((number, index) => {
  return {
    name: number,
    value: number
  };
});
