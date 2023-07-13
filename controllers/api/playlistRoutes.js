const router = require("express").Router();
const { Playlist, Song } = require("../../models");
const withAuth = require('../../helpers/auth');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/:id', async (req, res) => {
  try {
    const playlistData = await Playlist.findByPk(req.params.id);
    res.json(playlistData);
  } catch(error){
    res.status(500).json(error);
  }
})

router.post("/", async (req, res) => {
  // create playlist
  try {
    const songArray = await giveSongs(req.body.inputVal);
    console.log(songArray);
    const playlistData = await Playlist.create({
      userId: req.session.userId,
      song_array: songArray,
    });

    const songArray = await giveSongs(req.body.inputVal, playlistData.id);
  
    console.log(songArray);
    const songData = Song.bulkCreate(songArray);
    
    //response
    console.log(playlistData.getDataValue(song_array));
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

const giveSongs = async function (input) {
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
    // const youtubeURL = generateYoutubeURL(songTitle, artistName);
    const songObject = {
      songName: songTitle,
      artistName: artistName,
      // youtube_url: youtubeURL,
    };
    processedArray.push(songObject);
  }
  console.log("yay");
  return processedArray;
};



module.exports = router;
