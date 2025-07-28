import {React, useState} from 'react'
import FacultyTable from '../Tables/FacultyTable'
import { Link, Routes, Route } from 'react-router-dom'

// import FacultyAssignForm from '../CRUD/FacultyAssignForm'

import FacultyEntryForm from '../CRUD/FacultyEntryForm'

import SideNavEvent from './SideNavEvent'

function Faculty() {

    const [activeTab, setActiveTab] = useState('dashboard')
    
      const renderContent = () => {
        switch (activeTab) {
          case 'dashboard':
            return <FacultyTable />
          case 'grade':
            return <FacultyEntryForm /> // yaha change h
          case 'attendance':
            return <FacultyAttendanceTable />
          default:
            return <FacultyTable />
        }
      }

  return (
    <div>

        <SideNavEvent />

        <h1>Faculty Dashboard</h1>
        
        <div className="dashButton">
            <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
            {/* <Link to ="/FacultyTable"><button>Dashboard</button></Link> */}
            {/* <button >Attendence</button> */}
            <Link to="/FacultyEntryForm"> <button>Grade</button> </Link>
            <button>Schedule</button>
        </div>

        <div className="dashCard">
            <div className="classStats">
                <h2>Classes Today</h2>
                <h4>4</h4>
            </div>

            <div className="gradeStats">
                <h2>Grade</h2>
                <h4>5</h4>
            </div>

            <div className="attendenceStats">
                <h2>Student Attendance</h2>
                <h4>6</h4>
            </div>
        </div>

        {/* <Routes>
            <Route path="/facultyTable" element={<FacultyTable />} />
        </Routes> */}

        {renderContent()}

    </div>
  )
}

export default Faculty