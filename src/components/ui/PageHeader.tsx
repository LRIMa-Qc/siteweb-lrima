import { Container } from '@/components/ui'

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.4]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>

      <Container>
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-slate-600 font-light leading-relaxed mb-8">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  )
}
