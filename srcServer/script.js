const urlExists = require('url-exists');

const dateFormat = function (d) {
  const curr_date = d.getDate();
  const curr_month = d.getMonth() + 1;
  const curr_year = d.getFullYear();
  const currentDate = curr_year + "-" + curr_month + "-" + curr_date;
  return currentDate;
}

module.exports = {
  dateFormat
}
