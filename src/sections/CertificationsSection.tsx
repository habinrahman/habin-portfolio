import { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CertificateImage from '../components/credentials/CertificateImage'
import CertificationModal from '../components/credentials/CertificationModal'
import VerificationProofSection from '../components/projects/VerificationProofSection'
import type { CertificationItem } from '../config/portfolio.config'
import { usePortfolioStore } from '../state/usePortfolioStore'
import { springSnappy } from '../motion/micro'

type Props = {
  /** When true, show first 3 certifications (config order). */
  preview?: boolean
}

export default function CertificationsSection({ preview = false }: Props) {
  const { portfolio } = usePortfolioStore()
  const section = portfolio.certificationSection

  const certificationsToShow = useMemo(() => {
    const all = [...(portfolio.certifications as CertificationItem[])]
    return preview ? all.slice(0, 3) : all
  }, [portfolio.certifications, preview])

  const [modalOpen, setModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openAt = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, certificationsToShow.length - 1)))
    setModalOpen(true)
  }, [certificationsToShow.length])

  return (
    <section
      id="certs"
      aria-labelledby="certs-heading"
      className="scroll-mt-4 border-t border-slate-200/70 bg-white px-4 py-12 md:px-10 md:py-14 lg:px-14"
    >
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl text-left">
          <h2 id="certs-heading" className="text-3xl font-bold tracking-tight text-slate-950 md:text-[2.125rem] md:leading-tight">
            {section.sectionTitle}
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-600 md:mt-4 md:text-base">
            {section.sectionSubtitle}
            {preview ? null : (
              <>
                {' '}
                <Link
                  to={section.viewAllOnPagePath}
                  className="whitespace-nowrap font-semibold text-violet-800 underline-offset-2 hover:underline"
                >
                  {section.viewAllOnPageLabel}
                </Link>
              </>
            )}
          </p>
        </header>

        {certificationsToShow.length > 0 ? (
          <ul
            className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-12 md:gap-5"
            role="list"
          >
            {certificationsToShow.map((cert, index) => (
              <li key={`${cert.image}-${index}`}>
                <motion.button
                  type="button"
                  onClick={() => openAt(index)}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ ...springSnappy, delay: index * 0.04 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="group flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 text-left shadow-sm transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/35 focus-visible:ring-offset-2"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700">{cert.category}</span>
                  <div className="mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                    <CertificateImage
                      primarySrc={cert.image}
                      alt={`${cert.title} certificate preview`}
                      className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                      brokenClassName="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-slate-100 to-violet-50 px-2 text-center"
                    />
                  </div>
                  <p className="mt-3 text-[15px] font-semibold leading-snug text-slate-950 md:text-base">{cert.title}</p>
                  {cert.org ? <p className="mt-1 text-xs font-medium text-slate-500 md:text-sm">{cert.org}</p> : null}
                  <span className="mt-3 text-[11px] font-semibold text-violet-800 opacity-90 group-hover:underline">
                    View credential
                  </span>
                </motion.button>
              </li>
            ))}
          </ul>
        ) : (
          <p
            className="mt-10 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm font-medium text-amber-950 md:mt-12"
            role="status"
          >
            No certifications in <span className="font-mono text-xs">portfolio.config.ts</span> — add items to{' '}
            <span className="font-mono text-xs">certifications</span>.
          </p>
        )}

        {preview ? (
          <div className="mt-10 flex justify-center md:mt-12">
            <Link
              to={section.viewAllOnPagePath}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-violet-400/60 hover:text-violet-900 hover:shadow-md"
            >
              {section.previewViewAllLabel ?? 'View all certifications →'}
            </Link>
          </div>
        ) : null}

        <CertificationModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          items={certificationsToShow}
          initialIndex={activeIndex}
          title={section.modalTitle}
        />

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-slate-200/90 bg-slate-50/80 px-6 py-5 md:mt-14 md:px-7 md:py-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">{section.appliedHeading}</p>
          <ul className="mt-3 space-y-2" role="list">
            {section.appliedInSystems.map((name) => (
              <li key={name} className="flex gap-3 text-sm font-medium leading-snug text-slate-800 md:text-[15px]">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-600" aria-hidden />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-10 max-w-2xl md:mt-12">
          <VerificationProofSection proof={section.verificationProof} compact />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-left text-base font-bold leading-snug tracking-tight text-slate-950 md:mt-12 md:text-lg">
          {section.footerTagline}
        </p>
      </div>
    </section>
  )
}
