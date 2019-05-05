# Liri Node Application
Liri is an application that calls upon the Spotify API (Music), OMDB API (Movies), & Bands in Town API(Concerts). 

## Installations 
* npm install axios
* npm install --save node-spotify-api
* npm install moment
* npm install dotenv
* npm install fs

## Commands to run Liri
### node liri.js spotify-this-song
This command calls the Spotify API and the input is the song "In the name of Love," which I preset in the JavaScript code. The API will return the Artists, Name of song, Album that it is from, and a preview link of the song from Spotify. 
![spotify-this-song](https://media.giphy.com/media/3GlfviTgWBytvBpqfM/giphy.gif)
### node liri.js spotify-this-song name of song
This command calls the Spotify API and the user can input any song. Below is an example where the input is the song If I can't Have You. The API will return the Artists, Name of song, Album that it is from, and a preview link of the song from Spotify. 
![spotify-this-song with input](https://media.giphy.com/media/5nvNxviV8Vc33vX5jr/giphy.gif)
### node liri.js do-what-it-says
This command gets random text from a text file and performs the command in the text file. Below is an example of how this works. In the random file is spotify-this-song, "I want it that way." The API will return the Artists, Name of song, Album that it is from, and a preview link of the song from Spotify. 
![do-what-it-says](https://media.giphy.com/media/33HwUfTsaLPRBuJD8A/giphy.gif)
### node liri.js concert-this
This command calls the Bands in Town API and the input is the Randy Rogers Band which I preset in the JavaScript code. The API will return the Name of the Artist, Name of the Venue, Location of the Venue, and Date of event.
![concert-this](https://media.giphy.com/media/1X7qCAP2COboWgSIFP/giphy.gif)
### node liri.js concert-this name of artist/band
This command calls the Bands in Town API and the user can input any artist or band. Below is an example where the input is Maroon 5. The API will return the Name of the Artist, Name of the Venue, Location of the Venue, and Date of event.
![concert-this with input](https://media.giphy.com/media/24nHN5dV3qkmUOoddr/giphy.gif)
### Movie This Commands
These commands calls the OMDB API. Below is an example of the preset input written in JavaScript and user input. The API returns the movie title, year the movie came out, IMDB Rating of the movie, Rotten Tomatoes rating of the movie, Country where the movie was produced, language of the movie, and actors in the movie. 
#### node liri.js movie-this
This input is preset in JavaScript with the movie The Devil Wears Prada. 
#### node liri.js name of movie
The user can input any movie of their choice. Below is an example where the input is the movie Sweet Home Alabama.
![movie-this](https://media.giphy.com/media/3PyvnVMIF4c0QJsfF2/giphy.gif)
## Logging/Storing data in a text file
This application was written to not only call the information when you imput the commands, but it also stores the data returned in a text file to reference without needing to imput the commands again. This way the user can refer back to the text file rather than imputing the command again.
#### An Example of logging music info
![logMusicData](https://media.giphy.com/media/1etqkepoDDYCMet6g5/giphy.gif)
#### An Example of logging concert info
![logConcertData](https://media.giphy.com/media/69vcXQUMbaC1arN60f/giphy.gif)
#### An Example of logging movie info
![logMovieData](https://media.giphy.com/media/w7IMRIq50qb2ClwzeS/giphy.gif)