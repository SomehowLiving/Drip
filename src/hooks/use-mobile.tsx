import * as React from "react"

// Breakpoint constants to match your Tailwind config
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

type Breakpoint = keyof typeof BREAKPOINTS

export function useIsMobile(breakpoint: Breakpoint = 'md') {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    const breakpointValue = BREAKPOINTS[breakpoint]
    const mql = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpointValue)
    }
    
    // Set initial value
    onChange()
    
    // Use the more modern API if available, fallback to older one
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    } else {
      // Fallback for older browsers
      mql.addListener(onChange)
      return () => mql.removeListener(onChange)
    }
  }, [breakpoint])

  return !!isMobile
}

// Enhanced version with multiple breakpoint support
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint | undefined>(undefined)
  
  React.useEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.xs) return 'xs'
      if (width < BREAKPOINTS.sm) return 'xs'
      if (width < BREAKPOINTS.md) return 'sm'
      if (width < BREAKPOINTS.lg) return 'md'
      if (width < BREAKPOINTS.xl) return 'lg'
      if (width < BREAKPOINTS['2xl']) return 'xl'
      return '2xl'
    }
    
    const onChange = () => {
      setBreakpoint(getBreakpoint())
    }
    
    // Set initial value
    onChange()
    
    // Use ResizeObserver for better performance if available
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(onChange)
      resizeObserver.observe(document.documentElement)
      return () => resizeObserver.disconnect()
    } else {
      // Fallback to window resize with debouncing
      let timeoutId: NodeJS.Timeout
      const debouncedOnChange = () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(onChange, 100)
      }
      
      window.addEventListener('resize', debouncedOnChange)
      return () => {
        window.removeEventListener('resize', debouncedOnChange)
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return {
    breakpoint,
    isMobile: breakpoint ? BREAKPOINTS[breakpoint] < BREAKPOINTS.md : undefined,
    isTablet: breakpoint === 'md' || breakpoint === 'lg',
    isDesktop: breakpoint ? BREAKPOINTS[breakpoint] >= BREAKPOINTS.lg : undefined,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl',
  }
}

// Server-safe version that prevents hydration mismatches
export function useIsMobileSSR(breakpoint: Breakpoint = 'md') {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isHydrated, setIsHydrated] = React.useState(false)
  
  React.useEffect(() => {
    setIsHydrated(true)
    const breakpointValue = BREAKPOINTS[breakpoint]
    const mql = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpointValue)
    }
    
    onChange()
    
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    } else {
      mql.addListener(onChange)
      return () => mql.removeListener(onChange)
    }
  }, [breakpoint])

  // Return false during SSR to prevent hydration mismatch
  return isHydrated ? isMobile : false
}

// Lightweight version - closest to your original
export function useIsMobileLite() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(mql.matches)
    
    onChange() // Set initial value
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}