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

}

export default Utility