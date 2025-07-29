import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function StudentExamSchedule() {

    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/student/exam-schedule')
            .then(response => {
                setSchedule(response.data);
            })
            .catch(error => {
                console.error('Error fetching exam schedule:', error);
            })
    } , [])

    const generatePDF = () => {
        const docx = new jsPDF()

        // college ka naam (centered, bold)
        docx.setFont('helvetica', 'bold')
        docx.setFontSize(18)
        docx.text('ABC Institute of Technology', 105, 15, { align: 'center' })

        // notice
        docx.setFont('helvetica', 'normal')
        docx.setTextColor(0, 0, 0)
        docx.text('Please bring your admit card.', 14, 38)

        // important Notice (bold, left aligned)
        docx.setFontSize(12)
        docx.setTextColor(220, 53, 69) // red color
        docx.text('IMPORTANT NOTICE', 14, 30)
        const rules = [
            '1. Students must report 15 minutes before exam time.',
            '2. Calculators allowed only for specific subjects.',
            '3. No electronic gadgets, notes, or books allowed inside the hall.',
            '4. Violation of rules may lead to disqualification.',
            '5. Mobile phones and smart devices are strictly prohibited.'
        ]
        docx.setFontSize(11)
        let y = 48
        rules.forEach(rule => {
            docx.text(rule, 14, y)
            y += 6
        })

        const tableData = schedule.map((item, index) => [
            index + 1,
            item.subjectCode,
            item.subjectName,
            new Date(item.examDate).toLocaleDateString(),
        ])
        autoTable(docx,{
            head : [['#', 'Subject Code', 'Subject Name', 'Exam Date']],
            body: tableData,
            startY: y + 5,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [22, 160, 133] },
            margin: { top: 10, left: 10, right: 10 },
            theme: 'grid'
        })
        docx.save('exam_schedule.pdf')
    }

  return (
    <div>
      <h2>Exam Schedule</h2>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  )
}

export default StudentExamSchedule