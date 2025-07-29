import React from 'react'
import './StudentStats.css'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { FaCalendarAlt, FaBook } from 'react-icons/fa'
// import { attendanceData } from '../Tables/StudentAttendanceTable'
// import { gradeDataArray } from '../Tables/StudentGradeTable'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


const COLORS = ['#00C49F', '#FF8042'];

function StudentStats() {

  // subjects count
  const [subjects, setSubjects] = useState([])

  const [studentData, setStudentData] = useState([])

  // const studentId = localStorage.getItem('studentId')
  // console.log("Student ID in localStorage:", studentId)

  const [studentId, setStudentId] = useState('')

  const userEmail = localStorage.getItem('email')
  

  useEffect(() => {

  const role = localStorage.getItem('Role')

  if (role !== 'student') {
    console.warn('Not a student')
    return
  }

    if(!userEmail) {
        console.error('No student ID found in localStorage')
        return
      }

    // fetch grates
      axios.get(`http://localhost:5000/students/getStudentByEmail/${userEmail}`)
    .then(res => setStudentId(res.data._id))
    .catch(err => console.error('Failed to fetch grades and attendance', err))
  }, [userEmail])

  // fetch student data (marks, attendance, subjects)
  useEffect(() => {
    if (!studentId) return

    axios.get(`http://localhost:5000/students/viewStudentGrades/${studentId}`)
      .then(res => setStudentData(res.data))
      .catch(err => console.error('Failed to fetch grades and attendance', err))

    axios.get(`http://localhost:5000/students/viewStudentSubjects/${studentId}`)
      .then(res => setSubjects(res.data))
      .catch(err => console.error('Failed to fetch subjects', err))
  }, [studentId])


  // grade calculation
const totalMarks = studentData.reduce((sum, s) => sum + Number(s.marks || 0), 0)
const max_Marks = studentData.length * 100;
const gradePercent = max_Marks > 0 ? ((totalMarks / max_Marks) * 100).toFixed(1) : 0


// calculate total attendance in %
const total_Attendance = studentData.reduce((sum, s) => sum + Number(s.attendance || 0), 0)
const attendancePercent = studentData.length > 0 ? (total_Attendance / studentData.length).toFixed(1) : 0

const gradeData = [
  { name: 'Grade', value: Number(gradePercent) },
  { name: 'Remaining', value: 100 - gradePercent }
]

// chart data
const attendanceDatax = [
  { name: 'Present', value: Number(attendancePercent) },
  { name: 'Absent', value: 100 - attendancePercent }
]




  return (
    <div className="studentStatsContainer">
      {/* attendance chart */}
      <div className="statCard">
        <h2>Attendance</h2>
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={attendanceDatax}
              dataKey="value"
              outerRadius={60}
              innerRadius={30}
              label
            >
              {attendanceDatax.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <h4>{attendancePercent}% Present</h4>
      </div>

      {/* grade chart */}
      <div className="statCard">
        <h2>Grade</h2>
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={gradeData}
              dataKey="value"
              outerRadius={60}
              innerRadius={30}
              label
            >
              {gradeData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <h4>{totalMarks} / {max_Marks} Marks</h4>
      </div>

      {/* Upcoming Exams */}
      {/* <div className="statCard">
        <FaCalendarAlt className="statIcon" />
        <h2>Upcoming Exams</h2>
        <div className="statNumber">8</div>
      </div> */}

      {/* total subjects */}
      <div className="statCard">
        {/* <FaBook className="statIcon" /> */}
        <h2>Total Subjects</h2>
        <div className="statNumber">{subjects.length}</div>
        {subjects.map((subj, i) => {
          const subjectId = subj.subject?._id

          const match = studentData.find(s => {
            // handle both object and string for subject field
            const sId = typeof s.subject === 'object' ? s.subject._id : s.subject
            return String(sId) === String(subjectId)
          });

          const marks = match?.marks ?? 'N/A'

          return (
            <h4 key={i} style={{ margin: '0' }}>
              {subj.subject?.subjectName?.toUpperCase() || 'UNKNOWN'} — {marks} Marks
            </h4>
          )
        })}
      </div>
    </div>
  );
}

export default StudentStats;
