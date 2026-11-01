import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap'
import { fetchRoomTypes, fetchRooms } from '../api/roomApi'
import { formatPriceRange } from '../utils/format'

export default function RoomTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [roomType, setRoomType] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [roomTypes, allRooms] = await Promise.all([fetchRoomTypes(), fetchRooms()])
        const found = roomTypes.find((rt) => String(rt.id) === String(id))
        if (!found) {
          navigate('/not-found', { replace: true })
          return
        }
        setRoomType(found)
        setRooms(allRooms.filter((room) => String(room.roomTypeId) === String(id)))
        setLoading(false)
      } catch (err) {
        setError(err.message || 'Failed to load room type.')
        setLoading(false)
      }
      // TODO-10A: Dùng Promise.all fetch roomTypes + rooms
      // Tìm roomType theo id; nếu không tìm thấy → navigate('/not-found', { replace: true })
      // Lọc rooms theo roomTypeId, cập nhật state
    }
    load()
  }, [id])

  // TODO-10A: Nếu loading → Spinner; nếu error → Alert danger
  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger" role="alert">{error}</Alert>

  return (
    <div>
      <Button onClick={() => navigate('/room-types')} className="mb-3">
        ← Back to Room Types
      </Button>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{roomType.name}</Card.Title>
          <Badge bg="primary">{rooms.length} rooms</Badge>
        </Card.Body>
      </Card>
      <Table striped bordered hover>
        <thead><tr><th>Name</th><th>Floor</th><th>View</th><th>Price Range</th><th>Last Renovated</th></tr></thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td><td>{room.floor}</td><td>{room.view}</td>
              <td>{formatPriceRange(room.priceWeekday, room.priceWeekend)}</td>
              <td>{room.lastRenovated}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* TODO-10A: Nút Back navigate('/room-types') */}
      {/* TODO-10A: Card với roomType name, Badge id */}
      {/* TODO-10A: Table rooms (name, floor, view, formatPriceRange, lastRenovated) */}
    </div>
  )
}
