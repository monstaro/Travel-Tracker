var moment = require('moment');


class Utility {
  constructor() {

  }
  getTodaysDate() {
    return moment().format().substring(0, 10).split('-').join('/')
  }

  getDatesInLastYear() {
    let datesInLastYear = []
    for (var i = 0; i < 365; i++) {
      datesInLastYear.push(moment().subtract(i, 'days').format('YYYY/MM/DD'))
    }
    return datesInLastYear
  }
  getDatesInRange(trips) {
    let datesInRange = []
//input: 2020/2/27, 6 days
// output [2020/02/27...2020/03/05]
    
    datesInRange.push(moment().subtract())
    
  }

  getFutureDates() {

  }

  turnNumberIntoDollarAmount(number) {
    let dollar = '$' + number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return dollar
  }

}

export default Utility