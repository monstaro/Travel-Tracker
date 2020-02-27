class Agent {
  constructor() {
    this.pendingRequests = null;
    this.approvedRequests = null;
    this.income = null;
  }
  findPendingRequests(tripData) {
    this.pendingRequests = 
    tripData.trips.filter(trip => trip.status === 'pending')
  }
  findApprovedRequests(tripData) {
    this.approvedRequests = 
    tripData.trips.filter(trip => trip.status === 'approved')
  }

  getTotalIncome(destinationData) {
    let preFee = this.approvedRequests.reduce((totalIncome, curTrip) => {
      destinationData.forEach(destination => {
        if (curTrip.destinationID === destination.id) {
          totalIncome += (destination.estimatedLodgingCostPerDay * curTrip.duration)
        }
      })
      return totalIncome
    }, 0)
    let fee = preFee * .10
    this.income = preFee + fee
  }
}

export default Agent