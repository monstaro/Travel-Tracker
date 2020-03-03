/* eslint-disable indent */


class Fetch {
  constructor() {
  }
  userData() {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
    .then(response => response.json())
    .then(data => data.travelers)
    .catch(error => console.log(error.message))
  }
  postBooking(trip) {
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
  }
}

export default Fetch