const expect = chai.expect;
import chai from 'chai';
import Utility from '../src/classes/util.js'
import Trip from '../src/classes/trip.js'
import destinationData from '../data/sample-destinations.js';

let destinations; 
let utility;
let trip;

describe('Trip', function() {
  beforeEach(() => {
    trip = new Trip(9, 12, 6, "2020/03/20", 2)
  })
  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });
  it('should instantiate a new trip', () => {
    expect(trip).to.be.an.instanceof(Trip)
  })
  it('should have an id that is based on the amount of milliseconds since jan 1 1970', () => {
    expect(trip.id).to.equal(Date.now())
  })
  // it('should take in a travelers ID', () => {
  //   expect(trip.userID).to.equal(9)
  // })
  // it('should take in a destination ID', () => {
  //   expect(trip.destinationID).to.equal(12)
  // })
  it('should take in a traveler count', () => {
    expect(trip.travelers).to.equal(6)
  })
  it('should take in a date', () => {
    expect(trip.date).to.equal("2020/03/20")
  })
  it('should have a duration of trips', () => {
    expect(trip.duration).to.equal(2)
  })
  it('should be pending by default', () => {
    expect(trip.status).to.equal('pending')
  })
  it('should have an empty array of activities by default', () => {
    expect(trip.suggestedActivities).to.deep.equal([])
  })
});