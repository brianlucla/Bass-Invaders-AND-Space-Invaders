// needed for testing
require('path');
require('dotenv').config({path:__dirname+'/../../.env'});

// uncomment later
// const inputEl = document.getElementById('search-song');
// const submitEl = document.getElementById('submit-song');

// youtube search method: var ytApi = `${baseApiUrlY}/search?key=${apiKeyY}&part=snippet&q=${song and artist}&maxResults=1`;
const baseApiUrlY = "https://www.googleapis.com/youtube/v3";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const songHandler = async function (event) {
  event.preventDefault();

  const songArray = await giveSongs();

  // Create playlist/songs and add to songs to playlist
  const playlistSongCreator = await playlistSongCreate(songArray);

  // render playlist and songs to page

};

// returns array of song objects containing name, artist, and youtube link
const giveSongs = async function () {
  const gptResponse = await openai.createCompletion({
    model:"text-davinci-003",
    prompt: "Give me a list of 10 songs to listen to when I feel happy",
    max_tokens: 200,
    temperature: 0.9,
  });

  const stringToSplit = gptResponse.data.choices[0].text;
  const splitString = stringToSplit.split('\n');
  const slicedArray = splitString.slice(2, 7);
  const processedArray = [];
  const slicedArraySplit=[];
  for (let i = 0; i < slicedArray.length; i++){
    slicedArraySplit.push(slicedArray[i].split('.'));
  }
  
  for(let i = 0; i < slicedArraySplit.length; i++){
    const songArtist = (slicedArraySplit[i])[1].split('by');
    const songTitle = songArtist[0].replace(/['"]+/g, "").slice(1,-1);
    const artistName = songArtist[1].slice(1);
    const youtubeURL = generateYoutubeURL(songTitle, artistName);
    const songObject = {
      songName: songTitle,
      artistName: artistName,
      youtube_url: youtubeURL,
    };
    processedArray.push(songObject);
  }
  console.log('yay');
  return processedArray;
};

const playlistCreate = async function(array){
  const array = await giveSongs();
  const playlistResponse = await fetch("/api/playlist", {
    method: "POST",
    headers:{
      'Content-Type':'application/json',
    }
  }).then((array, result)=>{
    songsCreate();
  });
}

// creates song and adds to database
const songsCreate = async function(array, result){
  for (let i = 0; i < array.length; i++) {
    const songResponse = fetch("/api/song", {
      method: "POST",
      body: JSON.stringify({
        song_title: array[i].songName,
        artist: array[i].artistName,
        playlist_id: result.id,
        youtube_url:array[i].youtube_url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}


// generates youtube url's for each song in playlist
const generateYoutubeURL = async function(songName, artistName){
  const songSearchTerms = songName.split(' ');
  const artistSearchTerms = artistName.split(' ');
  let combinedSearchTerm = '';

  for (let i = 0; i < songSearchTerms.length; i++){
    combinedSearchTerm+= `${songSearchTerms[i]}+`;
  };

  for(let j = 0; j < artistSearchTerms.length; j++){
    if(j ===artistSearchTerms.length-1){
      combinedSearchTerm+=`${artistSearchTerms[j]}`;
    } else {
      combinedSearchTerm += `${artistSearchTerms[j]}+`;
    }
  }

  const apiURL = `${baseApiUrlY}/search?key=${process.env.YOUTUBE_KEY}&part=snippet&q=${combinedSearchTerm}&maxResults=1`;

  console.log(apiURL);

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.items[0].id.videoId);
      console.log(`https://www.youtube.com/embed/${data.items[0].id.videoId}`);
      return `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
    });
}


giveSongs();