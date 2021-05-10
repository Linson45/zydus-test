import Colors from '../../../styles/colorsStyles';
import { dynamicSort } from '../../../util/ArrayUtil';

export const generateHighChartData = (history) => {
  const chartConfig = {
    colors: [Colors.contentBlue, Colors.orange],
    title: {
      text: ' '
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%d %m',
      },
    },
    yAxis: {
      type: 'datetime',
      title: {
        text: 'Visit Patterns (Mins)',
      },
      min: 0
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
    tooltip: {
      formatter() {
        return `<b>${this.series.name}</b><br/>`
            + `${Math.floor((this.y) / 60000)}
                :
            ${(Math.floor((this.y) % 60000) / 100).toString().substring(0, 2)} min`;
      }
    },
  };

  const eDetailingMap = {};
  const virtualDetailingMap = {};

  history.forEach((item) => {
    const { virtual_detailed_time, e_detailed_time } = item;
    const x = Date.parse(item.date);
    let eDetailingData = eDetailingMap[x];
    if (!eDetailingData) {
      eDetailingData = 0;
    }
    eDetailingData += e_detailed_time || 0;
    eDetailingMap[x] = eDetailingData;

    let virtualDetailingData = virtualDetailingMap[x];
    if (!virtualDetailingData) {
      virtualDetailingData = 0;
    }
    virtualDetailingData += virtual_detailed_time || 0;
    virtualDetailingMap[x] = virtualDetailingData;
  });

  let eDetailings = Object.keys(eDetailingMap).map((x) => ({
    x: +x,
    y: +(eDetailingMap[x] * 1000).toFixed(2),
  }));

  let virtualDetailings = Object.keys(virtualDetailingMap).map((x) => ({
    x: +x,
    y: +(virtualDetailingMap[x] * 1000).toFixed(2),
  }));

  eDetailings = eDetailings.sort(dynamicSort('x'));
  virtualDetailings = virtualDetailings.sort(dynamicSort('x'));

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
