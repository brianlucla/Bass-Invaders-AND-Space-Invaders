const router = require('express').Router()
const { User } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    })

    req.session.save(() => {
      req.session.userId = newUser.id
      req.session.username = newUser.username
      req.session.loggedIn = true

      res.json(newUser)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })

    if (!user) {
      res.status(400).json({ message: 'Invalid username or password' })
    }

    const validPw = user.checkPassword(req.body.password)

    if (!validPw) {
      res.status(400).json({ message: 'Invalid username or password' })
    }

    req.session.save(() => {
      req.session.userId = user.id
      req.session.username = user.username
      req.session.loggedIn = true

      res.json(user)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router
