import { useState } from 'react'
import './App.css'
import Admin from './Components/Admin'
import Faculty from './Components/Faculty'
import Student from './Components/Student'
import SelectionPanel from './SelectionPanel'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentTable from './Tables/StudentTable'
import FacultyTable from './Tables/FacultyTable'
import StudentGradeTable from './Tables/StudentGradeTable'
import StudentAttendanceTable from './Tables/StudentAttendanceTable'
import HomePage from './HomePage'
import CreateStudent from './CreateTables/CreateStudent'
import CreateFaculty from './CreateTables/CreateFaculty'
import CreateEvent from './CreateTables/CreateEvent'
import EditTableStudent from './CRUD/EditTableStudent'
import EditTableFaculty from './CRUD/EditTableFaculty'
import FacultyAssignForm from './CRUD/FacultyAssignForm'
import FacultyEntryForm from './CRUD/FacultyEntryForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/selection" element={<SelectionPanel />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Faculty />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/studentTable" element={<StudentTable />} />
          <Route path="/facultyTable" element={<FacultyTable />} />
          <Route path="/FacultyEntryForm" element={<FacultyEntryForm />} />
          <Route path="/studentGradeTable" element={<StudentGradeTable/>} />
          <Route path="/studentAttendanceTable" element={<StudentAttendanceTable/>} />
          <Route path="/createStudent" element={<CreateStudent/>} />
          <Route path="/createFaculty" element={<CreateFaculty/>} />
          <Route path="/createEvent" element={<CreateEvent/>} />
          <Route path="/EditTableStudent/:id" element={<EditTableStudent />} />
          <Route path="/EditTableFaculty/:id" element={<EditTableFaculty />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
