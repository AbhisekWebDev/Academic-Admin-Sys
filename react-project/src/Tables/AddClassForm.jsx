import React, { useState } from 'react'
import axios from 'axios'

  const facultyId = localStorage.getItem('userId')

function AddClassForm({ facultyId, onClassAdded }) {

    const [formData, setFormData] = useState({
        subject : '',
        time : '',
        classroom : '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/faculty/addClass', {
                ...formData,
                facultyId : localStorage.getItem('userId'),
                date: new Date().toISOString().split('T')[0] // Assuming facultyId is available in scope
            })
            alert('class added successfully!')
            if (onClassAdded) onClassAdded()
        } catch (error) {
            console.error('Error adding class:', error)
            alert('Failed to add class.')
        }
    }

  return (
    <div className="create-student-container">
      <h2>Add Class</h2>
      <div className="form-card">
        <h2 className="form-title">Enter Class Details</h2>
        <p>Use this form to add a class for today's schedule.</p>

        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-columns">
            {/* Form Column */}
            <div className="form-side">
              <div className="form-group">
                <label>Subject Name</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Classroom Number</label>
                <input
                  type="text"
                  name="classroom"
                  value={formData.classroom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Class Time</label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="e.g. 10:30 AM"
                  required
                />
              </div>
            </div>
          </div>

          <div className="submit-btn-container">
            <button type="submit" className="submit-btn">Add Class</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddClassForm