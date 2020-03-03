/* eslint-disable max-len */
import Traveler from './classes/traveler.js'
import Agent from './classes/agent.js'
import domUpdates from './domUpdates.js'
import Trip from './classes/trip.js'

//DECLARE GLOBAL VARIABLES
let allUsers;
let allTrips;
let allDestinations;
let traveler;
let agent;
let trip;

//FETCH USER DATA
const userData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(data => data.travelers)
  .catch(error => console.log(error.message))

const tripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  .then(response => response.json())
  .then(data => data.trips)
  .catch(error => console.log(error.message))

const destinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(data => data.destinations)
  .catch(error => console.log(error.message))

Promise.all([userData, tripsData, destinationsData])
  .then(data => {
    allUsers = data[0];
    allTrips = data[1];
    allDestinations = data[2];
  })

//  INSTANTIATIONS / POSTING
const dataController = {
  loadUser(id) {
    let user = allUsers[id - 1];
    let trips = allTrips.filter(trip => trip.userID === parseInt(id));

    trips.map(trip => trip.location = allDestinations.filter(destination => destination.id === trip.destinationID));

    trips.map(trip => {
      trip.date.split('-').join('/')
      // ^^ put in conditional?

      if (typeof trip.destinationID === 'string') {
        trip.destinationID = parseInt(trip.destinationID)
      }
      if (!trip.destinationID) {
        trip.destinationID = 8
      }
      if (typeof trip.userID === 'string') {
        trip.userID = parseInt(trip.userID)
      }
      if (typeof trip.travelers === 'string') {
        trip.travlers = parseInt(trip.travelers)
      }
      if (typeof trip.duration === 'string') {
        trip.duration = parseInt(trip.duration)
      }
      if (typeof trip.id === 'string') {
        trip.id = Date.now()
      }
      if (trip.date.split('').length === 9) {
        trip.date = trip.date.split('')
        trip.date.splice(5, 0, 0)
        trip.date = trip.date.join('')
      }
    }
    )
    traveler = new Traveler(user, trips);
    domUpdates.loadTraveler(traveler, allDestinations);
  },
  loadAgent() {
    allTrips.map(trip => trip.location = allDestinations.filter(destination => destination.id === trip.destinationID));

    allTrips.map(trip => {
      trip.date.split('-').join('/')
      // ^^ put in conditional?

      if (typeof trip.destinationID === 'string') {
        trip.destinationID = parseInt(trip.destinationID)
      }
      if (!trip.destinationID) {
        trip.destinationID = 8
      }
      if (typeof trip.userID === 'string') {
        trip.userID = parseInt(trip.userID)
      }
      if (typeof trip.travelers === 'string') {
        trip.travlers = parseInt(trip.travelers)
      }
      if (typeof trip.duration === 'string') {
        trip.duration = parseInt(trip.duration)
      }
      if (typeof trip.id === 'string') {
        trip.id = Date.now()
      }
      if (trip.date.split('').length === 9) {
        trip.date = trip.date.split('')
        trip.date.splice(5, 0, 0)
        trip.date = trip.date.join('')
      }
    })

    agent = new Agent(allTrips, allUsers);
    domUpdates.loadAgent(agent, allDestinations);
  },
  createNewTripInstance(user, destination, travelerCount, startDate, duration) {
    trip = new Trip(user, destination, travelerCount, startDate, duration)
    domUpdates.displayConfirmationPage(trip)
  },
  postTrip(trip) {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error.message))
  },
  approveRequest(trip) {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error.message))
  },
  deleteRequest(trip) {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error.message))
  }
}

export default dataController;

