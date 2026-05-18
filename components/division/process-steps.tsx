interface Step {
  step: string
  title: string
  description: string
}

interface ProcessStepsProps {
  title: string
  subtitle: string
  steps: Step[]
  accentColor: string
}

export default function ProcessSteps({
  title,
  subtitle,
  steps,
  accentColor,
}: ProcessStepsProps) {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${accentColor}`}>
            {subtitle}
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {title}
          </h2>
        </div>

        <div className="relative mt-14">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                {/* Step number */}
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background text-lg font-bold text-primary">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
