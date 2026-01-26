import { ComponentProps } from 'react'

export function UserIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
      <path d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}
