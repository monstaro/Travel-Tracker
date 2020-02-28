import Utility from './util.js';
import AllTrips from './allTrips.js'
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

  getTotalIncome(tripData, destinationData) {
    let preFee = this.findApprovedRequests(tripData).reduce((totalIncome, curTrip) => {
      destinationData.forEach(destination => {
        if (curTrip.destinationID === destination.id) {
          totalIncome += (destination.estimatedLodgingCostPerDay * curTrip.duration)
        }
      })
      return totalIncome
    }, 0)
    let fee = preFee * .10
    return preFee + fee
  }

  findTravelerCountToday(tripData) {
    return tripData.trips.filter(trip => trip.date === this.util.getTodaysDate()
    ).length
  }

  viewUserData(name) {
    this.users.findUser(name)

    return 
    //find name, trips taken, amount spent
  }
}

export default Agent