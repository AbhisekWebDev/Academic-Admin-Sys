import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function EditTableStudent() {

    const {id} = useParams() // fetch studentID
    console.log("editing student with ID:", id)

    const [updateData, setUpdateData] = useState(
        {
            name: '',
            email: '',
            phone: '',
            role: '',
            dept: '',
            enroll_no: '',
            joiningDate: '',
            photo: ''
        }
    )

    // file upload ka state
    const [file, setFile] = useState(null)

    const handleChange = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value // update the specific field
        })
    }
    
    useEffect(() => {
        // fetch student data to pre-fill the form
        axios.get(`http://localhost:5000/students/viewStudent/${id}`)
            .then(res => {
                {/*} setUpdateData(res.data) */}
            
                const fetchedData = res.data
                // date to yyyy-mm-dd for <input type="date" />
                if (fetchedData.joiningDate) {
                    fetchedData.joiningDate = new Date(fetchedData.joiningDate).toISOString().slice(0, 10)
                }

                setUpdateData(fetchedData)
            })
            .catch(err => console.error('Error fetching student:', err))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', updateData.name)
        formData.append('email', updateData.email)
        formData.append('phone', updateData.phone)
        formData.append('role', updateData.role)
        formData.append('dept', updateData.dept)
        formData.append('enroll_no', updateData.enroll_no)
        formData.append('joiningDate', updateData.joiningDate)
        if (file) {
            formData.append('image', file) // append file if it exists
        }

        try {
            const response = await axios.put(`http://localhost:5000/students/viewStudent/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log("Student updated successfully:", response.data)
            alert('Student updated successfully')
        } catch (error) {
            console.error("Error updating student:", error)
            alert('Error updating student')
        }
    }

  return (
    <div className="create-student-container">
      <div className="form-card">
        <h2 className="form-title">Update Student</h2>
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-columns">
            <div className="form-side">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={updateData.name} onChange={handleChange} placeholder="Enter full name" required />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={updateData.email} onChange={handleChange} placeholder="Enter email" required />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={updateData.phone} onChange={handleChange} placeholder="Enter phone number" required />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input type="text" name="role" value={updateData.role} onChange={handleChange} placeholder="e.g. Student or Faculty" required />
              </div>
            </div>

            <div className="form-side">
              <div className="form-group">
                <label>Department</label>
                <input type="text" name="dept" value={updateData.dept} onChange={handleChange} placeholder="e.g. Computer Science" required />
              </div>

              <div className="form-group">
                <label>Enrollment Number</label>
                <input type="text" name="enroll_no" value={updateData.enroll_no} onChange={handleChange} placeholder="Enter enrollment number" required />
              </div>

              <div className="form-group">
                <label>Joining Date</label>
                <input type="date" name="joiningDate" value={updateData.joiningDate} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Upload Photo</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="submit-btn-container">
                <button type="submit" className="submit-btn">Update</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTableStudent