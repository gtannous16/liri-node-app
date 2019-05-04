require("dotenv").config();
//node package for reading and writing files
var fs = require("fs");
//get data from the APIs
var axios = require("axios");
//gets the api from the key file
var keys = require("./keys.js");
//to format dates
var moment = require("moment");
var Spotify = require("node-spotify-api")
spotify = new Spotify(keys.spotify);

//user input from terminal
var userInput = process.argv[2];
var userChoice = process.argv;
var nameToSearch = "";

//For loop to grab user input if more than one word
for (var i = 3; i < userChoice.length; i++) {

    if (i > 3 && i < userChoice.length) {
      nameToSearch = nameToSearch + "+" + userChoice[i];
    }
    else {
      nameToSearch += userChoice[i];
    }
  }
  
  if (userInput === "do-what-it-says") {
    readTextFile();
  } else {
    readUserInput();
  }

function readUserInput() {
    if (userInput === "concert-this") {
      //Call the function to search concerts for a band with Bands In Town API
      searchBand(nameToSearch);
    }
}

//Function to search bands concert with Bands In Town API
function searchBand(string) {
    axios.get(`https://rest.bandsintown.com/artists/${string}/events?app_id=codingbootcamp`).then(
      function(response) {
    
        console.log("");
        for (var i=0; i<5;i++){
          console.log("Name of the venue: " + response.data[i].venue.name);
          console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
          console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
          console.log("");
        }
        
      }
    )
  };