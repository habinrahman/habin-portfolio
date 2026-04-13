import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioProgress } from '../state/usePortfolioProgress'
import { sectionStaggerChildGentle, sectionStaggerParent, springSoft } from '../motion/micro'
import { cn } from '../utils/cn'

const STROKE = 1.75
const cardEase = [0.25, 0.1, 0.25, 1] as const
const cardHover = { duration: 0.3, ease: cardEase }

const DO_POINTS = [
  'Droplet deployments',
  'Linux operations',
  'Cron and process automation',
  'Automation hosted in prod (email, scripts)',
] as const

const AWS_POINTS = [
  'Cloud architecture',
  'Deploy and scale',
  'DevOps and infra practice',
  'Certs: AWS, Azure, DevOps',
] as const

function DropletIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3c-3 4.5-6 7.8-6 11.2a6 6 0 1 0 12 0C18 10.8 15 7.5 12 3Z" />
      <path d="M12 14v3" />
    </svg>
  )
}

function AwsCloudIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.756-3.752 4.5 4.5 0 0 0-8.536 4.644 4.502 4.502 0 0 0-.742 1.814z" />
    </svg>
  )
}

function PlatformCard({
  title,
  icon,
  iconClass,
  points,
}: {
  title: string
  icon: ReactNode
  iconClass: string
  points: readonly string[]
}) {
  return (
    <motion.article
      className={cn(
        'flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 md:p-7',
        'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_rgba(15,23,42,0.07)]',
      )}
      whileHover={{
        y: -2,
        boxShadow:
          '0 4px 14px rgba(15, 23, 42, 0.07), 0 22px 52px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(15, 23, 42, 0.05)',
      }}
      transition={cardHover}
    >
      <div className="flex items-start gap-4">
        <motion.div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1',
            iconClass,
          )}
          whileHover={{
            scale: 1.04,
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.06)',
          }}
          transition={{ duration: 0.3, ease: cardEase }}
        >
          {icon}
        </motion.div>
        <div className="min-w-0 pt-0.5">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
        </div>
      </div>
      <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm leading-relaxed text-slate-600">
        {points.map((line) => (
          <li key={line} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function CloudInfrastructureSection({ bundle = false }: { bundle?: boolean }) {
  const { totalXp, badges } = usePortfolioProgress()
  const cloudEngineer = badges.find((b) => b.id === 'cloud-engineer')
  const cloudUnlocked = cloudEngineer?.unlocked ?? false
  const needXp = cloudEngineer ? Math.max(0, cloudEngineer.thresholdXp - totalXp) : 0

  const Tag = bundle ? 'div' : 'section'
  const shellProps = bundle
    ? {
        id: 'cloud' as const,
        className: 'relative scroll-mt-4 px-0 pt-0 pb-2 md:pb-3',
      }
    : {
        id: 'cloud' as const,
        'aria-labelledby': 'cloud-heading' as const,
        className:
          'relative scroll-mt-4 border-t border-slate-200/90 bg-zinc-50 px-4 pt-16 pb-16 md:px-8 md:pt-20 md:pb-20',
      }

  return (
    <Tag {...shellProps}>
      <div className="relative mx-auto w-full max-w-6xl px-0">
        <motion.div
          className="grid grid-cols-1 gap-x-[22px] gap-y-8 md:grid-cols-2"
          variants={sectionStaggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
        >
          <motion.div variants={sectionStaggerChildGentle} className="md:col-span-2 text-center">
            <h2 id="cloud-heading" className={bundle ? 'heading-support' : 'heading-page'}>
              Cloud &amp; Infrastructure
            </h2>
            <p
              className={cn(
                'mx-auto max-w-2xl leading-[1.72] text-slate-600',
                bundle ? 'mt-3 text-sm md:text-base' : 'mt-5 text-lead',
              )}
            >
              Deployed and run backends on cloud — not local-only experiments.
            </p>
            <p
              className={cn(
                'mx-auto max-w-2xl leading-[1.68] text-slate-700',
                bundle
                  ? 'mt-3 text-sm md:mt-4 md:text-[15px] md:leading-[1.65]'
                  : 'mt-6 text-base md:text-[17px] md:leading-[1.7]',
              )}
            >
              Reliability, automation, scale — the parts that matter in prod.
            </p>
            <p
              className={cn(
                'mx-auto max-w-2xl font-medium leading-[1.7] text-slate-600',
                bundle ? 'mt-3 text-xs md:text-[13px]' : 'mt-5 text-sm md:text-[15px]',
              )}
            >
              Automation lives in real environments — not on my laptop alone.
            </p>

            {cloudUnlocked ? (
              <motion.div
                key="cloud-engineer-unlocked"
                className="mx-auto mt-8 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={springSoft}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400/40 opacity-35" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-700" />
                </span>
                Cloud Engineer · Unlocked
              </motion.div>
            ) : cloudEngineer ? (
              <p className="mt-7 text-center text-xs font-medium leading-relaxed text-slate-400">
                {needXp} more XP for Cloud Engineer badge.
              </p>
            ) : null}
          </motion.div>

          <motion.div variants={sectionStaggerChildGentle} className="min-w-0 h-full w-full">
            <PlatformCard
              title="DigitalOcean"
              icon={<DropletIcon className="h-[22px] w-[22px] text-sky-700" />}
              iconClass="bg-slate-100 text-sky-800 ring-slate-200/90"
              points={DO_POINTS}
            />
          </motion.div>

          <motion.div variants={sectionStaggerChildGentle} className="min-w-0 h-full w-full">
            <PlatformCard
              title="AWS Cloud"
              icon={<AwsCloudIcon className="h-[22px] w-[22px] text-amber-800" />}
              iconClass="bg-slate-100 text-amber-900 ring-slate-200/90"
              points={AWS_POINTS}
            />
          </motion.div>
        </motion.div>
      </div>
    </Tag>
  )
}
