import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Enhanced configuration with better defaults
const TOAST_CONFIG = {
  LIMIT: 5, // Allow more toasts for better UX
  REMOVE_DELAY: 5000, // More reasonable 5 second delay
  DISMISS_DELAY: 300, // Animation time
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 300,
} as const

// Toast priority levels for better management
enum ToastPriority {
  LOW = 1,
  NORMAL = 2,
  HIGH = 3,
  URGENT = 4,
}

// Enhanced toast type with more options
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  priority?: ToastPriority
  duration?: number
  persistent?: boolean // Don't auto-dismiss
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  createdAt?: number
  onDismiss?: () => void
}

// Action types with better naming
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
  CLEAR_ALL_TOASTS: "CLEAR_ALL_TOASTS",
  PAUSE_TIMERS: "PAUSE_TIMERS",
  RESUME_TIMERS: "RESUME_TIMERS",
} as const

// Enhanced ID generation with better collision resistance
let count = 0
const genId = (): string => {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return `toast-${count}-${Date.now()}`
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast> & { id: string }
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["CLEAR_ALL_TOASTS"]
    }
  | {
      type: ActionType["PAUSE_TIMERS"]
    }
  | {
      type: ActionType["RESUME_TIMERS"]
    }

interface State {
  toasts: ToasterToast[]
  isPaused: boolean
}

// Enhanced timer management
class ToastTimer {
  private timers = new Map<string, {
    timeout: ReturnType<typeof setTimeout>
    startTime: number
    remainingTime: number
    duration: number
  }>()
  
  add(toastId: string, duration: number, callback: () => void): void {
    this.remove(toastId) // Clear existing timer
    
    const timeout = setTimeout(callback, duration)
    this.timers.set(toastId, {
      timeout,
      startTime: Date.now(),
      remainingTime: duration,
      duration,
    })
  }
  
  remove(toastId: string): void {
    const timer = this.timers.get(toastId)
    if (timer) {
      clearTimeout(timer.timeout)
      this.timers.delete(toastId)
    }
  }
  
  pause(): void {
    const now = Date.now()
    this.timers.forEach((timer, toastId) => {
      clearTimeout(timer.timeout)
      const elapsed = now - timer.startTime
      timer.remainingTime = Math.max(0, timer.duration - elapsed)
    })
  }
  
  resume(callback: (toastId: string) => void): void {
    this.timers.forEach((timer, toastId) => {
      if (timer.remainingTime > 0) {
        timer.timeout = setTimeout(() => callback(toastId), timer.remainingTime)
        timer.startTime = Date.now()
        timer.duration = timer.remainingTime
      }
    })
  }
  
  clear(): void {
    this.timers.forEach((timer) => clearTimeout(timer.timeout))
    this.timers.clear()
  }
  
  has(toastId: string): boolean {
    return this.timers.has(toastId)
  }
}

const toastTimer = new ToastTimer()

const addToRemoveQueue = (toastId: string, duration?: number) => {
  if (toastTimer.has(toastId)) {
    return
  }

  const delay = duration ?? TOAST_CONFIG.REMOVE_DELAY
  
  toastTimer.add(toastId, delay, () => {
    dispatch({
      type: "REMOVE_TOAST",
      toastId,
    })
  })
}

// Enhanced reducer with better state management
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST": {
      const newToast = {
        ...action.toast,
        createdAt: Date.now(),
        priority: action.toast.priority ?? ToastPriority.NORMAL,
      }
      
      // Sort by priority (higher priority first) and creation time
      const sortedToasts = [newToast, ...state.toasts]
        .sort((a, b) => {
          if (a.priority !== b.priority) {
            return (b.priority ?? ToastPriority.NORMAL) - (a.priority ?? ToastPriority.NORMAL)
          }
          return (b.createdAt ?? 0) - (a.createdAt ?? 0)
        })
        .slice(0, TOAST_CONFIG.LIMIT)

      return {
        ...state,
        toasts: sortedToasts,
      }
    }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        const toast = state.toasts.find(t => t.id === toastId)
        if (toast && !toast.persistent) {
          addToRemoveQueue(toastId, toast.duration)
        }
      } else {
        state.toasts.forEach((toast) => {
          if (!toast.persistent) {
            addToRemoveQueue(toast.id, toast.duration)
          }
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }

    case "REMOVE_TOAST": {
      if (action.toastId === undefined) {
        toastTimer.clear()
        return {
          ...state,
          toasts: [],
        }
      }
      
      const toast = state.toasts.find(t => t.id === action.toastId)
      if (toast?.onDismiss) {
        toast.onDismiss()
      }
      
      toastTimer.remove(action.toastId)
      
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    }

    case "CLEAR_ALL_TOASTS":
      toastTimer.clear()
      return {
        ...state,
        toasts: [],
      }

    case "PAUSE_TIMERS":
      toastTimer.pause()
      return {
        ...state,
        isPaused: true,
      }

    case "RESUME_TIMERS":
      toastTimer.resume((toastId) => {
        dispatch({
          type: "REMOVE_TOAST",
          toastId,
        })
      })
      return {
        ...state,
        isPaused: false,
      }

    default:
      return state
  }
}

// Enhanced listener management with WeakSet for better memory management
const listeners = new Set<(state: State) => void>()

let memoryState: State = { toasts: [], isPaused: false }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Enhanced toast function with better API
type Toast = Omit<ToasterToast, "id">

interface ToastOptions extends Toast {
  duration?: number
  persistent?: boolean
  priority?: ToastPriority
}

// Utility functions for common toast types
const createToastFunction = (defaultProps: Partial<ToastOptions>) => 
  (options: ToastOptions | string) => {
    const props = typeof options === 'string' 
      ? { title: options, ...defaultProps }
      : { ...defaultProps, ...options }
    
    return toast(props)
  }

function toast(props: ToastOptions) {
  const id = genId()
  
  // Validate content length
  if (typeof props.title === 'string' && props.title.length > TOAST_CONFIG.MAX_TITLE_LENGTH) {
    console.warn(`Toast title exceeds maximum length of ${TOAST_CONFIG.MAX_TITLE_LENGTH} characters`)
  }
  
  if (typeof props.description === 'string' && props.description.length > TOAST_CONFIG.MAX_DESCRIPTION_LENGTH) {
    console.warn(`Toast description exceeds maximum length of ${TOAST_CONFIG.MAX_DESCRIPTION_LENGTH} characters`)
  }

  const update = (updateProps: Partial<ToasterToast>) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...updateProps, id },
    })
    
  const dismiss = () => {
    dispatch({ type: "DISMISS_TOAST", toastId: id })
  }

  const fullToast: ToasterToast = {
    ...props,
    id,
    open: true,
    priority: props.priority ?? ToastPriority.NORMAL,
    duration: props.duration ?? TOAST_CONFIG.REMOVE_DELAY,
    onOpenChange: (open) => {
      if (!open) dismiss()
    },
  }

  dispatch({
    type: "ADD_TOAST",
    toast: fullToast,
  })

  // Auto-dismiss non-persistent toasts
  if (!props.persistent) {
    addToRemoveQueue(id, props.duration)
  }

  return {
    id,
    dismiss,
    update,
  }
}

// Convenience functions for different toast types
toast.success = createToastFunction({ 
  variant: 'default',
  priority: ToastPriority.NORMAL,
  duration: 4000,
})

toast.error = createToastFunction({ 
  variant: 'destructive',
  priority: ToastPriority.HIGH,
  duration: 6000,
})

toast.warning = createToastFunction({ 
  variant: 'default',
  priority: ToastPriority.NORMAL,
  duration: 5000,
})

toast.info = createToastFunction({ 
  variant: 'default',
  priority: ToastPriority.LOW,
  duration: 4000,
})

toast.loading = createToastFunction({ 
  variant: 'default',
  priority: ToastPriority.NORMAL,
  persistent: true,
})

// Enhanced useToast hook
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])

  // Pause timers when tab is not visible (better UX)
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        dispatch({ type: "PAUSE_TIMERS" })
      } else {
        dispatch({ type: "RESUME_TIMERS" })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    clear: () => dispatch({ type: "CLEAR_ALL_TOASTS" }),
    pause: () => dispatch({ type: "PAUSE_TIMERS" }),
    resume: () => dispatch({ type: "RESUME_TIMERS" }),
  }
}

export { useToast, toast }