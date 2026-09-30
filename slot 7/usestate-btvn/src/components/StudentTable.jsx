import { Table } from 'react-bootstrap'
import StudentRow from './StudentRow.jsx'

export default function StudentTable({ students, onScoreChange, onCityChange, onRemove }) {
  return (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th style={{ width: '150px' }}>Điểm</th>
            <th style={{ width: '180px' }}>Thành phố</th>
            <th style={{ width: '100px' }}>Kết quả</th>
            <th style={{ width: '80px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onScoreChange={onScoreChange}
              onCityChange={onCityChange}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}