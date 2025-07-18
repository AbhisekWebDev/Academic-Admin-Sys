import {React, useState, useEffect} from 'react'
import './CreateStudent.css'

import axios from 'axios'

function CreateStudent() {

    const [formData, setFormData] = useState(
            {
                name: '',
                email: '',
                phone: '',
                role: '',
                dept: '',
                enroll_no: '',
                joiningDate: ''
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
            await axios.post('http://localhost:5000/students/sregister', formData)
            alert('success')
            setFormData(
                {
                    name: '',
                    email: '',
                    phone: '',
                    role: '',
                    dept: '',
                    enroll_no: '',
                    joiningDate: ''
                }
            )
        } catch (err) {
            alert('Error adding user')
            console.log(err)
        }
    }

  return (
    // <div className="create-student-container">
    //   <div className="form-card">
    //     <h2 className="form-title">Student Registration</h2>
    //     <form onSubmit={handleSubmit} className="student-form">
    //       <div className="form-group">
    //         <label>Full Name</label>
    //         <input
    //           type="text"
    //           name="name"
    //           value={formData.name}
    //           onChange={handleChange}
    //           placeholder="Enter full name"
    //           required
    //         />
    //       </div>

    //       <div className="form-group">
    //         <label>Email Address</label>
    //         <input
    //           type="email"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //           placeholder="Enter email"
    //           required
    //         />
    //       </div>

    //       <div className="form-group">
    //         <label>Phone Number</label>
    //         <input
    //           type="tel"
    //           name="phone"
    //           value={formData.phone}
    //           onChange={handleChange}
    //           placeholder="Enter phone number"
    //           required
    //         />
    //       </div>

    //       <div className="form-group">
    //         <label>Role</label>
    //         <input
    //           type="text"
    //           name="role"
    //           value={formData.role}
    //           onChange={handleChange}
    //           placeholder="e.g. Student or Faculty"
    //           required
    //         />
    //       </div>

    //       <div className="form-group">
    //         <label>Department</label>
    //         <input
    //           type="text"
    //           name="dept"
    //           value={formData.dept}
    //           onChange={handleChange}
    //           placeholder="e.g. Computer Science"
    //           required
    //         />
    //       </div>

    //       <div className="form-group">
    //         <label>Enrollment Number</label>
    //         <input
    //           type="text"
    //           name="enroll_no"
    //           value={formData.enroll_no}
    //           onChange={handleChange}
    //           placeholder="Enter enrollment number"
    //           required
    //         />
    //       </div>

    //       <div className="form-group">
    //         <label>Joining Date</label>
    //         <input
    //           type="date"
    //           name="joiningDate"
    //           value={formData.joiningDate}
    //           onChange={handleChange}
    //           placeholder="Enter JD"
    //           required
    //         />
    //       </div>

    //       <div className="submit-btn-container">
    //         <button type="submit" className="submit-btn">Register</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div className="create-student-container">
      <div className="form-card">
        <h2 className="form-title">Student Registration</h2>
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-columns">
            <div className="form-side">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" required />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="e.g. Student or Faculty" required />
              </div>
            </div>

            <div className="form-side">
              <div className="form-group">
                <label>Department</label>
                <input type="text" name="dept" value={formData.dept} onChange={handleChange} placeholder="e.g. Computer Science" required />
              </div>

              <div className="form-group">
                <label>Enrollment Number</label>
                <input type="text" name="enroll_no" value={formData.enroll_no} onChange={handleChange} placeholder="Enter enrollment number" required />
              </div>

              <div className="form-group">
                <label>Joining Date</label>
                <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
              </div>

              <div className="submit-btn-container">
                <button type="submit" className="submit-btn">Register</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default CreateStudent