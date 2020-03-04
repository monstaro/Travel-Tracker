var moment = require('moment');

const expect = chai.expect;
import chai from 'chai';
import Utility from '../src/classes/util.js'
import destinationData from '../data/sample-destinations.js';

let destinations; 
let utility;

describe('Utility', function() {
  beforeEach(() => {
    utility = new Utility()
    destinations = destinationData.destinations
  })
  it('should be a function', () => {
    expect(Utility).to.be.a('function');
  });
  it('should instantiate a new utility', () => {
    expect(utility).to.be.an.instanceof(Utility)
  })
  it('should create an array of all dates in the last year', () => {
    expect(utility.getDatesInLastYear().length).to.equal(365)
  })
  it('should turn a number into a dollar amt', () => {
    expect(utility.turnNumberIntoDollarAmount(5952353523.23423423435)).to.equal('$5,952,353,523.23')
  })
  it('should return a destination object when given an id between 1-50', () => {
    expect(utility.parseIdToLocation(destinations, 1)).to.deep.equal({
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
    })
  })
  it('should find the price of a trip', () => {
    expect(utility.findCostOfTrip({
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
    }, {
      "id": 1,
      "userID": 44,
      "destinationID": 49,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": [
        
      ]
    })).to.equal('4136')
  })
});