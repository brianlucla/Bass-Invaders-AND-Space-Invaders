const router = require('express').Router()
const { Playlist, Song } = require('../models')
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/', async (req, res) => {
  // create playlist and render to page
  try {
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: req.body},
      ],
    });
    console.log(completion.data.choices[0].message);
    const playlistData = await Playlist.create();
  } catch (error) {
    
  }
  res.render('home')
});



module.exports = router
