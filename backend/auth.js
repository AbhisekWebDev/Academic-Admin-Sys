const express = require('express')
const router = express.Router()
// destructure the userSchema - because im exporting multiple models from DBmodel...islye
const {User} = require('./DBmodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./userValidation')

require('dotenv').config()

// register ka part
router.post('/userRegister', async (req, res) => {
    
    // validating input
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    // chek user exist krta h ya nhi
    const existingUser = await User.findOne({email: req.body.email})
    if(existingUser) return res.status(400).send('Email already exists')
    
    // passwordHashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // create user
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        role : req.body.role,
        password : hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.send({userId: savedUser._id})
    } catch(err) {
        res.status(400).send(err);
    }
})

// login ka part
router.post('/userLogin', async (req, res) => {
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Invalid email')

    // compare password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid password')

    // creating jwt
    const token = jwt.sign(
        {_id : user._id, name: user.name, email: user.email, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn : '24h'}
    )

    res.header('auth-token', token).send({token})
})

module.exports = router