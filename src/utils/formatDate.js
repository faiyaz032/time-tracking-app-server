/**
 * This function takes date string and returns a formatted date in YY:MM:DD
 * @param {Date} dateString
 * @returns {string}
 */
const formatDate = dateString => {
  const date = new Date(dateString);

  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  return formattedDate;
};

module.exports = formatDate;
