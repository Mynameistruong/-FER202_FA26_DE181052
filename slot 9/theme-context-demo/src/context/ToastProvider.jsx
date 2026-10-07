import { useCallback, useContext, useMemo, useState } from 'react'
import { ToastContext } from './ToastContext.js'

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, variant = 'success') => {
    const id = Date.now() + Math.random()

    setToasts((current) => [...current, { id, message, variant }])

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3000)
  }, [])

  const value = useMemo(() => ({ toasts, showToast }), [toasts, showToast])

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (context === null) {
    throw new Error('useToast phải được dùng trong <ToastProvider>')
  }

  return context
}
