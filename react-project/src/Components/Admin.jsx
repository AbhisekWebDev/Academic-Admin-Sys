import {React, useEffect, useState} from 'react'
import FacultyTable from '../Tables/FacultyTable'
import { Link, Routes, Route } from 'react-router-dom'
import './Admin.css'
import AdminTable from '../Tables/AdminTable'
import StudentTable from '../Tables/StudentTable'
import axios from 'axios'

import AdminNavbar from './AdminNavbar'

import SideNavEvent from './SideNavEvent'
import AdminTableFaculty from '../Tables/AdminTableFaculty'

function Admin() {

    const [studentCount, setStudentCount] = useState(0) // state for student count

    const [facultyCount, setFacultyCount] = useState(0) // state for faculty count

    const [activeTab, setActiveTab] = useState('dashboard')
    
      const renderContent = () => {
        switch (activeTab) {
          case 'Sdashboard': // for student table
            return <AdminTable onCountUpdate={setStudentCount} />
          case 'Fdashboard': // for faculty table
            return <AdminTableFaculty onCountUpdate={setFacultyCount} />
          default:
            // return (
            //   <>
            //     <AdminTable onCountUpdate={setStudentCount} />
            //     <FacultyTableFaculty onCountUpdate={setFacultyCount} />
            //    </>
            // )
        }
      }

  return (
    <div>

      <SideNavEvent />

      <AdminNavbar />

        <h1>Admin Dashboard</h1>
        
        <div className="dashButton">
            <button onClick={() => setActiveTab('Sdashboard')}>Student Dash</button>
            {/* <button>Dashboard</button> */}
            <button onClick={() => setActiveTab('Fdashboard')}>Faculty Dash</button>
            {/* <button>Users</button> */}
        </div>

        <div className="dashCard">
            <div className="studentStats">
                <h2>Total Students</h2>
                <h4>{studentCount}</h4>
            </div>

            <div className="teacherStats">
                <h2>Total Teachers</h2>
                <h4>{facultyCount}</h4>
            </div>

            <div className="attendenceStats">
                <h2>Total Attendance</h2>
                <h4>678</h4>
            </div>
        </div>

        {renderContent()}
    </div>
  )
}

export default Admin