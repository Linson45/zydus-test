import { toFixed } from '../../util/NumberTrasformer';

export const getTotalCallsChartData = (data) => {
  if (!data) {
    data = {
      e_detailing_calls: 0,
      v_detailing_calls: 0,
      physical_detailing_calls: 0,
    };
  }
  const { e_detailing_calls, v_detailing_calls, physical_detailing_calls } = data;

  const chartConfig = {
    colors: ['#302E8F', '#9A5FDC', '#F79661'],
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: `${e_detailing_calls + v_detailing_calls + physical_detailing_calls}`,
    },
    tooltip: {
      enabled: true
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    legend: {
      enabled: true
    },
    plotOptions: {
      pie: {
        showInLegend: true
      }
    },
  };

  let e_detail = 0; let v_detail = 0; let
    p_detail = 0;
  const total = e_detailing_calls + v_detailing_calls + physical_detailing_calls;
  if (total) {
    e_detail = toFixed(e_detailing_calls * 100 / total, 0);
    v_detail = toFixed(v_detailing_calls * 100 / total, 0);
    p_detail = toFixed(physical_detailing_calls * 100 / total, 0);
  }

  const series = [{
    type: 'pie',
    name: ' ',
    innerSize: '80%',
    data: [
      {
        name: `${e_detail}% E-detailing`,
        y: e_detailing_calls,
        dataLabels: {
          enabled: false
        }
      },
      {
        name: `${v_detail}% Virtual`,
        y: v_detailing_calls,
        dataLabels: {
          enabled: false
        }
      },
      {
        name: `${p_detail}% Physical`,
        y: physical_detailing_calls,
        dataLabels: {
          enabled: false
        }
      }
    ]
  }];

  chartConfig.series = series;
  return chartConfig;
};
