export const getContactConsumptionData = (data, total) => {
  const chartConfig = {
    colors: ['#302E8F', '#9A5FDC', '#F79661'],
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: `${total}`,
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

  const chartData = data.map((content) => {
    const { name, value } = content;
    return {
      name,
      y: value,
      dataLabels: {
        enabled: false
      }
    };
  });

  const series = [{
    type: 'pie',
    name: ' ',
    innerSize: '80%',
    data: chartData
  }];

  chartConfig.series = series;
  return chartConfig;
};
