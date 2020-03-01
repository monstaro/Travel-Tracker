import Utility from './util.js';


class Agent extends Utility {
  constructor(trips, users) {
    super()
    this.trips = trips;
    this.users = users;
  }

  findPendingRequests() {
    return this.trips.filter(trip => trip.status === 'pending')
  }

  findApprovedRequests() {
    return this.trips.filter(trip => trip.status === 'approved')
  }

  getTotalIncomeInLastYear(destinationData) {
    let preFee = this.findApprovedRequests(this.trips).reduce((totalSpent, curTrip) => {
      destinationData.forEach(destination => {
        if (curTrip.destinationID === destination.id && this.getDatesInLastYear().includes(curTrip.date)) {
          totalSpent += (((destination.estimatedLodgingCostPerDay * curTrip.duration) + (destination.estimatedFlightCostPerPerson)) * curTrip.travelers)
        }
      })
      return totalSpent
    }, 0)
    let fee = preFee * .10
    return fee
  }

  findTravelerCountToday() {
    return this.trips.filter(trip => trip.date === this.getTodaysDate()
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