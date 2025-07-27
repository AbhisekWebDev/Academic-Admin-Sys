import React from 'react'
import './StudentTable.css'

import { useState, useEffect } from 'react'
import axios from 'axios'

// const gradeDataArray = [
//     {
//         name: 'Physics',
//         marks: '98',
//     },
//     {
//         name: 'Chemestry',
//         marks: '90',
//     },
//     {
//         name: 'Math',
//         marks: '94',
//     }
// ]

function StudentGradeTable() {

    const [grades, setGrades] = useState([])

    const studentId = localStorage.getItem('studentId')

    useEffect(() => {
        axios.get(`http://localhost:5000/api/viewStudentGrades/${studentId}`)
            .then((response) => {
                setGrades(response.data)
            })
            .catch((error) => {
                console.error('Error fetching grades:', error)
            })
    }, [studentId])

  return (
    <div>
        <h2>Your Grade Card</h2>
        <div className="studentTable">
            <div className="table">
                  <table>
                      <thead>
                          <tr>
                              <th>Subject</th>
                              <th>Marks</th>
                          </tr>
                      </thead>
                      <tbody>
                          {grades.map((item, id) => (
                              <tr key={id}>
                                  <td>{item.subject?.subjectName || 'N/A'}</td>
                                  <td>{item.marks}</td>
                              </tr>
                          ))}
                          {grades.length === 0 && (
                              <tr>
                                  <td colSpan="2">No grades available.</td>
                              </tr>
                          )}
                      </tbody>
                  </table>
            </div>
        </div>
    </div>
  )
}

export default StudentGradeTable

// export { gradeDataArray }
