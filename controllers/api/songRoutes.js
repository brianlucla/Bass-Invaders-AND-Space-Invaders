const router = require('express').Router();
const { Song } = require('../../models');
const withAuth = require('../../helpers/auth');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/bulk', async (req, res) => {
  try {
    const songsList = await giveSongs();
    const songData = await Song.bulkCreate(songsList);
    res.status(200).end()
  } catch (err) {
    res.status(500).end()
  }
})

const giveSongs = async function () {
  const gptResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give me a list of 10 songs to listen to when I feel ${inputEl.value}`,
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
    const youtubeURL = generateYoutubeURL(songTitle, artistName);
    const songObject = {
      songName: songTitle,
      artistName: artistName,
      youtube_url: youtubeURL,
    };
    processedArray.push(songObject);
  }
  console.log("yay");
  return processedArray;
};

module.exports = router;