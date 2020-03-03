var moment = require('moment');

class Utility {
  constructor() {
  }
  getTodaysDate() {
    return moment().format().substring(0, 10).split('-').join('/')
  }
  displayDateAndTime() {
    return moment().format('LLLL')
  }
  getDatesInLastYear() {
    let datesInLastYear = []
    for (var i = 0; i < 365; i++) {
      datesInLastYear.push(moment().subtract(i, 'days').format('YYYY/MM/DD'))
    }
    return datesInLastYear
  }
  turnNumberIntoDollarAmount(number) {
    let dollar = '$' + number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return dollar
  }
  parseIdToLocation(destinations, id) {
    return destinations.filter(destination => destination.id === parseInt(id))[0]
  }
  formatDateProperly(date) {
    return moment(date.dateSelected).format('YYYY/MM/DD')
  }
  findTripLength(start, end) {
    const oneDay = 24 * 60 * 60 * 1000; 
    console.log(start.dateSelected, end.dateSelected)
    const firstDate = start.dateSelected;
    const secondDate = end.dateSelected;
    return Math.round(Math.abs((firstDate - secondDate) / oneDay))
  }
}

export default Utility