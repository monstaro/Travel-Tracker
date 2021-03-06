import $ from 'jquery';
import dataController from './dataController.js'
import domUpdates from './domUpdates.js'
import './css/base.scss';
import './images/travel.svg'

//LOGIN VALIDATION
const loginHandler = () => {
  let userName = $('.username-input');
  let password = $('.password-input');
  let allUsernames = []
  for (var i = 0; i <= 50; i++) {
    allUsernames.push(`traveler${i}`)
  }
  if (allUsernames.includes(userName.val().toLowerCase()) && password.val() === 'travel2020') {
    loginTraveler(userName)
  }
  if (userName.val().toLowerCase() === 'agency' && password.val() === 'travel2020') {
    loginAgent()
  } 
  if (userName.val().toLowerCase() !== 'agency' || !allUsernames.includes(userName.val().toLowerCase()) && password.val() === 'travel2020') {
    $('.error:eq(0)').css('visibility', 'visible')
  }
  if (password.val() !== 'travel2020') {
    $('.error:eq(1)').css('visibility', 'visible')
  }
  if (allUsernames.includes(userName.val().toLowerCase())) {
    $('.error:eq(0)').css('visibility', 'hidden')
  }
}

let id

const loginTraveler = (userName) => {
  id = userName.val().substring(8, 10)
  dataController.loadUser(id)
}

const loginAgent = () => {
  dataController.loadAgent()
}

//DISPLAYS TRIPS FROM DROPDOWN ON TRAVELER PAGE
const travelerClickHandler = (e) => {
  if (e.target.value === "0") {
    domUpdates.displayTrips(null)
  }
  if (e.target.value === "1") {
    domUpdates.displayTrips('seeAllTrips')
  }
  if (e.target.value === "2") {
    domUpdates.displayTrips('seeFutureTrips')
  }
  if (e.target.value === "3") {
    domUpdates.displayTrips('seePastTrips')
  }
  if (e.target.value === "4") {
    domUpdates.displayTrips('seePendingTrips')
  }
  if (e.target.value === "5") {
    domUpdates.beginBookNewTrip()
  }
  if (e.target.value === "6") {
    domUpdates.selectLocation()
  }
}

const agentClickHandler = (e) => {

  if (e.target.value === "10") {
    domUpdates.approveRequest()
  }
  if (e.target.value === "11") {
    domUpdates.deleteRequest()
  }
  if (e.target.id === "13") {
    dataController.loadAgent()
  }
  if (e.target.id === "12") {
    domUpdates.displaySearchedUsers()
  }
}

// const searchForUser = (e) => {
//   if (e.target.id === "12") {
//     domUpdates.displaySearchedUsers()
//   }
// }

//EVENT LISTENERS
$('.submit-btn').on('click', function() {
  event.preventDefault()
  loginHandler()
})

$('.traveler-screen').on('click', travelerClickHandler)
$('.agent-screen').on('click', agentClickHandler)
// $('.agent-screen').on('keyup', searchForUser)