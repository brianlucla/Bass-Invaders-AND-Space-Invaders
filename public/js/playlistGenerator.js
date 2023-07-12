// needed for testing
// require('path');
// require('dotenv').config({path:__dirname+'/../../.env'});

const inputEl = document.getElementById('search-song');
const submitEl = document.getElementById('submit-song');



const songHandler = async function (event) {
  event.preventDefault();

  // Create playlist/songs and add to songs to playlist
  const playlistSongCreator = await playlistCreate();

  

  

  // render playlist and songs to page
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


submitEl.addEventListener('click', songHandler);``

// giveSongs();

