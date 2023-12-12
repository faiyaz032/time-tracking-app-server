/**
 * This function returns last week date according to the given start week date
 * @param {string} startWeekDate
 * @returns {string}    
 */
const getLastWeekDate = startWeekDate => {
  const currentDate = new Date(startWeekDate);

  //add 6 days to get the last date
  const lastDate = new Date(currentDate);
  lastDate.setDate(currentDate.getDate() + 6);

  return lastDate.toISOString().split('T')[0];
};

module.exports = getLastWeekDate;
