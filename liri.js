require("dotenv").config();
//node package for reading and writing files
var fs = require("fs");
//get data from the APIs
var axios = require("axios");
//gets the api from the key file
var keys = require("./keys.js");
//to format dates
var moment = require("moment");
//spotify api key
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
    } else if (userInput === "movie-this") {
        //Call the function to search movie info with OMDB API
        //If no movie entered, search Mr.Nobody
        if (!nameToSearch) {
          searchMovie("Mr.Nobody")
        } else {
          searchMovie(nameToSearch);
        }
    } else if (userInput === "spotify-this-song") {
        //Call the function to search songs with Spotify
        //If no song entered, search the song "The Sign"
        if (!nameToSearch) {
            searchSong("In the Name of Love");
        } else {
            searchSong(nameToSearch);
        }   
    }
}
//Function to search bands concert with Bands In Town API
function searchBand(string) {
    axios.get(`https://rest.bandsintown.com/artists/${string}/events?app_id=codingbootcamp`).then(
      function(response) {
        
        
        for (var i=0; i<5;i++){
          console.log("**********************************************************************")
          console.log("Name of the venue: " + response.data[i].venue.name);
          console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
          console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
        }
        
      }
    )
  };
  //Function to search data from the random.txt file (Still not working)
  function readTextFile () {
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      var dataArr = data.split(",");
      console.log(dataArr);
  
      userInput = dataArr[0];
      nameToSearch = dataArr[1];
      readUserInput();
    })
  };
  //Function to search movie with OMDB  API
  function searchMovie(string) {
    axios.get(`http://www.omdbapi.com/?t=${string}&y=&plot=short&apikey=trilogy`).then(
      function(response) {
        console.log("***********************************************************************************************************************************")
        console.log("");
        console.log("Title of the Movie: " + response.data.Title);
        console.log("Year the Movie Came Out: " + response.data.Year);
        console.log("IMDB Rating of the Movie: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating of the Movie: " + response.data.Ratings[1].Value);
        console.log("Country where the Movie was Produced: " + response.data.Country);
        console.log("Language of the Movie: " + response.data.Language);
        console.log("Plot of the Movie: " + response.data.Plot);
        console.log("Actors in the Movie: " + response.data.Actors);
        console.log("");
        console.log("***********************************************************************************************************************************")
      }
    )
  };
  
  //Function to search song on Spotify API
  function searchSong(param) {
    spotify.search({ type: 'track', query: param }, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
    //loop through the array of songs
    console.log("");
    var songs = data.tracks.items;
    for (var i=0; i<songs.length;i++){
      console.log("***********************************************************************************************************************************")
      console.log("Song's Name: " + songs[i].name);
      console.log("Artist: " + songs[i].artists.map(getArtistsNames));
      console.log("Preview Link: " + songs[i].preview_url);
      console.log("Album: " + songs[i].album.name);
    } 
  
  });
}
function getArtistsNames(artist) {
    return artist.name;
  }
