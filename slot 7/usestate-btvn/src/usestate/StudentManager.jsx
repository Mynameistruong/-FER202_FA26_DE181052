import { useState } from 'react'
import { Container } from 'react-bootstrap'
import StudentControls from '../components/StudentControls.jsx'
import StudentForm from '../components/StudentForm.jsx'
import StudentSummary from '../components/StudentSummary.jsx'
import StudentTable from '../components/StudentTable.jsx'
import { CITIES, INITIAL_STUDENTS } from '../data/students.js'
import { sortStudents } from '../utils/studentHelpers.js'

export default function StudentManager() {
  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [sortBy, setSortBy] = useState('none')
  const sortedStudents = sortStudents(students, sortBy)

  function addStudent(name) {
    setStudents((previous) => [
      ...previous,
      { id: Date.now(), name, score: 0, contact: { city: CITIES[0] } },
    ])
  }

  function updateScore(id, text) {
    const score = Math.min(10, Math.max(0, Number(text)))
    setStudents((previous) => previous.map((student) => (
      student.id === id ? { ...student, score } : student
    )))
  }

  function updateCity(id, city) {
    setStudents((previous) => previous.map((student) => (
      student.id === id
        ? { ...student, contact: { ...student.contact, city } }
        : student
    )))
  }

  function removeStudent(id) {
    setStudents((previous) => previous.filter((student) => student.id !== id))
  }

  function bonusAll() {
    setStudents((previous) => previous.map((student) => ({
      ...student,
      score: Math.min(10, student.score + 0.5),
    })))
  }

  return (
    <Container className="py-5 app-container app-container-wide">
      <header className="mb-4">
        <p className="eyebrow">useState · Bài 4</p>
        <h1 className="h2 mb-2">Quản lý điểm sinh viên</h1>
        <p className="text-secondary mb-0">Thêm, sửa, xóa và sắp xếp mảng object theo cách bất biến</p>
      </header>
      <div className="row g-3 align-items-end mb-4">
        <div className="col-lg-5"><StudentForm onAddStudent={addStudent} /></div>
        <div className="col-lg-7">
          <StudentControls sortBy={sortBy} onSortChange={setSortBy} onBonusAll={bonusAll} />
        </div>
      </div>
      <StudentTable
        students={sortedStudents}
        onScoreChange={updateScore}
        onCityChange={updateCity}
        onRemove={removeStudent}
      />
      <StudentSummary students={students} />
    </Container>
  )
}