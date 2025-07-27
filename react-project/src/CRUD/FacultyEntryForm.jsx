import React, { useState } from 'react'
import axios from 'axios'

function FacultyEntryForm() {

  const [roll, setRoll] = useState('')
  const [studentId, setStudentId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [marks, setMarks] = useState('')
  const [attendance, setAttendance] = useState('')


  const handleFindStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/getStudentByRoll/${roll}`)
      setStudentId(res.data._id)
      alert('Student found successfully')
    } catch (error) {
      console.error('Error fetching student:', error)
      alert(error.response?.data?.message ||'Student not found')
      setStudentId('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!studentId || !subjectId || !subjectName || !marks || !attendance)
      return alert('Please fill all fields')

    try {
      // Step 1: Try to find or create subject
      const subjectRes = await axios.post('http://localhost:5000/api/createSubjects', {
        subjectCode: subjectId,
        subjectName: subjectName
      })
      const subject = subjectRes.data

      // Step 2: Assign subject
      const token = localStorage.getItem('token') 
      await axios.post(
        'http://localhost:5000/api/assign', 
        {
        studentId,
        subjectId: subject._id,
        marks,
        attendance
      }, {
          headers: {
              'auth-token': token
          }
      }
    )

    

      // Step 3: Update record if needed
      const res = await axios.get(`http://localhost:5000/api/viewStudentSubjects/${studentId}`)
      const subjectRecord = res.data.find(sub => sub.subject._id === subject._id)

      if (!subjectRecord) {
        alert('Subject not found for this student')
        return
      }

      await axios.put(`http://localhost:5000/api/updateStudentSubject/${subjectRecord._id}`, {
        marks,
        attendance
      })

      alert('Subject assigned and updated successfully')
      setRoll('')
      setStudentId('')
      setSubjectId('')
      setSubjectName('')
      setMarks('')
      setAttendance('')
    } catch (error) {
      console.error('Error submitting:', error)
      alert('Error during assignment or update')
    }
  }

  return (
    <div>
      <h2>Faculty Entry Panel</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '12px' }}>
        <input
          type="text"
          placeholder="Enter Student Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <button type="button" onClick={handleFindStudent}>Find Student</button>

        <input
          type="text"
          placeholder="Enter Subject Code"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter Attendance (%)"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          required
        />

        <button type="submit">Assign & Update</button>
      </form>
    </div>
  )
}

export default FacultyEntryForm
