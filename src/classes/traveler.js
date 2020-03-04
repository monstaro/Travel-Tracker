import Utility from './util.js';


class Traveler extends Utility {
  constructor(info, trips) {
    super()
    this.id = info.id,
    this.name = info.name,
    this.travelerType = info.travelerType,
    this.trips = trips
  }
  findAmountSpent(destinationData) {
    let preFee = this.seeApprovedTrips().reduce((totalSpent, curTrip) => {
      destinationData.forEach(destination => {
        if (curTrip.destinationID === destination.id) {
          totalSpent += (((destination.estimatedLodgingCostPerDay * curTrip.duration) + (destination.estimatedFlightCostPerPerson)) * curTrip.travelers)
        }
      })
      return totalSpent
    }, 0)
    let fee = preFee * .10
    let fullAmt = preFee + fee;
    return this.turnNumberIntoDollarAmount(fullAmt)
  }
}


export default Traveler