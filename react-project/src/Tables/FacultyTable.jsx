import {React, useState, useEffect} from 'react'
import axios from 'axios'

function FacultyTable({onCountUpdate}) {

    const [faculty, setFaculty] = useState([])
    
        useEffect( () => {
            axios.get(`http://localhost:5000/faculty/viewFaculty`)
            .then(res => {
                setFaculty(res.data)
                if (onCountUpdate) {
                    onCountUpdate(res.data.length) // send count to parent
                }
            })
            .catch(err => console.error('Error fetching users:', err))
        }, [] )

//     const Faculties = [
//     {
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '9876543210',
//       role: 'Faculty',
//       department: 'Computer Science',
//       joiningDate: '2023-07-01'
//     },
//     // Add more student objects here...
//   ]

  return (
    <div>
    <h2>Faculty Details</h2>
        <div className="studentTable">
            <div className="table">
                  <table>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Role</th>
                              <th>Dept</th>
                              <th>Faculty No.</th>
                              <th>Joining Date</th>
                          </tr>
                      </thead>
                      <tbody>
                          {faculty.map((faculty, id) => (
                              <tr key={id}>
                                  <td>{faculty.name}</td>
                                  <td>{faculty.email}</td>
                                  <td>{faculty.phone}</td>
                                  <td>{faculty.role}</td>
                                  <td>{faculty.dept}</td>
                                  <td>{faculty.faculty_no}</td>
                                  <td>{faculty.joiningDate}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
            </div>
        </div>
    </div>
  )
}

export default FacultyTable