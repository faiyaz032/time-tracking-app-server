/**
 * This function returns Day name by given date string
 * @param {string} dateString
 */
function getDayNameByDate(dateString) {
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayIndex];
}

module.exports = getDayNameByDate;
