import { ListGroup } from 'react-bootstrap'

export default function QuizQuestion({ question, questionNumber, selectedOption, onSelect }) {
  return (
    <>
      <h2 className="h5 mb-3">Câu {questionNumber}: {question.text}</h2>
      <ListGroup className="mb-4">
        {question.options.map((option, optionIndex) => (
          <ListGroup.Item
            action
            active={selectedOption === optionIndex}
            key={option}
            onClick={() => onSelect(optionIndex)}
          >
            {option}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}