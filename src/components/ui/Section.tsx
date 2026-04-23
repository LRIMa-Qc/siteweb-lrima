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
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-24 md:py-32',
  }

  return (
    <section className={cn(spacingStyles[spacing], className)}>
      <Container maxWidth={containerMaxWidth}>{children}</Container>
    </section>
  )
}
