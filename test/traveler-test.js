const expect = chai.expect;

import chai from 'chai';

import Traveler from '../src/classes/traveler.js';

import travelerData from '../data/sample-travelers.js';

import tripData from '../data/sample-trips.js';

import destinationData from '../data/sample-destinations.js';


let traveler

describe('Traveler', function() {
  beforeEach(() => {
    traveler = new Traveler(travelerData.travelers[3])
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
  it('should see all of the users trips', () => {
    traveler.seeAllTrips(tripData)
    
    expect(traveler.seeAllTrips(tripData)).to.deep.equal([{
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
  it('should be able to make a trip request', () => {
    
  })
  it('should find the amount spent on trips', () => {
    expect(traveler.findAmountSpent(tripData, destinationData.destinations)).to.equal(1692.9)
  })
});
