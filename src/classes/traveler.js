import Utility from './util.js';


class Traveler {
  constructor(info) {
    this.id = info.id,
    this.name = info.name,
    this.travelerType = info.travelerType,
    this.trips = null,
    this.utility = new Utility
  }
  seeAllTrips(tripData) {
    return tripData.trips.filter(trip => trip.userID === this.id)
  }
  seeApprovedTrips(tripData) {
    return this.seeAllTrips(tripData).filter(trip => trip.status === 'approved')
  }
  findAmountSpent(tripData, destinationData) {
    let preFee = this.seeApprovedTrips(tripData).reduce((totalSpent, curTrip) => {
      destinationData.forEach(destination => {
        if (curTrip.destinationID === destination.id) {
          totalSpent += (((destination.estimatedLodgingCostPerDay * curTrip.duration) + (destination.estimatedFlightCostPerPerson)) * curTrip.travelers)
        }
      })
      return totalSpent
    }, 0)
    let fee = preFee * .10
    return preFee + fee
    //this function also lives on the agent class, I would like to refactor
  }
}


export default Traveler