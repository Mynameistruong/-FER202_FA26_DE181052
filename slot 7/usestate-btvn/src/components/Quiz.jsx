import { useState } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'
import { QUESTIONS } from '../data/questions.js'
import shuffle from '../utils/shuffle.js'
import QuizQuestion from './QuizQuestion.jsx'
import QuizResults from './QuizResults.jsx'

export default function Quiz({ attempt, onRestart }) {
  const [questions] = useState(() => shuffle(QUESTIONS))
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[index]
  const selectedOption = answers[currentQuestion.id]
  const answeredCount = Object.keys(answers).length
  const score = questions.filter((question) => answers[question.id] === question.answer).length

  if (finished) {
    return <QuizResults questions={questions} answers={answers} score={score} onRestart={onRestart} />
  }

  const isLastQuestion = index === questions.length - 1

  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-3 mb-2">
        <span className="text-secondary">Lượt làm bài thứ {attempt}</span>
        <span className="text-secondary">Đã trả lời {answeredCount}/{questions.length}</span>
      </div>
      <ProgressBar now={(answeredCount / questions.length) * 100} className="mb-4" aria-label="Tiến độ trả lời" />
      <QuizQuestion
        question={currentQuestion}
        questionNumber={index + 1}
        selectedOption={selectedOption}
        onSelect={(optionIndex) => setAnswers((previous) => ({
          ...previous,
          [currentQuestion.id]: optionIndex,
        }))}
      />
      <div className="d-flex justify-content-between gap-2">
        <Button
          variant="outline-secondary"
          disabled={index === 0}
          onClick={() => setIndex((currentIndex) => currentIndex - 1)}
        >
          ← Trước
        </Button>
        {isLastQuestion ? (
          <Button disabled={answeredCount !== questions.length} onClick={() => setFinished(true)}>
            Nộp bài
          </Button>
        ) : (
          <Button
            disabled={selectedOption === undefined}
            onClick={() => setIndex((currentIndex) => currentIndex + 1)}
          >
            Tiếp →
          </Button>
        )}
      </div>
    </>
  )
}