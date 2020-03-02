/* eslint-disable max-len */
import Traveler from './classes/traveler.js'
import Agent from './classes/agent.js'
import domUpdates from './domUpdates.js'
var moment = require('moment');


//DECLARE GLOBAL VARIABLES
let allUsers;
let allTrips;
let allDestinations;
let traveler;
let agent;

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

//INSTANTIATIONS
const dataController = {
  loadUser(id) {
    let user = allUsers[id - 1];
    let trips = allTrips.filter(trip => trip.userID === parseInt(id));
    console.log(trips)

    trips.map(trip => trip.location = allDestinations.filter(destination => destination.id === trip.destinationID));

    trips.map(trip => {
      trip.date.split('-').join('/')
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
    //may end up wanting to instantiate the users with their trips / mapping over the allUsers array to add the trips before I push allUsers into the agent.
    agent = new Agent(allTrips, allUsers);
    domUpdates.loadAgent(agent, allDestinations);
  }
}

export default dataController;

