import $ from 'jquery';


let thisTraveler; 

const domUpdates = {
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
      <img src="${request.location[0].image}" width="100%" height="auto">
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
  },
  bookTrip() {

  },
  displayTrips(tripCategory) { 
    if (!tripCategory) {
      $('.selected-trips').empty()
    }
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
      <h3>Status: ${trip.status}
      </div>
      </section>`)
    })
  }
}

export default domUpdates