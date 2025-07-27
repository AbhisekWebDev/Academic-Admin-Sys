// this is for showing all the students in admin panel

import {React, useState, useEffect} from 'react'
import axios from 'axios'
import './StudentTable.css'

import { Link } from 'react-router-dom' // for routing to edit page
import { set } from 'mongoose'

// for student table

function AdminTable({onCountUpdate}) { // recieve function from admin.jsx as props using destructuring

    const [students, setStudents] = useState([])
    
        useEffect( () => {
            axios.get(`http://localhost:5000/students/viewStudent`)
            .then(res => {
                setStudents(res.data)
                if (onCountUpdate) {
                    onCountUpdate(res.data.length) // send count to parent
                }
            })
            .catch(err => console.error('Error fetching users:', err))
        }, [] )

        // delete student
        const handleDelete = async (id) => {
            const confirmDelete = window.confirm("Are you sure you want to delete this student?")

            if(!confirmDelete) return; // eexit if user cancels

            try{
                await axios.delete(`http://localhost:5000/students/deleteStudent/${id}`)
                alert("Student deleted successfully")

                // refetch/update state to remove deleted student
                setStudents(prevStudents =>
                    prevStudents.filter(student => student._id !== id)
                )
            } catch (error) {
                console.error("Error deleting student:", error)
                alert("Failed to delete student. Please try again.")
            }
        }

  return (
    <div>
        <h2>Student Details</h2>
        <div className="studentTable">
            <div className="table">
                  <table>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Role</th>
                              <th>Department</th>
                              <th>Enrollment No.</th>
                              <th>Joining Date</th>
                              <th>Edit/Delete Operations</th>
                          </tr>
                      </thead>
                      <tbody>
                          {students.map((student, idx) => (
                              <tr key={student._id}>
                                  <td>{student.name}</td>
                                  <td>{student.email}</td>
                                  <td>{student.phone}</td>
                                  <td>{student.role}</td>
                                  <td>{student.dept}</td>
                                  <td>{student.enroll_no}</td>
                                  <td>{new Date(student.joiningDate).toISOString().slice(0, 10)}</td>
                                    <td className='nav-buttons'>
                                        <Link to={`/EditTableStudent/${student._id}`}><button className="nav-buttons" style={{color:"green"}}>Edit</button></Link>
                                        <button className="nav-buttons" style={{color:"purple"}} onClick={() => handleDelete(student._id)}>Delete</button>  
                                    </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
            </div>
        </div>
    </div>
  )
}

export default AdminTable