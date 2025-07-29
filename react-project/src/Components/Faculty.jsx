import {React, useEffect, useState} from 'react'
import FacultyTable from '../Tables/FacultyTable'
import { Link, Routes, Route } from 'react-router-dom'

// import FacultyAssignForm from '../CRUD/FacultyAssignForm'

import FacultyEntryForm from '../CRUD/FacultyEntryForm'

import SideNavEvent from './SideNavEvent'

import FacultyExamSchedule from '../Tables/FacultyExamSchedule'


import AddClassForm from '../Tables/AddClassForm'

import axios from 'axios'
import MyColck from './MyColck'


function Faculty() {

    const [activeTab, setActiveTab] = useState('dashboard')
    
      const renderContent = () => {
        switch (activeTab) {
          case 'dashboard':
            return <FacultyTable />
          case 'grade':
            return <FacultyEntryForm /> // yaha change h
          case 'classes':
            return <AddClassForm facultyId={facultyId} onClassAdded={fetchClasses}/> // yaha change h
          case 'schedule':
            return <FacultyExamSchedule />
          default:
            return <FacultyTable />
        }
      }

      const [classesToday, setClassesToday] = useState([])

      const facultyId = JSON.parse(localStorage.getItem('user'))?._id
      console.log(facultyId)

      const fetchClasses = async () => {
        try {
          console.log("Faculty ID used to fetch classes:", facultyId)
          const res = await axios.get(`http://localhost:5000/faculty/getTodayClasses/${facultyId}`)
          setClassesToday(res.data)
        } catch (error) {
          console.error('Error fetching classes:', error)
        }
      }

      useEffect(() => {
    if (facultyId) {
      fetchClasses();
    }
  }, [facultyId])


  return (
    <div>

      <MyColck/>

        <SideNavEvent />

        <h1>Faculty Dashboard</h1>
        
        <div className="dashButton">
            <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
            {/* <Link to ="/FacultyTable"><button>Dashboard</button></Link> */}
            {/* <button >Attendence</button> */}
            <Link to="/FacultyEntryForm"> <button>Grade</button> </Link>
            <button onClick={() => setActiveTab('classes')}>Classes</button>
            <button onClick={() => setActiveTab('schedule')}>Schedule</button>
        </div>

        <div className="dashCard">
            <div className="classStats">
                <h2 style={{marginBottom:'10px'}}>Classes Today</h2>
                {classesToday.length === 0 ? (
                  <p style={{color:'#27ae60', marginTop:'10px'}}>No classes added</p>
                ) : (
                  classesToday.map((cls, index) => (
                    <div key={index}>
                      <strong style={{color:'#27ae60'}}>{cls.subject} — {cls.time} @ Room {cls.classroom}</strong> 
                    </div>
                  ))
                )}
            </div>

            <div className="gradeStats">
                <h2>Your Salary</h2>
                <h4>INR <br /> ₹50,000</h4>
            </div>

            <div className="attendenceStats">
                <h2>Your Leaves</h2>
                <h4>Approved <br /> Declined</h4>
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