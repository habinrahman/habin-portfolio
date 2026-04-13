import { Helmet } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import TopNav from '../components/layout/TopNav'
import ScrollToTop from '../components/ScrollToTop'
import CertificationsSection from '../sections/CertificationsSection'
import { usePortfolioStore } from '../state/usePortfolioStore'

export default function CertificationsPage() {
  const { portfolio } = usePortfolioStore()
  const { meta, certificationSection, certificationsPage } = portfolio
  return (
    <MotionConfig reducedMotion="never">
      <Helmet>
        <title>Certifications | {meta.title}</title>
        <meta name="description" content={certificationSection.sectionSubtitle} />
      </Helmet>
      <ScrollToTop />
      <div className="relative min-h-screen w-full">
        <div className="relative z-10">
          <TopNav />
          <div className="border-b border-slate-200/80 bg-zinc-50/80 px-4 py-10 md:px-10 md:py-12 lg:px-14">
            <p className="mx-auto max-w-5xl text-sm text-slate-600">
              <Link to="/" className="font-medium text-violet-800 underline-offset-2 hover:underline">
                {certificationsPage.backToHomeLabel}
              </Link>
            </p>
          </div>
          <CertificationsSection />
          <Footer />
        </div>
      </div>
    </MotionConfig>
  )
}
