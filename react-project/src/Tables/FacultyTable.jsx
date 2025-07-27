import {React, useState, useEffect} from 'react'
import axios from 'axios'

function FacultyTable({onCountUpdate}) {

    const [faculty, setFaculty] = useState(null)
    
        useEffect( () => {
            const fetchFaculty = async () => {
                const token = localStorage.getItem('token')

                try {
                    const res = await axios.get('http://localhost:5000/api/facultyDashboard', {
                        headers: {
                            'auth-token': token // sending the token in the header for authentication to the backend
                        }
                    })
                    setFaculty([res.data]) // Store the single faculty in an array
                } catch (err) {
                    console.error('Error fetching student data:', err)
                }
            }
            fetchFaculty();
        }, [] )

        // If faculty is null, show loading state
        if (!faculty) {
            return <div style={{marginTop:"30px"}}>Loading...</div>
        }

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
    <h2>Your Details</h2>
        {/* <div className="studentTable">
            <div className="table">
                  <table>
                      <thead>
                          <tr>
                          <th>Photo</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Role</th>
                              <th>Department</th>
                              <th>Faculty No.</th>
                              <th>Joining Date</th>
                          </tr>
                      </thead>
                      <tbody>
                          {faculty.map((faculty, id) => (
                              <tr key={faculty._id}>
                                    <td>
                                        {faculty.photo && (
                                            <img src={`http://localhost:5000/${faculty.photo.replace(/\\/g, '/')}`}
                                            alt="Faculty" 
                                            style={{width: '50px', height: '50px', borderRadius: '50%'}} />
                                            
                                        )}
                                        {console.log(faculty.photo)}
                                    </td>
                                  <td>{faculty.name}</td>
                                  <td>{faculty.email}</td>
                                  <td>{faculty.phone}</td>
                                  <td>{faculty.role}</td>
                                  <td>{faculty.dept}</td>
                                  <td>{faculty.faculty_no}</td>
                                  {/* <td>{faculty.joiningDate}</td> */}
                                    {/* <td>{new Date(faculty.joiningDate).toISOString().slice(0, 10)}</td> */}
                              {/* </tr> */}
                          {/* ))} */}
                      {/* </tbody> */}
                  {/* </table> */}
            {/* </div> */}
        {/* </div> */} 

          <div className="facultyCardContainer">
              {faculty.map((faculty) => (
                  <div className="facultyCard" key={faculty._id}>
                      <div className="facultyCardContent">
                          <div className="facultyDetails">
                              <p><strong>Name:</strong> {faculty.name}</p>
                              <p><strong>Email:</strong> {faculty.email}</p>
                              <p><strong>Phone:</strong> {faculty.phone}</p>
                              <p><strong>Role:</strong> {faculty.role}</p>
                              <p><strong>Department:</strong> {faculty.dept}</p>
                              <p><strong>Faculty No:</strong> {faculty.faculty_no}</p>
                              <p><strong>Joining Date:</strong> {new Date(faculty.joiningDate).toISOString().slice(0, 10)}</p>
                          </div>
                          <div className="facultyPhoto">
                              {faculty.photo && (
                                  <img
                                      src={`http://localhost:5000/${faculty.photo.replace(/\\/g, '/')}`}
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

export default FacultyTable