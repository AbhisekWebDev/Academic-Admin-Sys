import {React, useState} from 'react'
import StudentStats from './StudentStats'
// import { Link, Routes, Route } from 'react-router-dom'
import StudentTable from '../Tables/StudentTable'
import StudentGradeTable from '../Tables/StudentGradeTable'
import StudentAttendanceTable from '../Tables/StudentAttendanceTable'
import SideNavEvent from './sideNavEvent'
import StudentExamSchedule from '../PDFDownload/StudentExamSchedule'
import MyColck from './MyColck'

// import 'bootstrap/dist/css/bootstrap.min.css'

function Student() {

  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StudentTable />
      // case 'grade':
      //   return <StudentGradeTable />
      case 'schedule':
        return <StudentExamSchedule />
      default:
        return <StudentTable />
    }
  }


  return (
    <div>

    <MyColck/>

        <SideNavEvent/>

        <h1>Student Dashboard</h1>
        
        <div className="dashButton">
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        {/* <button onClick={() => setActiveTab('grade')}>Grade</button>
        <button onClick={() => setActiveTab('attendance')}>Attendance</button> */}
        <button onClick={() => setActiveTab('schedule')}>Exam Schedule</button>
      </div>

      <StudentStats />
      {renderContent()}


    </div>
  )
}

export default Student