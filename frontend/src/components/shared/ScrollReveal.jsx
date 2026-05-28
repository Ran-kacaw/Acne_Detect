import React from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-600 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default ScrollReveal

