const PRINCIPLES = [
  'Systems must be reliable under failure',
  'Automation reduces human error',
  'Observability is essential',
  'Clean architecture scales better',
]

export default function EngineeringPrinciplesSection() {
  return (
    <section id="engineering-principles" className="section-block bg-blue-200 px-4 md:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="heading-page">Engineering Principles</h2>
        <ul className="mt-10 md:mt-11 space-y-4 md:space-y-5 text-base md:text-lg text-slate-600 leading-relaxed list-none">
          {PRINCIPLES.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
