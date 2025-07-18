// StudentAttendanceTable.jsx
import React from 'react'
import './StudentTable.css'

const attendanceData = [
  { subject: 'Math', attended: 18, total: 20 },
  { subject: 'Science', attended: 15, total: 20 },
  { subject: 'English', attended: 17, total: 20 },
  { subject: 'History', attended: 19, total: 20 },
  { subject: 'Physics', attended: 16, total: 20 },
  { subject: 'Chemistry', attended: 18, total: 20 },
]

function StudentAttendanceTable() {
  return (
    <>
    <h2>Subject-wise Attendance</h2>
    <div className="studentTable">
      <div className="table">
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Attended</th>
            <th>Total</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item, index) => {
            const percentage = ((item.attended / item.total) * 100).toFixed(1);
            return (
              <tr key={index}>
                <td>{item.subject}</td>
                <td>{item.attended}</td>
                <td>{item.total}</td>
                <td>{percentage}%</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </div>
    </>
  )
}

export default StudentAttendanceTable;

// export data to StudentStats can use it:
export { attendanceData }
