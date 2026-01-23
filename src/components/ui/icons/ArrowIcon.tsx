import React from 'react'

interface ArrowIconProps {
  className?: string
}

export function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  )
}
