export function sortStudents(students, sortBy) {
  if (sortBy === 'none') return students

  return [...students].sort((first, second) => {
    if (sortBy === 'name') return first.name.localeCompare(second.name, 'vi')
    return second.score - first.score
  })
}

export function getStudentSummary(students) {
  const average = students.length === 0
    ? '0.00'
    : (students.reduce((sum, student) => sum + student.score, 0) / students.length).toFixed(2)

  return {
    count: students.length,
    average,
    passed: students.filter((student) => student.score >= 5).length,
  }
}