const router = require('express').Router()
const { User } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password
    })

    req.session.save(() => {
      req.session.userId = newUser.id
      req.session.email = newUser.email
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
        email: req.body.email
      }
    })

    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' })
    }

    const validPw = user.checkPassword(req.body.password)

    if (!validPw) {
      res.status(400).json({ message: 'Invalid email or password' })
    }

    req.session.save(() => {
      req.session.userId = user.id
      req.session.email = user.email
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
