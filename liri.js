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
        var divider = "\n**********************************************************************************************************************\n"
        var concertData = response.data;
        for(let i = 0; i < 5; i++){

        var showConcertData = [
          "Name of the venue: " + concertData[i].venue.name,
          "Venue location: " + concertData[i].venue.city + ", " + concertData[i].venue.region,
          "Date of the Event: " + moment(concertData[i].datetime).format("MM/DD/YYYY")
        ].join("\n");
         console.log(divider + showConcertData + divider);
         fs.appendFile("log.txt",divider + showConcertData + divider, function(err) {
        if (err) throw err;
      }
       
      )}
    
      });

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
        var divider = "\n\n**********************************************************************************************************************\n\n"
        var movieData = response.data;
        var showMovieData = [
          "Title of the Movie: " + movieData.Title,
          "Year the Movie Came Out: " + movieData.Year,
          "IMDB Rating of the Movie: " + movieData.Ratings[0].Value,
          "Rotten Tomatoes Rating of the Movie: " + movieData.Ratings[1].Value,
          "Country where the Movie was Produced: " + movieData.Country,
          "Language of the Movie: " + movieData.Language,
          "Plot of the Movie: " + movieData.Plot,
          "Actors in the Movie: " + movieData.Actors,
        ].join("\n\n")
        fs.appendFile("log.txt",divider + showMovieData + divider, function(err) {
          if (err) throw err;
          console.log(divider + showMovieData + divider);
        });
      }
    )
  };
  
  //Function to search song on Spotify API
  function searchSong(param) {
    var divider = "***********************************************************************************************************************************"
    spotify.search({ type: 'track', query: param }, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
    //loop through the array of songs
    console.log("");

    var songs = data.tracks.items;
   
    for (var i=0; i < 5; i++){
      var showMusicData = [
      "\nSong's Name: " + songs[i].name,
      "\nArtist: " + songs[i].artists.map(getArtistsNames),
      "\nPreview Link: " + songs[i].preview_url,
      "\nAlbum: " + songs[i].album.name
      ]

      console.log( divider + "\n" + showMusicData + "\n")
     fs.appendFile("log.txt", divider + showMusicData + "\n", function(err) {
      if (err) throw err;
    });
    }

    
  });
}
function getArtistsNames(artist) {
    return artist.name;
  }
