class Trip {
  constructor(traveler, destination, travelerCount, startDate, duration) {
    this.id = Date.now(),
    this.userID = traveler.id,
    this.destinationID = destination.id,
    this.travelers = travelerCount,
    this.date = startDate,
    this.duration = duration,
    // this.endDate = endDate,
    this.status = 'pending',
    this.suggestedActivities = []
  }
  findTripCost() {

  }
}


export default Trip