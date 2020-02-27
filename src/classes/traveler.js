class Traveler {
  constructor(info) {
    this.id = info.id,
    this.name = info.name,
    this.travelerType = info.travelerType
    this.trips = null
  }
  seeAllTrips(tripData) {
    return tripData.trips.filter(trip => trip.userID === this.id)
  }
  makeTripRequest() {

  }
}


export default Traveler