const express = require('express')

const {Student, Faculty, Subject, Event, StudentSubject} = require('./DBmodel')

const router = express.Router()

const upload = require('./uploadConfigMulter')

// create students
router.post('/sregister', upload.single('photo'), async (req, res) => {
    try {
        const student = new Student({
            ...req.body,
            photo: req.file.path // store path of uploaded file
        })
        await student.save()
        res.status(201).send("Student added")
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error creating student' })
    }
})

// create faculty
router.post('/fregister', upload.single('photo'), async (req, res) => {
    try {
        const faculty = new Faculty({
            ...req.body,
            photo: req.file.path.replace(/\\/g, '/') // store path of uploaded file
        })
        await faculty.save()
        res.status(201).send("Faculty added")
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error creating Faculty' })
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

// get student by id
router.get('/viewStudent/:id', async (req, res) =>{
    try{
        const student = await Student.findById(req.params.id)
        if(!student)
            return res.status(404).json({message: 'Student not found'})
        
        res.status(200).json(student)
    } catch(err) {
        res.status(500).json({message: 'Error fetching student'})
    }
})

//update student details
router.put('/viewStudent/:id', upload.single('image'), async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, {
            ...req.body,
            photo: req.file ? req.file.path.replace(/\\/g, '/') : undefined // update photo if file is provided
        }, { new: true })

        if (!student) {
            return res.status(404).json({ message: 'Student not found' })
        }

        res.status(200).json(student)
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error updating student' })
    }
})

// delete student
router.delete('/deleteStudent/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        if (!student) {
            return res.status(404).json({ message: 'Student not found' })
        }
        res.status(200).json({ message: 'Student deleted successfully' })
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error deleting student' })
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

// get faculty by id
router.get('/viewFaculty/:id', async (req, res) =>{
    try{
        const faculty = await Faculty.findById(req.params.id)
        if(!faculty)
            return res.status(404).json({message: 'faculty not found'})
        
        res.status(200).json(faculty)
    } catch(err) {
        res.status(500).json({message: 'Error fetching faculty'})
    }
})

// update faculty details
router.put('/viewFaculty/:id', upload.single('image'), async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, {
            ...req.body,
            photo: req.file ? req.file.path.replace(/\\/g, '/') : undefined // update photo if file is provided
        }, { new: true })

        if (!faculty) {
            return res.status(404).json({ message: 'faculty not found' })
        }

        res.status(200).json(faculty)
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error updating faculty' })
    }
})

// delete faculty
router.delete('/deleteFaculty/:id', async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id)
        if (!faculty) {
            return res.status(404).json({ message: 'faculty not found' })
        }
        res.status(200).json({ message: 'faculty deleted successfully' })
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error deleting faculty' })
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

// student subjects assign
router.post('/assign', async (req, res) => {
    const { studentId, subjectId, facultyId } = req.body
    try{
        const exists = await StudentSubject.findOne({ student: studentId, subject: subjectId, faculty: facultyId })

        if (exists) 
            return res.status(400).json({ message: 'Subject already assigned to student' })
        
        const assignment = new StudentSubject({
            student: studentId,
            subject: subjectId,
            faculty: facultyId
        })
        await assignment.save()
        res.status(201).json({ message: 'Subject assigned to student successfully' })
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error assigning subject to student' })
    }
})

// get all subjects for a student
router.get('/viewStudentSubjects/:studentId', async (req, res) => {
    try {
        const subjects = await StudentSubject.find({ student: req.params.studentId })
            .populate('subject')
            .populate('faculty', 'name email');
        
        res.status(200).json(subjects);
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error fetching student subjects' })
    }
})

// get grades for a student
router.get('/viewStudentGrades/:studentId', async (req, res) => {
    try {
        const grades = await StudentSubject.find({ student: req.params.studentId })
            .populate('subject', 'subjectName subjectCode')
            .select('marks attendance subject faculty')
        if (!grades || grades.length === 0) {
            return res.status(404).json({ message: 'No grades found for this student' })
        }
        res.status(200).json(grades)
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error fetching student grades' })
    }
})

// update student subject marks and attendance
router.put('/updateStudentSubject/:id', async (req, res) => {
    try {
        const { marks, attendance } = req.body
        const updatedAssignment = await StudentSubject.findByIdAndUpdate(
            req.params.id,
            { marks, attendance },
            { new: true }
        )

        if (!updatedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' })
        }

        res.status(200).json(updatedAssignment)
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error updating student subject' })
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