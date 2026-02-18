'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { Check, X, AlertTriangle, Info, BellOff, CircleSlash } from 'lucide-react'

/* ================= TYPES ================= */

type ToastType = 'neutral' | 'blue' | 'success' | 'warning' | 'error'

interface Toast {
  id: string
  title: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (title: string, message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

/* ================= PROVIDER ================= */

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback(
    (title: string, message: string, type: ToastType) => {
      const id = Date.now().toString()
      setToasts((prev) => [...prev, { id, title, message, type }])

      setTimeout(() => {
        removeToast(id)
      }, 4000)
    },
    []
  )

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-8 right-8 space-y-5 z-50">
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/* ================= HOOK ================= */

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context)
    throw new Error('useToast must be used within ToastProvider')
  return context
}

/* ================= TOAST CARD ================= */

const ToastCard = ({
  toast,
  onClose,
}: {
  toast: Toast
  onClose: () => void
}) => {

  // ✅ Only addition: click state
  const [isClicked, setIsClicked] = useState(false)

  const styles = {
    neutral: {
      bg: 'bg-gray-100',
      iconBg: 'bg-white',
      closeBg: 'bg-gray-200',
      icon: <Info className="text-gray-500" size={22} strokeWidth={1.5} />,
    },
    blue: {
      bg: 'bg-blue-100',
      iconBg: 'bg-blue-50',
      closeBg: 'bg-blue-200',
      icon: <BellOff className="text-blue-500" size={22} strokeWidth={1.5} />,
    },
    success: {
      bg: 'bg-emerald-100',
      iconBg: 'bg-emerald-50',
      closeBg: 'bg-emerald-200',
      icon: <Check className="text-emerald-500" size={22} strokeWidth={2} />,
    },
    warning: {
      bg: 'bg-amber-100',
      iconBg: 'bg-amber-50',
      closeBg: 'bg-amber-200',
      icon: <AlertTriangle className="text-amber-500" size={22} strokeWidth={1.8} />,
    },
    error: {
      bg: 'bg-red-100',
      iconBg: 'bg-red-50',
      closeBg: 'bg-red-200',
      icon: <CircleSlash className="text-red-500" size={22} strokeWidth={1.8} />,
    },
  }

  const style = styles[toast.type]

  return (
    <div
      className={`w-[380px] flex items-center justify-between p-3 rounded-xl shadow-md ${style.bg} animate-slideIn`}
    >
      {/* Left Side */}
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 flex items-center justify-center rounded-lg ${style.iconBg}`}
        >
          {style.icon}
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 text-base">
            {toast.title}
          </h4>
          <p className="text-gray-600 text-xs mt-0.5">
            {toast.message}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => {
          setIsClicked(true)
          setTimeout(() => {
            onClose()
          }, 200)
        }}
        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 ${
          isClicked ? style.closeBg : ''
        }`}
      >
        <X size={18} className="text-gray-800" />
      </button>
    </div>
  )
}

