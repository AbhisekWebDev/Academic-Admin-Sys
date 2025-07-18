import React from 'react'
import './StudentTable.css'

const gradeDataArray = [
    {
        name: 'Physics',
        marks: '98',
    },
    {
        name: 'Chemestry',
        marks: '90',
    },
    {
        name: 'Math',
        marks: '94',
    }
]

function StudentGradeTable() {
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
                          {gradeDataArray.map((subject, id) => (
                              <tr key={id}>
                                  <td>{subject.name}</td>
                                  <td>{subject.marks}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
            </div>
        </div>
    </div>
  )
}

export default StudentGradeTable

export { gradeDataArray }
