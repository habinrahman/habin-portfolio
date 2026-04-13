import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { PROFILE } from '../data/profile'
import { scrollToId } from '../utils/scrollToId'

const SERVICES = [
  {
    title: 'Backend Development',
    description:
      'Reliable services, databases, auth, and integrations — built for maintainability and long-term use.',
  },
  {
    title: 'Automation Systems',
    description:
      'Pipelines, scheduled jobs, and tooling that remove repetitive work and scale with your operations.',
  },
  {
    title: 'API Development',
    description:
      'Clean REST APIs, clear contracts, and documentation so frontend and partners can ship with confidence.',
  },
] as const

function formatStartingPrice(usd: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(usd)
}

export default function ServicesSection() {
  const mailtoStartProject = `mailto:${PROFILE.contact.email}?subject=${encodeURIComponent('New project inquiry')}`

  return (
    <section id="services" className="section-block bg-green-200 px-4 md:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-eyebrow">Available for hire</p>
        <h2 className="mt-3 heading-page">Services I offer</h2>
        <p className="mt-4 text-lead">
          Fixed-scope projects and ongoing backend support for teams that need engineering depth, not just deliverables.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-medium text-slate-800">
            Starting from {formatStartingPrice(PROFILE.freelance.startingFromUsd)} per project
          </span>
          <span className="text-slate-300 mx-1.5">·</span>
          <span className="text-slate-500">Scope and timeline after a short discovery call.</span>
        </p>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {SERVICES.map((item) => (
          <div key={item.title} className="min-w-0">
            <Card className="h-full p-6 md:p-7 flex flex-col text-left">
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">{item.description}</p>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button type="button" onClick={() => scrollToId('contact')}>
          Hire Me
        </Button>
        <Button variant="secondary" href={mailtoStartProject}>
          Start a Project
        </Button>
      </div>
    </section>
  )
}
