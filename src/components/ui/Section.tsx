import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  spacing = 'lg',
  containerMaxWidth = 'xl',
}) => {
  const spacingStyles = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
    xl: 'py-32 md:py-40',
  }

  return (
    <section className={cn(spacingStyles[spacing], className)}>
      <Container maxWidth={containerMaxWidth}>{children}</Container>
    </section>
  )
}
