const expect = chai.expect;

import chai from 'chai';

import Traveler from '../src/classes/traveler.js';

import userRepo from '../src/classes/allUsers.js';
import Agent from '../src/classes/agent.js';

import travelerData from '../data/sample-travelers.js';

import tripData from '../data/sample-trips.js';

import destinationData from '../data/sample-destinations.js';



let agent;
let destination;

describe('Agent', function() {
  beforeEach(() => {
    agent = new Agent(tripData.trips, userRepo)
    destination = destinationData.destinations
  })
  it('should be a function', () => {
    expect(Agent).to.be.a('function');
  });
  it('should instantiate a new agent', () => {
    expect(agent).to.be.an.instanceof(Agent)
  })
  it('should see all pending requests', () => {

    expect(agent.findPendingRequests().length).to.equal(2)
  })
  it('should see all approved requests', () => {
    
    expect(agent.findApprovedRequests().length).to.equal(14)
  })
  it('should have a total income in the last year', () => {
    expect(agent.getTotalIncomeInLastYear(destination)).to.equal('$1,279.90')
  })
  it('should be able to determine the number of travelers on todays date', () => {
    expect(agent.findTravelerCountToday().length).to.equal(1)
  })
  it.skip('should be able to search through users by name and view their name, trips, and amt spent.', () => {
    let users = new userRepo(travelerData)

    expect(agent.viewUserData('ham lEADbeATer', tripData)).to.deep.equal({})
  })
});