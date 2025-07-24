import {React, useState, useEffect} from 'react'
import axios from 'axios'
import './StudentTable.css'

function StudentTable() {

    const [students, setStudents] = useState(null)

    useEffect( () => {
        const fetchStudent = async () => {
            const token = localStorage.getItem('token')

            try {
                const res = await axios.get('http://localhost:5000/api/dashboard', {
                    headers: {
                        'auth-token': token // sending the token in the header for authentication to the backend
                    }
                })
                setStudents([res.data]) // Store the single student in an array
            } catch (err) {
                console.error('Error fetching student data:', err)  
            }
        }
        fetchStudent()
    }, [] )
    
    // If students is null, show loading state
    if (!students) {
        return <div style={{marginTop:"30px"}}>Loading...</div>
    }

  return (
    <div>
        <h2>Your Details</h2>
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
                              <th>Enroll No.</th>
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

export default StudentTable