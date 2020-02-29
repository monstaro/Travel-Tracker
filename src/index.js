// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
// import dataController from './dataController.js'
import domUpdates from './domUpdates.js'
import allTrips from './classes/allTrips.js'
import Traveler from './classes/traveler.js'

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// let randomId = Math.floor(Math.random() * 50)

let userName = $('.username-input')
let password = $('.password-input')
let agent;
let travelers;
let trips;
let destinations;









$('.submit-btn').on('click', function() {
  event.preventDefault()
  loginHandler()
})

const loginHandler = () => {
  let allUsernames = []
  for (var i = 0; i < 50; i++) {
    allUsernames.push(`traveler${i}`)
  }
  if (allUsernames.includes(userName.val().toLowerCase()) && password.val() === 'travel2020') {
    loginTraveler()
  }

  if (userName.val().toLowerCase() === 'agency' && password.val() === 'travel2020') {
    loginAgent()
  } 

}

const loginTraveler = () => {
  console.log('hey')
  let id = userName.val().substring(8, 10)
  loadUser(id)
  // console.log(id)
  // dataController.loadSingleUser(id)
  // domUpdates.loadTraveler()
  // let traveler = new Traveler(user.id, user.name, user.travelType)
  // console.log(traveler)
}

const loginAgent = () => {
  // agent = new Agent()
  domUpdates.loadAgent()
}

// const instantiateTrips = (tripData) => {
//     let trip = new Trip(tripData)
// }

// loginUser() {

// }