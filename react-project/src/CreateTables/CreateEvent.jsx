import {React, useState} from 'react'
import './CreateStudent.css'
import axios from 'axios'

function CreateEvent() {

    const [formData, setFormData] = useState(
            {
                eventName: '',
                eventDate: ''
            }
        )
    
        const handleChange = (e) => {
            setFormData(
                {
                    ...formData,
                    [e.target.name] : e.target.value
    
                }
            )
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                await axios.post('http://localhost:5000/events/events', formData)
                alert('success')
                setFormData(
                    {
                        eventName: '',
                        eventDate: ''
                    }
                )
            } catch (err) {
                alert('Error adding user')
                console.log(err)
            }
        }

  return (
    <div className="create-student-container">
      <div className="form-card">
        <h2 className="form-title">Add Event</h2>
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-columns">
            <div className="form-side">
              <div className="form-group">
                <label>Event Name</label>
                <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Enter event" required />
              </div>

              <div className="form-group">
                <label>Event Date</label>
                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
              </div>

              <div className="submit-btn-container">
                <button type="submit" className="submit-btn">Add</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent