var moment = require('moment');


class Utility {
  constructor() {

  }
  getTodaysDate() {
    return moment().format().substring(0, 10).split('-').join('/')
  }

}

export default Utility