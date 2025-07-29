import React, { useState } from 'react'
import axios from 'axios'

function FacultyExamSchedule() {

    const [subjectCode, setSubjectCode] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [examDate, setExamDate] = useState('')
    const [createdBy, setCreatedBy] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!subjectCode || !subjectName || !examDate) {
            alert('Please fill all fields')
            return
        }

        try {
            await axios.post('http://localhost:5000/api/examSchedule', {
                subjectCode,
                subjectName,
                examDate,
                createdBy
            })
            alert('Schedule added!')
            setSubjectCode('')
            setSubjectName('')
            setExamDate('')
            // Here you would typically send the data to your backend
            console.log('Exam Schedule Submitted:', {
                subjectCode,
                subjectName,
                examDate,
                createdBy
            })

            // Reset form fields
            setSubjectCode('')
            setSubjectName('')
            setExamDate('')
        } catch (error) {
            console.error('Error submitting exam schedule:', error)
            alert('Failed to submit exam schedule')
        }
    }

  return (
    <div className="create-student-container">
  <h2>Set Schedule</h2>
  <div className="form-card">
    <h2 className="form-title">Enter Exam Schedule</h2>
    <p>Use the form below to enter the exam schedule for students.</p>

    <form onSubmit={handleSubmit} className="student-form">
      <div className="form-columns">
        {/* Left column */}
        <div className="form-side">
          <div className="form-group">
            <label>Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Subject Code/Practical Code</label>
            <input
              type="text"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Right column */}
        <div className="form-side">
          <div className="form-group">
            <label>Subject Name/Practical Name</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Faculty Name</label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="submit-btn-container">
        <button type="submit" className="submit-btn">Add Schedule</button>
      </div>
    </form>
  </div>
</div>
  )
}

export default FacultyExamSchedule