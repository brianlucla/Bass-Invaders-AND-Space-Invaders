// const inputEl = document.getElementById('search-song');
// const submitEl = document.getElementById('submit-song');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const songHandler = async function (event) {
  event.preventDefault();

  const songArray = await giveSongs();

  // Create playlist/songs and add to songs to playlist
  const playlistSongCreator = await playlistSongCreate();

  // render playlist and songs to page

};

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
    const songObject = {
      songName: songArtist[0].replace(/['"]+/g, "").slice(1,-1),
      artistName: songArtist[1].slice(1),
    };
    processedArray.push(songObject);
  }
  return processedArray;
};

const playlistSongCreate = async function(){
  const songArray = await giveSongs();
  const playlistResponse = await fetch("/api/playlist", {
    method: "POST",
    headers:{
      'Content-Type':'application/json',
    }
  }).then((result)=>{
    for (let i = 0; i < songArray.length; i++){
      const songResponse = await fetch('/api/song', {
        method:'POST',
        body:JSON.stringify({
          song_title: songArray[i].songName,
          artist: songArray[i].artistName,
          playlist_id: result.id,
        }),
        headers:{
          'Content-Type':'application/json'
        }
      });
    }
  });
}

