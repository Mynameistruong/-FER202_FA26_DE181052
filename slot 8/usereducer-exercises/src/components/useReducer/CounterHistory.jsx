import { ListGroup } from 'react-bootstrap'
import { HISTORY_LIMIT } from '../../data/counterData.js'

export default function CounterHistory({ history }) {
  return (
    <section aria-labelledby="counter-history-title">
      <div className="d-flex align-items-baseline justify-content-between mb-2">
        <h3 id="counter-history-title" className="h6 mb-0">{HISTORY_LIMIT} thay đổi gần nhất</h3>
        <span className="small text-secondary">{history.length}/{HISTORY_LIMIT}</span>
      </div>
      <ListGroup className="counter-history">
        {history.length === 0 ? <ListGroup.Item className="text-secondary">Chưa có thay đổi</ListGroup.Item> : history.map((change, index) => (
          <ListGroup.Item key={`${change}-${index}`} className="d-flex justify-content-between">
            <span>{change}</span>{index === 0 && <span className="small text-secondary">Mới nhất</span>}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </section>
  )
}