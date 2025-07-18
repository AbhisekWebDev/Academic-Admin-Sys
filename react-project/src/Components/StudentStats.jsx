import React from 'react'
import './StudentStats.css'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { FaCalendarAlt, FaBook } from 'react-icons/fa'
import { attendanceData } from '../Tables/StudentAttendanceTable'
import { gradeDataArray } from '../Tables/StudentGradeTable'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

// calculate total attendance in %
const total_Attended = attendanceData.reduce((sum, item) => sum + item.attended, 0)
const total_Sessions = attendanceData.reduce((sum, item) => sum + item.total, 0)
const attendancePercent = ((total_Attended / total_Sessions) * 100).toFixed(1)

// grade calculation
const totalMarks = gradeDataArray.reduce((sum, item) => sum + Number(item.marks), 0)
const max_Marks = gradeDataArray.length * 100;
const gradePercent = ((totalMarks / max_Marks) * 100).toFixed(1)

// chart data
const attendanceDatax = [
  { name: 'Present', value: Number(attendancePercent) },
  { name: 'Absent', value: 100 - attendancePercent }
]

const gradeData = [
  { name: 'Grade', value: Number(gradePercent) },
  { name: 'Remaining', value: 100 - gradePercent }
]

const COLORS = ['#00C49F', '#FF8042'];

function StudentStats() {

  // subjects count
  const [subjects, setSubjects] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/students/viewSubjects')
    .then(res => setSubjects(res.data))
    .catch(err => console.error('Failed to fetch subjects', err))
  }, [])

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
        <h4>83% Precent</h4>
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
        <h4>57 Marks</h4>
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
        {subjects.map((subj, i) => (
          <h4 key={i} style={{margin:'0'}} >{subj.subjectName.toUpperCase()}</h4>
        ))}
      </div>
    </div>
  );
}

export default StudentStats;
