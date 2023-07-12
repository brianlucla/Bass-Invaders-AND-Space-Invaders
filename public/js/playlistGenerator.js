// needed for testing
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
  return playlistResponse.json();
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


faves.addEventListener("click", favoritePlaylist);
