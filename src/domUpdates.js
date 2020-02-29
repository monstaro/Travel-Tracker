import $ from 'jquery';
import dataController from './dataController.js'




const domUpdates = {
  loadAgent() {
    $('.login-screen').css('display', 'none')
  },
  loadTraveler(traveler, destinations) {
    $('.login-screen').css('display', 'none')
    $('.traveler-screen').css('display', 'flex')
    $('.welcome').html(`Welcome, ${traveler.name}, our favorite ${traveler.travelerType}!`)
    $('.traveler-balance').html(`Your current balance is ${traveler.findAmountSpent(destinations)}`)
    traveler.trips.forEach(trip => {
      $('.selected-trips').append(`<section class="travler-trip" 
      style="box-shadow: 0px 0px 5px grey;
             padding: 20px;
             margin: 20px;">
      <img src="${trip.location[0].image}" width="200px" height="auto">
      ${trip.location[0].destination}
      </section>`)
      $('.traveler-trip').css('box-shadow', '0px 0px 5px  black')
    })
  },
  loadTravelerAllTrips() {
    console.log('hi')
  }
}

export default domUpdates