import { useState } from 'react'
import { Card, Container, Stack } from 'react-bootstrap'
import TodoForm from './components/TodoForm'
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import './App.css'

export default function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  function addTask(event) {
    event.preventDefault()
    const cleanTask = task.trim()

    if (!cleanTask) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title: cleanTask },
    ])
    setTask('')
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((currentTask) => currentTask.id !== taskId),
    )
  }

  return (
    <main className="page-shell">
      <Container className="todo-container">
        <Card className="todo-card border-0">
          <Card.Body>
            <TodoHeader />
            <Stack gap={4}>
              <section aria-label="Add a new todo">
                <TodoForm
                  task={task}
                  onTaskChange={setTask}
                  onSubmit={addTask}
                />
              </section>
              <TodoList tasks={tasks} onDelete={deleteTask} />
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}
