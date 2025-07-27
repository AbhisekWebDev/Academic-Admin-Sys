import React, {useState, useEffect} from 'react'
import axios from 'axios'

function FacultyAssignForm() {

    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([])
    const [studentId, setStudentId] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [marks, setMarks] = useState('')
    const [attendance, setAttendance] = useState('')

    const facultyId = localStorage.getItem('facultyId')

    useEffect(() => {

        axios.get('http://localhost:5000/api/viewStudents')
            .then(response => {
                setStudents(response.data)
            })
            .catch(error => {
                console.error('Error fetching students:', error)
            })

        axios.get('http://localhost:5000/api/viewSubjects')
            .then(response => {
                setSubjects(response.data)
            })
            .catch(error => {
                console.error('Error fetching subjects:', error)
            })

    }, [])

    const handleAssign = async (e) => {
        e.preventDefault()

        try{
            // assign subject to student if not already
            const assignResponse = await axios.post('http://localhost:5000/api/assign', {
                studentId,
                subjectId,
                facultyId,
                marks,
                attendance
            })

            console.log(assignResponse.data.message)
            alert('Subject assigned successfully')

            // get assignment id to update marks and attendance
            const assignments = await axios.get(`http://localhost:5000/api/viewStudentSubjects/${studentId}`)
            const match = assignments.data.find(
                a => a.subject._id === subjectId && a.faculty._id === facultyId
            )

            if(match){
                await axios.put(`http://localhost:5000/api/updateAssignment/${match._id}`, {
                    marks: marks,
                    attendance: attendance
                })
                console.log('Marks and attendance updated successfully')
                alert('Marks and attendance updated successfully')
            } else {
                console.error('Assignment not found')
                alert('Assignment not found')
            }

        } catch (error) {
            console.error('Error assigning subject:', error)
            alert('Failed to assign subject')
        }
    }

  return (
    <div>
        <h2>Assign Subject, Marks & Attendance</h2>
      <form onSubmit={handleAssign} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '12px' }}>
        <select value={studentId} onChange={e => setStudentId(e.target.value)} required>
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s._id} value={s._id}>{s.name} ({s.enroll_no})</option>
          ))}
        </select>

        <select value={subjectId} onChange={e => setSubjectId(e.target.value)} required>
          <option value="">Select Subject</option>
          {subjects.map(sub => (
            <option key={sub._id} value={sub._id}>{sub.subjectName}</option>
          ))}
        </select>

        <input type="number" placeholder="Marks" value={marks} onChange={e => setMarks(e.target.value)} required />
        <input type="number" placeholder="Attendance (%)" value={attendance} onChange={e => setAttendance(e.target.value)} required />

        <button type="submit">Assign</button>
      </form>
    </div>
  )
}

export default FacultyAssignForm