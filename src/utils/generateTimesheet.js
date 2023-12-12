// @ts-nocheck
//dependencies
const getDayNameByDate = require('./getDayNameByDate');

/**
 * This function generates timesheet using the given entries
 * @param {array} entries
 */
const generateTimesheet = entries => {
  const totalHoursByDate = {};

  const baseDate = '2022-12-12';

  entries.forEach(entry => {
    const { date, startTime, endTime } = entry;
    const startDateTime = new Date(`${baseDate}T${startTime}Z`);
    const endDateTime = new Date(`${baseDate}T${endTime}Z`);

    //calculate hour difference
    const timeDifference = endDateTime - startDateTime;
    const hoursDifference = Number((timeDifference / (1000 * 60 * 60)).toFixed(2));

    const dayName = getDayNameByDate(date);

    if (totalHoursByDate[dayName]) {
      totalHoursByDate[dayName] += hoursDifference;
    } else {
      totalHoursByDate[dayName] = hoursDifference;
    }
  });

  return totalHoursByDate;
};

module.exports = generateTimesheet;
