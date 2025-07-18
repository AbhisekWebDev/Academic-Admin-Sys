import {React, useState} from 'react'
import StudentStats from './StudentStats'
// import { Link, Routes, Route } from 'react-router-dom'
import StudentTable from '../Tables/StudentTable'
import StudentGradeTable from '../Tables/StudentGradeTable'
import StudentAttendanceTable from '../Tables/StudentAttendanceTable'

function Student() {

  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StudentTable />
      case 'grade':
        return <StudentGradeTable />
      case 'attendance':
        return <StudentAttendanceTable />
      default:
        return <StudentTable />
    }
  }


  return (
    <div>
        <h1>Student Dashboard</h1>
        
        <div className="dashButton">
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveTab('grade')}>Grade</button>
        <button onClick={() => setActiveTab('attendance')}>Attendance</button>
        <button>Exam Schedule</button>
      </div>

      <StudentStats />
      {renderContent()}

    </div>
  )
}

export default Student