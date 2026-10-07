import { useToast } from '../context/ToastProvider.jsx'

export function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.variant}`}>
          {toast.message}
        </div>
      ))}
    </div>
  )
}
