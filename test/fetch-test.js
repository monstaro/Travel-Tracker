const expect = chai.expect;
import chai from 'chai';
import Fetch from '../data/sample-fetch.js'
import spies from 'chai-spies'
chai.use(spies)

let fetch;



describe('dataController', function() {
  beforeEach(() => {
    // global.window = {}
    chai.spy.on(global, 'fetch', () => new Promise((resolve, reject) => {}));
    fetch = new Fetch()
  })
  afterEach(() => {
    chai.spy.restore()
  })
  it('should be able to fetch users', () => {
    fetch.userData()
    expect(global.fetch).to.be.called(1);
    expect(global.fetch).to.be.called.with('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  })
  it('should be able to post a trip', () => {
    console.log(global)
    let trip = {
      id: 1583251593634,
      userID: 33,
      destinationID: 15,
      travelers: 2,
      date: "2020/05/03",
      duration: 21,
      status: "pending",
      suggestedActivities: []
    }
    fetch.postBooking(trip)
    expect(global.fetch).to.be.called(1);
    expect(global.fetch).to.be.called.with('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  })
});