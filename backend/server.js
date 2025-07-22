const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected'))
.catch((err) => console.log('error', err))

const DBroutes = require('./DBroutes')
app.use('/students', DBroutes)
app.use('/faculty', DBroutes)
app.use('/subjects', DBroutes)
app.use('/events', DBroutes)

app.get('/', (req, res) => {
    res.send('running')
})

// authRoute and protectedRoute
const authRoute = require('./auth')
const protectedRoute = require('./protected')
app.use('/api/user', authRoute)
app.use('/api', protectedRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})