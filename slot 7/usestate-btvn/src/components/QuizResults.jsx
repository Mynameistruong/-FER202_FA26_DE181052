import { Alert, Button } from 'react-bootstrap'

export default function QuizResults({ questions, answers, score, onRestart }) {
  return (
    <>
      <Alert variant="success" className="mb-4">Bạn đúng {score}/{questions.length} câu</Alert>
      <div className="mb-4">
        {questions.map((question, index) => {
          const isCorrect = answers[question.id] === question.answer
          return (
            <article className="quiz-result" key={question.id}>
              <p className="fw-semibold mb-2">Câu {index + 1}: {question.text}</p>
              <p className={isCorrect ? 'text-success mb-1' : 'text-danger mb-1'}>
                Bạn chọn: {question.options[answers[question.id]]}
              </p>
              {!isCorrect && (
                <p className="text-success mb-0">Đáp án đúng: {question.options[question.answer]}</p>
              )}
            </article>
          )
        })}
      </div>
      <Button onClick={onRestart}>Làm lại</Button>
    </>
  )
}