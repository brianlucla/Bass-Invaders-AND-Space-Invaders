const router = require("express").Router();
const { Playlist, Song } = require("../../models");
const withAuth = require('../../helpers/auth');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const baseApiUrlY = "https://www.googleapis.com/youtube/v3";

router.get('/:id', async (req, res) => {
  try {
    const playlistData = await Playlist.findByPk(req.params.id, {
      include: [Song],
    });
    res.json(playlistData);
  } catch(error){
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create playlist
  try {
    const playlistData = await Playlist.create({
      userId: req.session.userId,
    });

    const songArray = await giveSongs(req.body.inputVal, playlistData.id);
  
    console.log(songArray);
    const songData = Song.bulkCreate(songArray);
    
    //response
    res.json(playlistData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const playlistData = await Playlist.update(
      { favorite: true },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(playlistData);
    //response
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", withAuth, async (req, res) => {
  try {
    const playlistData = await Playlist.destroy({
      where: {
        id: req.body.id,
      },
    });
    //response
    res.json(playlistData);
  } catch (error) {
    res.status(500).json(error);
  }
});

const giveSongs = async function (input, id) {
  const gptResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give me a list of 10 songs to listen to when I feel ${input}`,
    max_tokens: 100,
    temperature: 0.9,
  });

  const stringToSplit = gptResponse.data.choices[0].text;
  const splitString = stringToSplit.split("\n");
  const slicedArray = splitString.slice(2, 7);
  const processedArray = [];
  const slicedArraySplit = [];
  for (let i = 0; i < slicedArray.length; i++) {
    slicedArraySplit.push(slicedArray[i].split("."));
  }

  for (let i = 0; i < slicedArraySplit.length; i++) {
    const songArtist = slicedArraySplit[i][1].split("by");
    const songTitle = songArtist[0].replace(/['"]+/g, "").slice(1, -1);
    const artistName = songArtist[1].slice(1);
    const songSearchTerms = songTitle.split(" ");
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

    const apiURL = `${baseApiUrlY}/search?key=${process.env.YOUTUBE_KEY}&part=snippet&q=${combinedSearchTerm}&maxResults=1`;

    console.log(apiURL);

    const youtubeURL = await fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items[0].id.videoId);
        console.log(
          `https://www.youtube.com/embed/${data.items[0].id.videoId}`
        );
        return `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
      });
    const songObject = {
      song_title: songTitle,
      artist: artistName,
      youtube_url: youtubeURL,
      playlist_id:id
    };
    processedArray.push(songObject);
    
  }
  
  return processedArray;
};

const generateYoutubeURL = function (songName, artistName) {
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

  const apiURL = `${baseApiUrlY}/search?key=${process.env.YOUTUBE_KEY}&part=snippet&q=${combinedSearchTerm}&maxResults=1`;

  console.log(apiURL);

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.items[0].id.videoId);
      console.log(`https://www.youtube.com/embed/${data.items[0].id.videoId}`);
      return `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
    });
};



module.exports = router;
