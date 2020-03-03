# TravelPOP!
## Your virtual travel agent

### About
This was a project undertaken to work on good OOP Practices. It was written in about one week by just myself, and utilised many new (to me) technologies such as using Mocha/Chai Spies Testing, jQuery, working with Fetch API, as well as using class inheritance. I made an effort to keep my code as DRY as possible within my allotted timeframe, as well keep the SRP (single responsibility principle) strong. 

### Tech Used
This project was built using HTML5/ES6 syntax, SCSS, jQuery, and was tested using the Mocha framework and Chai assertion library. 

[moment.js](https://github.com/moment/moment)
[js-datepicker](https://github.com/moment/moment)

### How to Use
In your terminal, clone down `https://github.com/monstaro/Travel-Tracker.git` and run `npm install` 
Webpack is bundled in this repo, so in order to interact with the page, run `npm start`, or `npm run start`. After you start up the local server, by default the page will be viewable at `localhost:8000` in your browser, but may be on a different port depending on your configurations. 

You can also access the deployed webpage at [github pages](https://monstaro.github.io/Travel-Tracker/).

There are 50 users on the server, each with an id of 1-50. A user can log in as a traveler with the username `traveler<1-50>` and password `travel2020`. Similarly, the travel agent can log in using `agency` and the same password.

From there, a client can view a list of trips (pending, approved, past, all) and book a new trip based off of a list of destinations. When the user inputs the dates, traveler count, and destination, they see a confirmation page and are able to submit that trip request for a server.

An agent can then log in, and see that trip at the bottom of their pending requests page. The agent can either approve or deny it, which will once again update the status of that trip in the server. 

### Screenshots

<img width="400" alt="login screen" src="https://user-images.githubusercontent.com/32964891/75829277-01204f80-5d6b-11ea-9153-3e65cc6dc799.png">
<img width="400" alt="booking trip 1" src="https://user-images.githubusercontent.com/32964891/75829278-01b8e600-5d6b-11ea-8646-d59912ce5436.png">
<img width="400" alt="booking trip 2" src="https://user-images.githubusercontent.com/32964891/75829280-01b8e600-5d6b-11ea-856b-d30c9a9d67fe.png">
<img width="400" alt="agency view" src="https://user-images.githubusercontent.com/32964891/75829281-02517c80-5d6b-11ea-8a17-5ab1d0d96d4c.png">


### Future Iterations
- I would like to break out my `domUpdates` file into more modular parts in the future. 
- On the traveler view, a client cannot request a return date before their departure date, but the departure date still allows a date before today to be chosen. When I tried to set up a min-date on the departure date, it removed the min-date functionality for the departure date. 
- When a user trips 'book trip' again after booking one trip, the date picker doesn't work. 
- User search function for agent. Currently the agent can search through a list of users by name, but no information shows about them. I would like for users to show up and have the agent able to approve/deny trip requests and see the income generated from that user. 
- I would like to try more secure ways of working with login forms. Currently, the usernames and passwords are static. 
