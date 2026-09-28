export default function ToggleMessage({ isVisible }) {
  if (!isVisible) return null

  return <p className="toggle-message">Toggle me!</p>
}
