import Button from '../components/ui/Button'
import { usePortfolioStore } from '../state/usePortfolioStore'

export default function ContactSection() {
  const { portfolio } = usePortfolioStore()
  const { profile, contact: c } = portfolio
  const mailDiscuss = `mailto:${profile.contact.email}?subject=${encodeURIComponent(c.mailtoSubject)}`
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-slate-200/70 bg-zinc-50/80 px-4 py-14 md:px-10 md:py-16 lg:px-14"
    >
      <div className="mx-auto max-w-6xl text-left">
        <h2 id="contact-heading" className="heading-support text-slate-950">
          {c.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">{c.body}</p>

        <div className="mt-8 flex flex-wrap gap-3 md:mt-9">
          <Button href={mailDiscuss}>{c.emailButton}</Button>
          <Button variant="secondary" href={profile.contact.github} target="_blank" rel="noreferrer">
            {c.githubButton}
          </Button>
          <Button variant="secondary" href={profile.contact.linkedin} target="_blank" rel="noreferrer">
            {c.linkedinButton}
          </Button>
        </div>

        <p className="mt-6 font-mono text-xs text-slate-500 md:mt-7">{profile.contact.email}</p>
      </div>
    </section>
  )
}
