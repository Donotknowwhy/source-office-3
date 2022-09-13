import { monthConfig } from './highchart.config';

export const getRandomNum = () => {
  return Math.floor(Math.random() * 14) + 6;
};

export const generateChartPoints = (numOfPoints: number) => {
  return Array(numOfPoints)
    .fill(0)
    .map((_) => getRandomNum());
};

export function renderHighChartsOptions(): any {
  return {
    chart: {
      type: 'column',
      height: 500
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: monthConfig
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
      }
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
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
        name: 'Chưa bắt đầu',
        data: generateChartPoints(12),
        fillColor: 'red',
        color: 'rgb(34, 97, 165)'
      },
      {
        name: 'Đang thực hiện',
        data: generateChartPoints(12),
        color: 'rgb(185, 17, 17)'
      },
      {
        name: 'Hoàn thành',
        data: generateChartPoints(12),
        color: 'rgb(157, 34, 34)'
      },
      {
        name: 'Tạm hoãn',
        data: generateChartPoints(12),
        color: 'rgb(255, 123, 48)'
      },
      {
        name: 'Quá hạn',
        data: generateChartPoints(12),
        color: 'rgb(0, 209, 109)'
      }
    ],
    credits: {
      enabled: false
    }
  };
}

// chart {
//   categories: [
//   'Tháng 1',
//   'Tháng 2',
//   'Tháng 3',
//   'Tháng 4',
//   'Tháng 5',
//   'Tháng 6',
//   'Tháng 7',
//   'Tháng 8',
//   'Tháng 9',
//   'Tháng 10',
//   'Tháng 11',
//   'Tháng 12'
// ], type string[]
// data: [
//       {
//         name: 'Chưa bắt đầu',
//         dataPonit: generateChartPoints(12), //type number[] [0,1,2,3,4,5,6,7,8,9,10,11]
//       },
//       {
//         name: 'Đang thực hiện',
//         dataPonit: generateChartPoints(12),
//       },
//       {
//         name: 'Hoàn thành',
//         dataPonit: generateChartPoints(12),
//       },
//       {
//         name: 'Tạm hoãn',
//         dataPonit: generateChartPoints(12),
//       },
//       {
//         name: 'Quá hạn',
//         dataPonit: generateChartPoints(12),
//       }
//     ],
// }
