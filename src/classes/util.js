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
}

export default Utility