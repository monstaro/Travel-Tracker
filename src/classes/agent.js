import Utility from './util.js';
// import AllTrips from './allTrips.js'
import UserRepo from './allUsers.js'
import travelers from '../../data/sample-travelers.js'


class Agent {
  constructor() {
    this.pendingRequests = null;
    this.approvedRequests = null;
    this.income = null;
    this.util = new Utility;
    this.users = new UserRepo(travelers)
  }

  findPendingRequests(tripData) {
    return tripData.trips.filter(trip => trip.status === 'pending')
  }

  findApprovedRequests(tripData) {
    return tripData.trips.filter(trip => trip.status === 'approved')
  }

  getTotalIncomeInLastYear(tripData, destinationData) {
    let preFee = this.findApprovedRequests(tripData).reduce((totalSpent, curTrip) => {
      destinationData.forEach(destination => {
        if (curTrip.destinationID === destination.id && this.util.getDatesInLastYear().includes(curTrip.date)) {
          totalSpent += (((destination.estimatedLodgingCostPerDay * curTrip.duration) + (destination.estimatedFlightCostPerPerson)) * curTrip.travelers)
        }
      })
      return totalSpent
    }, 0)
    let fee = preFee * .10
    return fee
  }

  findTravelerCountToday(tripData) {
    return tripData.trips.filter(trip => trip.date === this.util.getTodaysDate()
    )
  }

  viewUserData(name) {
    this.users.findUser(name)
//unfinished
    return 
    //find name, trips taken, amount spent
  }
}

export default Agent