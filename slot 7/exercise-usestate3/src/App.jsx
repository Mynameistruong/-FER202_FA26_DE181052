import { useState } from 'react'
import ToggleControls from './components/ToggleControls'
import ToggleMessage from './components/ToggleMessage'
import './App.css'

export default function App() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <main className="page-shell">
      {isVisible ? (
        <section className="toggle-panel" aria-live="polite">
          <ToggleControls
            isVisible={isVisible}
            onToggle={() => setIsVisible((visible) => !visible)}
          />
          <ToggleMessage isVisible={isVisible} />
        </section>
      ) : (
        <section className="toggle-panel" aria-label="Visibility controls">
          <ToggleControls
            isVisible={isVisible}
            onToggle={() => setIsVisible((visible) => !visible)}
          />
        </section>
      )}
    </main>
  )
}
