const expect = chai.expect;

import chai from 'chai';

import Traveler from '../src/classes/traveler.js';

import travelerData from '../data/sample-travelers.js';

import tripData from '../data/sample-trips.js';

import destinationData from '../data/sample-destinations.js';


let traveler

describe('Traveler', function() {
  beforeEach(() => {
    traveler = new Traveler(travelerData.travelers[3], tripData.trips.filter(trip => trip.userID === travelerData.travelers[3].id))
  })
  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });
  it('should instantiate a new traveler', () => {
    expect(traveler).to.be.an.instanceof(Traveler)
  })
  it('should have an id', () => {
    expect(traveler.id).to.equal(4)
  })
  it('should have an name', () => {
    expect(traveler.name).to.equal('Leila Thebeaud')
  })
  it('should have a type of travel', () => {
    expect(traveler.travelerType).to.equal('photographer')
  })
  it('should have trips', () => {

  })
  it('should see all of the users trips', () => {
    // traveler.seeAllTrips(tripData)
    expect(traveler.trips.length).to.equal(2)
  })
  it('should see all approved trips', () => {
    expect(traveler.seeApprovedTrips().length).to.equal(2)
  })
  it('should be able to make a trip request', () => {
    
  })
  it('should find the amount spent on trips', () => {
    expect(traveler.findAmountSpent(tripData, destinationData.destinations)).to.equal(7302.9)
  })
  it('should find past trips', () => {
    expect(traveler.seePastTrips()).to.deep.equal([
      {
        "id": 1,
        "userID": 4,
        "destinationID": 49,
        "travelers": 1,
        "date": "2019/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": [
        
        ]
      }])
  })
  it('should find future trips', () => {
    expect(traveler.seeFutureTrips()).to.deep.equal([{
      "id": 15,
      "userID": 4,
      "destinationID": 13,
      "travelers": 3,
      "date": "2020/07/04",
      "duration": 6,
      "status": "approved",
      "suggestedActivities": [
      
      ]
    }])
  })
});
