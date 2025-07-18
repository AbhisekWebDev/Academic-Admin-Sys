// yaha user ka info dalna baadme - login krne k baad

const router = require('express').Router()

const auth = require('./authMiddleware')

router.get('/dashboard', auth, (req, res) => {
    res.send(`Welcome ${req.user.name}, this is your dashboard`)
})

module.exports = router