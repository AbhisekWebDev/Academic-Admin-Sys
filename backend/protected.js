// yaha user ka info dalna baadme - login krne k baad
const express = require('express')
const jwt = require('jsonwebtoken')

const {Student} = require('./DBmodel') // student ka path

const router = require('express').Router()

const auth = require('./authMiddleware')


// middleware to verify token
function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

// get current logged in student details
router.get('/dashboard', auth, async (req, res) => {
    try {
        // find the user who logged in
        const {User} = require('./DBmodel')
        const user = await User.findById(req.user._id)
        if(!user) return res.status(404).send('User not found')

        if(user.role === 'student'){
            // find student details using email
            const student = await Student.findOne({email: user.email})
            if(!student) return res.status(404).send('Student not found')
            return res.json(student)
        }

        // use this same technique for faculty aswell here

    } catch (err) {
        console.error('Dashboard error:', err)
        res.status(500).send('Server Error')
    }
})

router.get('/ping', (req, res) => {
  res.send('pong')
})

module.exports = router