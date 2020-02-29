
const allUserData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(data => data.travelers)
  .catch(error => console.log(error.message))

const allTripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  .then(response => response.json())
  .then(data => data.trips)
  .catch(error => console.log(error.message))

const allDestinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(data => data.destinations)
  .catch(error => console.log(error.message))



Promise.all([allUserData, allTripsData, allDestinationsData])
  .then(data => console.log(data))
