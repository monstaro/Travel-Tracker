import $ from 'jquery';


const datepicker = require('js-datepicker')
import Moment from 'moment'
const picker = datepicker('.book-trip')
// const start = datepicker('.start', { id: 1 })
// const end = datepicker('.end', { id: 1 })

// start.getRange()
// end.getRange()

let thisTraveler; 
let allDestinations;
let idToBook; 
let chosenLocation;

const domUpdates = {
  addDatePicker() {
    flatpickr(".book-trip", {
      dateFormat: "Y/m/d"
    })
  },
  loadAgent(agent, allDestinations) {
    $('.login-screen').css('display', 'none')
    $('.agent-screen').css('display', 'flex')
    $('.welcome').html('Welcome, Travel Agent Extraordinaire.' )
    $('.agent-income').html(`You have generated ${agent.getTotalIncomeInLastYear(allDestinations)} in the last year!`)
    $('.travelers-today').html(`You have ${agent.findTravelerCountToday().length} clients on a trip today!`)
    agent.findPendingRequests().forEach(request => {
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
      </div>
      </section>`)
    })
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
    $('.book-trip').html(`OK, you want to go to ${chosenLocation.destination}. I hear it's lovely. When you tryna go?`)
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