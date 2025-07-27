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
        {/* <div className="studentTable">
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
                                  {/* <td>{student.joiningDate}</td> */}
                                  {/* <td>{new Date(faculty.joiningDate).toISOString().slice(0, 10)}</td> */}
                              {/* </tr> */}
                          {/* ))} */}
                      {/* </tbody> */}
                  {/* </table> */}
            {/* </div> */}
        {/* </div> */}

        <div className="facultyCardContainer">
              {students.map((student) => (
                  <div className="facultyCard" key={student._id}>
                      <div className="facultyCardContent">
                          <div className="facultyDetails">
                              <p><strong>Name:</strong> {student.name}</p>
                              <p><strong>Email:</strong> {student.email}</p>
                              <p><strong>Phone:</strong> {student.phone}</p>
                              <p><strong>Role:</strong> {student.role}</p>
                              <p><strong>Department:</strong> {student.dept}</p>
                              <p><strong>Faculty No:</strong> {student.faculty_no}</p>
                              <p><strong>Joining Date:</strong> {new Date(student.joiningDate).toISOString().slice(0, 10)}</p>
                          </div>
                          <div className="facultyPhoto">
                              {student.photo && (
                                  <img
                                      src={`http://localhost:5000/${student.photo.replace(/\\/g, '/')}`}
                                      alt="Faculty"
                                  />
                              )}
                          </div>
                      </div>
                      </div>
  ))}
</div>
    </div>
  )
}

export default StudentTable