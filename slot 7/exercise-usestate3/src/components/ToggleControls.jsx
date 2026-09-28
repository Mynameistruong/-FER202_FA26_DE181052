export default function ToggleControls({ isVisible, onToggle }) {
  return (
    <button
      className="toggle-button"
      type="button"
      onClick={onToggle}
      aria-expanded={isVisible}
    >
      {isVisible ? 'Hide' : 'Show'}
    </button>
  )
}
