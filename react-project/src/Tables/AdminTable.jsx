import {React, useState, useEffect} from 'react'
import axios from 'axios'
import './StudentTable.css'

// for student table

function AdminTable({onCountUpdate}) { // recieve function from admin.jsx as props

    const [students, setStudents] = useState([])
    
        useEffect( () => {
            axios.get(`http://localhost:5000/students/viewStudent`)
            .then(res => {
                setStudents(res.data)
                if (onCountUpdate) {
                    onCountUpdate(res.data.length) // send count to parent
                }
            })
            .catch(err => console.error('Error fetching users:', err))
        }, [] )

  return (
    <div>
        <h2>Student Details</h2>
        <div className="studentTable">
            <div className="table">
                  <table>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Role</th>
                              <th>Department</th>
                              <th>Enrollment No.</th>
                              <th>Joining Date</th>
                          </tr>
                      </thead>
                      <tbody>
                          {students.map((student, idx) => (
                              <tr key={student._id}>
                                  <td>{student.name}</td>
                                  <td>{student.email}</td>
                                  <td>{student.phone}</td>
                                  <td>{student.role}</td>
                                  <td>{student.dept}</td>
                                  <td>{student.enroll_no}</td>
                                  <td>{student.joiningDate}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
            </div>
        </div>
    </div>
  )
}

export default AdminTable