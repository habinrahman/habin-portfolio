import TechStackGrid from '../components/about/TechStackGrid'
import LiveEngineeringStats from '../components/system/LiveEngineeringStats'

export default function AboutSection() {
  return (
    <section id="about" className="section-block bg-pink-200 px-4 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="heading-page">What I Do</h2>
        <p className="mt-6 text-lead">
          I design and build backend systems, automation platforms, and scalable APIs.
        </p>
        <p className="mt-4 text-body">
          I focus on reliability, performance, and real-world usage.
        </p>
      </div>

      <TechStackGrid />

      <p className="mt-12 text-center text-eyebrow-muted">Live portfolio telemetry</p>
      <LiveEngineeringStats compact className="mt-4" />
    </section>
  )
}
