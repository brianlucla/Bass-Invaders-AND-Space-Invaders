// needed for testing
// require('path');
// require('dotenv').config({path:__dirname+'/../../.env'});
// require('path');
// require('dotenv').config({path:__dirname+'/../../.env'});

const inputEl = document.getElementById('search-song');
const submitEl = document.getElementById('submit-song');
const playlistEl = document.getElementById('single-playlist');
const faves = document.getElementById("favorite-btn");
const video1El = document.getElementById('video-1');
const video2El = document.getElementById('video-2');
const video3El = document.getElementById('video-3');
const video4El = document.getElementById('video-4');
const video5El = document.getElementById('video-5');

let playlistID;


const baseApiUrlY = "https://www.googleapis.com/youtube/v3";

const songHandler = async function (event) {
  event.preventDefault();

  // Create playlist/songs and add to songs to playlist
  const playlistSongCreator = await playlistCreate();
  console.log("this is what we're looking for",playlistSongCreator.id);
  playlistID = playlistSongCreator.id

  // render
  const getSong = await fetch(`/api/playlist/${playlistID}`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json'
    }
  });

  let i = 1;
  const songData = await getSong.json();
  playlistEl.textContent = '';
  const mappedArray = songData.songs.map((song)=>{
    playlistEl.textContent += `\n
    Song Title: ${song.song_title}\n
    Artist: ${song.artist}\n
    Youtube Link: ${song.youtube_url}
    `;
    console.log(i);
    const videoEl = document.getElementById(`video-${i++}`);
    
    console.log(videoEl);
    videoEl.setAttribute("src", `${song.youtube_url}`);
    
    
  });
};

// returns array of song objects containing name, artist, and youtube link

const playlistCreate = async function(){
  const playlistResponse = await fetch("/api/playlist", {
    method: "POST",
    body:JSON.stringify({
      inputVal: inputEl.value,
    }),
    headers:{
      'Content-Type':'application/json',
    }
  });
  // .then((result)=>{
  //   console.log(result)
  //   // songsCreate(array);
  // });
}

const getFunction = async function(){
  const response = await fetch('/api/playlist',{
    method:"GET",
    headers:{
      'Content-Type':'application/json'
    }
  });

  console.log(response)
}

getFunction();

// creates song and adds to database

// const songsCreate = async function(array, result){
//   await fetch('/api/song/bulk', {
//     method: 'POST',
//     body: JSON.stringify({
//       songs: array
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

//   return
//   // for (let i = 0; i < array.length; i++) {
//   //   const songResponse = fetch("/api/song", {
//   //     method: "POST",
//   //     body: JSON.stringify({
//   //       song_title: array[i].songName,
//   //       artist: array[i].artistName,
//   //       playlist_id: result.id,
//   //       youtube_url:array[i].youtube_url,
//   //     }),
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //   });
//   // }
// }


// generates youtube url's for each song in playlist

const generateYoutubeURL = async function (songName, artistName) {
  const songSearchTerms = songName.split(" ");
  const artistSearchTerms = artistName.split(" ");
  let combinedSearchTerm = "";

  for (let i = 0; i < songSearchTerms.length; i++) {
    combinedSearchTerm += `${songSearchTerms[i]}+`;
  }

  for (let j = 0; j < artistSearchTerms.length; j++) {
    if (j === artistSearchTerms.length - 1) {
      combinedSearchTerm += `${artistSearchTerms[j]}`;
    } else {
      combinedSearchTerm += `${artistSearchTerms[j]}+`;
    }
  }

submitEl.addEventListener('click', songHandler);``

  console.log(apiURL);
const generateYoutubeURL = async function (songName, artistName) {
  const songSearchTerms = songName.split(" ");
  const artistSearchTerms = artistName.split(" ");
  let combinedSearchTerm = "";

<<<<<<< HEAD
=======
  for (let i = 0; i < songSearchTerms.length; i++) {
    combinedSearchTerm += `${songSearchTerms[i]}+`;
  }

  for (let j = 0; j < artistSearchTerms.length; j++) {
    if (j === artistSearchTerms.length - 1) {
      combinedSearchTerm += `${artistSearchTerms[j]}`;
    } else {
      combinedSearchTerm += `${artistSearchTerms[j]}+`;
    }
  }

const favoritePlaylist = async function(){
  
  console.log(playlistID);
  const response = await fetch(`/api/playlist/${playlistID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("Item favorite status updated");
    // Perform any necessary actions after updating the favorite status
  } else {
    console.log("Failed to update item favorite status");
  }
}

submitEl.addEventListener('click', songHandler);

// giveSongs();

faves.addEventListener("click", favoritePlaylist);
