/**
 * Function to sort multidimensional array
 *
 * param {array} [arr] Source array
 * param {array} [columns] List of columns to sort
 * param {array} [order_by] List of directions (ASC, DESC)
 * returns {array}
 */
export function multisort(arr, columns, order_by) {
  if (typeof columns === 'undefined') {
    columns = [];
    for (let x = 0; x < arr[0].length; x++) {
      columns.push(x);
    }
  }

  if (typeof order_by === 'undefined') {
    order_by = [];
    for (let x = 0; x < arr[0].length; x++) {
      order_by.push('ASC');
    }
  }

  function multisort_recursive(a, b, columns, order_by, index) {
    if (!a.hasOwnProperty(columns[index]) || !b.hasOwnProperty(columns[index])) {
      return 0;
    }

    const direction = order_by[index] === 'DESC' ? 1 : 0;

    const is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);

    const x = is_numeric ? +a[columns[index]] : a[columns[index]].trim().toLowerCase();
    const y = is_numeric ? +b[columns[index]] : b[columns[index]].trim().toLowerCase();

    if (x < y) {
      return direction === 0 ? -1 : 1;
    }

    if (x === y) {
      return columns.length - 1 > index ? multisort_recursive(a, b, columns, order_by, index + 1) : 0;
    }

    return direction === 0 ? 1 : -1;
  }

  return arr.sort((a, b) => multisort_recursive(a, b, columns, order_by, 0));
}
