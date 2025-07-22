const express = require('express')

const {Student, Faculty, Subject, Event} = require('./DBmodel')

const router = express.Router()

// create students
router.post('/sregister', async (req, res) => {
    try {
        console.log('Request Body:', req.body)
        const { name, email, phone, role, dept, enroll_no, joiningDate } = req.body;
        const student = new Student({ name, email, phone, role, dept, enroll_no, joiningDate })
        await student.save()
        res.status(201).json(student)
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error creating student' })
    }
})

// create faculty
router.post('/fregister', async (req, res) => {
    try {
        console.log('Request Body:', req.body)
        const { name, email, phone, role, dept, faculty_no, joiningDate } = req.body
        const faculty = new Faculty({ name, email, phone, role, dept, faculty_no, joiningDate })
        await faculty.save()
        res.status(201).json(faculty)
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error creating faculty' })
    }
})

// create subjects
router.post('/createSubjects', async (req, res) => {
    try {
        console.log('Req body: ', req.body)
        const{subjectName, subjectCode} = req.body
        const subject = new Subject({subjectName, subjectCode})
        await subject.save()
        res.status(201).json(subject)
    }catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error creating subjects' })
    }
})

// get student
router.get('/viewStudent', async (req, res) => {
    try {
        const students = await Student.find()
        res.status(200).json(students)
    } catch(err) {
        res.status(400).json({message : 'error'})
    }
})

// get faculty
router.get('/viewFaculty', async (req, res) => {
    try {
        const faculty = await Faculty.find()
        res.status(200).json(faculty)
    } catch(err) {
        res.status(400).json({message : 'error'})
    }
})

// get all subjects
router.get('/viewSubjects', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subjects', error: err.message });
  }
})

// create event
router.post('/events', async (req, res) => {
    try {
        console.log('Req body: ', req.body)
        const{eventName, eventDate} = req.body
        const event = new Event({eventName, eventDate})
        await event.save()
        res.status(201).json(event)
    } catch(err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error creating events' })
    }
})

// get events
router.get('/viewEvents', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subjects', error: err.message });
  }
})

module.exports = router