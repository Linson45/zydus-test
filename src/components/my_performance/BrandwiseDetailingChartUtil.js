export const getBrandWiseDetailingChartUtil = (data) => {
  if (!data) {
    data = [];
  }

  const chartConfig = {
    colors: ['#302E8F', '#9A5FDC'],
    chart: {
      type: 'column'
    },
    xAxis: {
      categories: data.map((d) => d.name),
    },
    yAxis: {
      min: 0,
      title: 'Mins'
    },
    title: {
      text: ' '
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
  };

  const eDetailings = data.map((d) => +(+d.e_detailing_time / 60).toFixed(1));
  const virtualDetailings = data.map((d) => +(+d.virtual_detailing_time / 60).toFixed(1));

  const series = [{
    name: 'E-Detailing',
    data: eDetailings,
    marker: {
      enabled: true
    },
  }, {
    name: 'Virtual Detailing',
    data: virtualDetailings,
    marker: {
      enabled: true
    },
  }];

  chartConfig.series = series;
  return chartConfig;
};
