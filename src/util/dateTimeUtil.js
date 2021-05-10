import moment from 'moment';

const dateObj = new Date();
export const getCurrentMonth = (date = null) => {
  if (date) {
    return new Date(date).getMonth() + 1;
  }
  return dateObj.getMonth() + 1;
};

export const getCurrentYear = (date = null) => {
  if (date) {
    return new Date(date).getFullYear();
  }
  return dateObj.getFullYear();
};

export const getMonthString = month => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[month - 1];
};

export const getFullMonthString = month => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month - 1];
};

export const getPastDateByYear = (value = 1, date = null) => {
  let dateObj;
  if (date) {
    dateObj = new Date(
      new Date().setFullYear(new Date(date).getFullYear() - value),
    );
  } else {
    dateObj = new Date(
      new Date().setFullYear(new Date().getFullYear() - value),
    );
  }
  return `${dateObj.getFullYear()} ${dateObj.getMonth()} ${dateObj.getDate()}`;
};

export const getLastSixMonthAndYear = () => {
  const today = new Date();
  let d;
  let month;
  let year;
  const returnValue = [];
  for (let i = 0; i < 3; i++) {
    d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    month = d.getMonth() + 1;
    year = d.getFullYear();
    returnValue.push({
      month,
      year,
      label: `${getFullMonthString(month)}, ${year}`,
      value: month,
    });
  }
  return returnValue;
};

export const getLastMonthAndYear = (value = 6) => {
  const today = new Date();
  let d;
  let month;
  let year;
  const returnValue = [];
  for (let i = 0; i < value; i++) {
    d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    month = d.getMonth() + 1;
    year = d.getFullYear();
    returnValue.push({
      month,
      year,
      label: `${getFullMonthString(month)}, ${year}`,
      value: `${year}-${month}`,
    });
  }
  return returnValue;
};

export const getDaysDifference = publish_date => {
  const date = new moment(publish_date);
  return new moment().diff(date, 'days');
};

export const getPeriodDateRange = period => {
  let start = null;
  let end = null;
  if (period) {
    if (period === 'ytd') {
      start = moment().startOf('year');
      end = moment().endOf('year');
    } else if (period === 'qtd') {
      start = moment().startOf('quarter');
      end = moment().endOf('quarter');
    } else if (period === 'mtd') {
      start = moment().startOf('month');
      end = moment().endOf('month');
    }
  }
  if (start) {
    start = start.format('DD-MMM-YY');
  }
  if (end) {
    end = end.format('DD-MMM-YY');
  }
  return {start_date: start, end_date: end};
};

export const getMonthRange = (month, year) => {
  const start_date = moment([year, month - 1, 1])
    .startOf('month')
    .format('DD-MMM-YY');
  const end_date = moment([year, month - 1, 1])
    .endOf('month')
    .format('DD-MMM-YY');
  return {
    start_date,
    end_date,
  };
};

export const isToday = date => {
  const d = new moment(date).startOf('day');
  const today = new moment().startOf('day');
  return d.isSame(today);
};

export const isPast = date => {
  const d = new moment(date).startOf('day');
  const today = new moment().startOf('day');
  return d.isBefore(today);
};

export const isFutureTime = time => {
  let today = new moment();
  today = today.subtract(1, 'minutes');
  return time.isAfter(today);
};

export const secondsToHms = d => {
  d = +d;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
};

export const formatTime = timeString => {
  if (timeString) {
    const splits = timeString.split('-');
    let hour = +splits[0];
    let minute = +splits[1];
    let am = 'AM';
    if (hour / 12 >= 1) {
      am = 'PM';
    }
    hour %= 12;
    if (hour === 0) {
      hour = 12;
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    return `${hour}:${minute} ${am}`;
  }
  return '';
};
