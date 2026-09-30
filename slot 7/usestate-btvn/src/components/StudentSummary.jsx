import { getStudentSummary } from '../utils/studentHelpers.js'

export default function StudentSummary({ students }) {
  const { count, average, passed } = getStudentSummary(students)

  return (
    <p className="mb-0 mt-3 text-secondary">
      Sĩ số: {count} · Điểm trung bình: {average} · Đạt: {passed}/{count}
    </p>
  )
}