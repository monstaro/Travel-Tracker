import $ from 'jquery';
import dataController from './dataController.js';
const datepicker = require('js-datepicker');
import Traveler from './classes/traveler.js'


let thisTraveler; 
let allDestinations;
let idToBook; 
let chosenLocation;
let trips = [];
let startDate;
let endDate;
let travelerCount;
let tripRequest;
let pendingTrip;
let agency;
let searchEntry; 

const domUpdates = {
  loadAgent(agent, allDestinations) {
    agency = agent;
    $('.login-screen').css('display', 'none')
    $('.agent-screen').css('display', 'flex')
    $('.welcome').html('Welcome, Travel Agent Extraordinaire.' )
    $('.agent-income').html(`You have generated ${agent.getTotalIncomeInLastYear(allDestinations)} in the last year!`)
    $('.travelers-today').html(`You have ${agent.findTravelerCountToday().length} clients on a trip today!`)
    $('.client-search').html(`<input type ="text" class="client-search-input" placeholder="search clients">
                              <button  id="12"> Search Pending </button>
    </input>`)
    agent.findPendingRequests().forEach(request => {
      trips.push(request)
      $('.pending-trips').append(`<section class='pending-trip'
                                           style="box-shadow: 0px 0px 5px grey;
                                           display: grid;
                                           grid-template-columns: 1fr 1fr;
                                           margin: 20px;
                                           padding: 20px;">
      <div class="trip-image-and-name"
           style="margin: auto">
      <img src="${request.location[0].image}" width="100%" height="auto" alt="${request.location[0].alt}">
      <h2>${request.location[0].destination}</h2>
      </div>
      <div class="trip-summary">
      <h3> Trip to ${request.location[0].destination.split(',')[0]}.</h3>
      <h3>Start date: ${request.date}</h3>
      <h3>Trip duration: ${request.duration} days. </h3>
      <h3>Traveler count: ${request.travelers} </h3>
      <h3>Status: ${request.status}
      <button class="approve-request" value="10" id=${request.id}>Approve</button>
      <button class="deny-request" value="11" id=${request.id}>Deny</button>
      </div>
      </section>`)
    })
    $('.approve-request').on('click', function() {
      pendingTrip = this.id;
    })
    $('.deny-request').on('click', function() {
      pendingTrip = {id: parseInt(this.id)}
    })
    $('.client-search').on('keyup', () => {
      searchEntry = event.target.value
    })
  },
  displaySearchedUsers() {
    $('.pending-trips').empty();
    $('.filtered-clients').empty();
    let filteredUser = agency.users.filter(user => user.name.toLowerCase().includes(searchEntry.toLowerCase()));
    let searchedTravelerTrips = agency.trips.filter(trip => trip.userID === filteredUser[0].id)
    thisTraveler = new Traveler(filteredUser[0], searchedTravelerTrips)
    let pending = thisTraveler.seePendingTrips()
    if (pending.length === 0) {
      $('.filtered-clients').append(`<section class='users-trips'>${thisTraveler.name.split(' ')[0]} has no pending trips currently.</section>`)
    } else {
      pending.forEach(trip => {
        $('.filtered-clients').append(`
      <section class='users-trips'
                                           style="box-shadow: 0px 0px 5px grey;
                                           display: grid;
                                           grid-template-columns: 1fr 1fr;
                                           margin: 20px;
                                           padding: 20px;">
      <div class="trip-image-and-name"
           style="margin: auto">
      <img src="${trip.location[0].image}" width="100%" height="auto" alt="${trip.location[0].alt}">
      <h2>${trip.location[0].destination}</h2>
      </div>
      <div class="trip-summary">
      <h3> Trip to ${trip.location[0].destination.split(',')[0]}.</h3>
      <h3>Start date: ${trip.date}</h3>
      <h3>Trip duration: ${trip.duration} days. </h3>
      <h3>Traveler count: ${trip.travelers} </h3>
      <h3>Status: ${trip.status} </h3>
      <section class="approvedenybuttons">
      <button class="approve-request" value="10" id=${trip.id}>Approve</button>
      <button class="deny-request" value="11" id=${trip.id}>Deny</button>
      </section>
      </div>
      </section>`)
      })
    }
    $('.approve-request').on('click', () => pendingTrip = event.target.id)
  },
  approveRequest() {
    $('.pending-trips').html('This trip has been approved.')

    pendingTrip = agency.parseIdToLocation(trips, pendingTrip);
    let reducedTrip = {id: pendingTrip.id, status: 'approved'};
    dataController.approveRequest(reducedTrip);
  },
  deleteRequest() {
  
    $('.pending-trips').html('This trip has been denied.')
    dataController.deleteRequest(pendingTrip)
  },
  loadTraveler(traveler, destinations) {
    $('.login-screen').css('display', 'none')
    $('.traveler-screen').css('display', 'flex')
    $('.welcome').html(`Welcome, ${traveler.name}, our favorite ${traveler.travelerType}!`)
    $('.traveler-balance').html(`Your current balance is ${traveler.findAmountSpent(destinations)}`)
    thisTraveler = traveler;
    allDestinations = destinations;
  },
  beginBookNewTrip() {
    $('.selected-trips').empty()
    $('.book-trip').html('Where to?')
    allDestinations.forEach(destination => {
      $('.book-trip').append(`<section class="book-trip-destinations" 
                                       style="box-shadow: 0px 0px 5px grey;
                                              display: grid;
                                              grid-template-columns: 1fr 1fr;
                                              margin: 20px;
                                              padding: 20px;">
      <div class="trip-image-and-name"
           style="margin: auto">
      <img src="${destination.image}" width="100%" height="auto" alt="${destination.alt}">
      <h2>${destination.destination}</h2>
      </div>
      <div class="destination-summary">
      <h3>Est. Cost Per Day: $ ${destination.estimatedLodgingCostPerDay}</h3>
      <h3>Est. Roundtrip Flight Cost: $ ${destination.estimatedFlightCostPerPerson}</h3>
      <button class="book-location" value="6" id="${destination.id}">Book It</button>
      </div>
      </section>`)
    })
    $('.book-location').on('click', function() {
      idToBook = this.id
    })
  },
  selectLocation() {
    chosenLocation = thisTraveler.parseIdToLocation(allDestinations, idToBook)
    this.chooseDate()
  },
  chooseDate() {
    $('.book-trip').html(`<h2>OK, you want to go to ${chosenLocation.destination}. I hear it's lovely. </h2>
    <h3>Choose departure date:</h3>
    <input class="depart-date" placeholder="Enter Date">
    <h3>Choose return date:</h3>
    <input class="return-date" placeholder="Enter Date">
    `)
    startDate = datepicker('.depart-date', { id: 1 })
    endDate = datepicker('.return-date', { id: 1 })
    this.displayTravelerCountInput()
    // ^^ try to run this method when return date gets filled?
    // $('.return-date').on('change', this.displayTravelerCountInput())
  },
  displayTravelerCountInput() {
    $('.book-trip').append(`<h2>How many people will you be traveling with? </h2>
    <select id="traveler-count">
      <option value="101">1</option>
      <option value="102">2</option>
      <option value="103">3</option>
      <option value="104">4</option>
      <option value="105">5</option>
      <option value="106">6</option>
    </select>
    <input type="button" value="Review & Confirm" class="go-to-confirm-page"></input>
    `)
    $('#traveler-count').on('change', () => {
      travelerCount = (event.target.selectedIndex + 1)
    })
    $('.go-to-confirm-page').on('click', this.createNewTrip)
  },
  createNewTrip() {
    let duration = thisTraveler.findTripLength(startDate, endDate)
    dataController.createNewTripInstance(thisTraveler, chosenLocation, travelerCount, thisTraveler.formatDateProperly(startDate), duration)
  },
  displayConfirmationPage(trip) {
    $('.book-trip').empty()
    $('.book-trip').html(`<h1> Confirm Your Booking </h1>
    <h2>Does everything look correct?</h2>
    <p>Destination: ${chosenLocation.destination}</p>
    <p>Start Date: ${thisTraveler.formatDateProperly(startDate)}</p>
    <p>End Date: ${thisTraveler.formatDateProperly(endDate)}</p>
    <p>Duration: ${thisTraveler.findTripLength(startDate, endDate)} Days</p>
    <button class="confirm-booking"> Submit Booking Request </button>
    `)
    tripRequest = trip
    $('.confirm-booking').on('click', this.submitTripRequest)
  },
  submitTripRequest() {
    $('.book-trip').html(`Ayyye lmao pack ya bags, you goin 2 ${chosenLocation.destination.split(',')[0]}`)


    dataController.postTrip(tripRequest)


    thisTraveler.trips.push(tripRequest)
    thisTraveler.trips[thisTraveler.trips.length - 1].location = [chosenLocation]
    // ^^ kind of hacky way to have the newly booked trip display w/o havig to log back out and in.
  },
  displayTrips(tripCategory) { 
    if (!tripCategory) {
      $('.book-trip').empty()
      $('.selected-trips').empty()
    }
    $('.book-trip').empty()
    $('.selected-trips').empty()
    thisTraveler[tripCategory]().forEach(trip => {
      $('.selected-trips').append(`<section class="travler-trip" 
      style="box-shadow: 0px 0px 5px grey;
             display: grid;
             grid-template-columns: 1fr 1fr;
             margin: 20px;
             padding: 20px;">
      <div class="trip-image-and-name"
           style="margin: auto">
      <img src="${trip.location[0].image}" width="100%" height="auto">
      <h2>${trip.location[0].destination}</h2>
      </div>
      <div class="trip-summary">
      <h3> Your trip to ${trip.location[0].destination.split(',')[0]}.</h3>
      <h3>Start date: ${trip.date}</h3>
      <h3>Trip duration: ${trip.duration} days. </h3>
      <h3>Traveler count: ${trip.travelers} </h3>
      <h3>Status: ${trip.status}</h3>
      </div>
      </section>`)
    })
  }
}

export default domUpdates