import $ from 'jquery';



let thisTraveler; 

const domUpdates = {
  loadAgent() {
    $('.login-screen').css('display', 'none')
  },
  loadTraveler(traveler, destinations) {
    $('.login-screen').css('display', 'none')
    $('.traveler-screen').css('display', 'flex')
    $('.welcome').html(`Welcome, ${traveler.name}, our favorite ${traveler.travelerType}!`)
    $('.traveler-balance').html(`Your current balance is ${traveler.findAmountSpent(destinations)}`)
    thisTraveler = traveler;
  },
  displayTrips(tripCategory) { 
    $('.selected-trips').empty()
    thisTraveler[tripCategory]().forEach(trip => {
      $('.selected-trips').append(`<section class="travler-trip" 
      style="box-shadow: 0px 0px 5px grey;
             padding: 20px;
             margin: 20px;
             display: flex;
             flex-direction: row;
             justify-content: space-between">
      <div class="trip-image-and-name"
           style="margin: auto">
      <img src="${trip.location[0].image}" width="50%" height="auto">
      <h2>${trip.location[0].destination}</h2>
      </div>
      <div class="trip-summary"
           style="display: flex;
                  flex-direction: column;">
      <h3> Your trip to ${trip.location[0].destination.split(',')[0]}.</h3>
      <h3>Start date: ${trip.date}</h3>
      <h3>Trip duration: ${trip.duration} days. </h3>
      <h3>Traveler count: ${trip.travelers} </h3>
      <h3>Status: ${trip.status}
      </div>
      </section>`)
    })
  }
}

export default domUpdates