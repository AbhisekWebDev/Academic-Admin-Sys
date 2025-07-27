import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom' 

function AdminTableFaculty({onCountUpdate}) { // receive function from Admin.jsx as props using destructuring

    const [faculties, setFaculties] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/faculty/viewFaculty`)
        .then(res => {
            setFaculties(res.data)
           if (onCountUpdate) {
                onCountUpdate(res.data.length) // Update the count of faculties
            }
        })
        .catch(err => {
            console.error('Error fetching faculty data:', err)
        })
    }, [] )

    // delete faculty
        const handleDelete = async (id) => {
            const confirmDelete = window.confirm("Are you sure you want to delete this faculty?")

            if(!confirmDelete) return; // eexit if user cancels

            try{
                await axios.delete(`http://localhost:5000/faculty/deleteFaculty/${id}`)
                alert("faculty deleted successfully")

                // refetch/update state to remove deleted student
                setFaculties(prevFaculties =>
                    prevFaculties.filter(faculty => faculty._id !== id)
                )
            } catch (error) {
                console.error("Error deleting faculty:", error)
                alert("Failed to delete fclty. Please try again.")
            }
        }

  return (
    <div>
      <h2>Faculty Details</h2>
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
                <th>Faculty No.</th>
                <th>Joining Date</th>
                <th>Edit/Delete Operations</th>
              </tr>
            </thead>
            <tbody>
              {faculties.map(faculty => (
                <tr key={faculty._id}>
                  <td>{faculty.name}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.phone}</td>
                  <td>{faculty.role}</td>
                  <td>{faculty.dept}</td>
                  <td>{faculty.faculty_no}</td>
                  <td>{new Date(faculty.joiningDate).toISOString().slice(0, 10)}</td>
                  <td className='nav-buttons'>
                                        <Link to={`/EditTableFaculty/${faculty._id}`}><button className="nav-buttons" style={{color:"green"}}>Edit</button></Link>
                                        <button className="nav-buttons" style={{color:"purple"}} onClick={() => handleDelete(faculty._id)}>Delete</button>  
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

export default AdminTableFaculty