import { motion } from 'framer-motion'
import { EXPERIENCE } from '../data/experience'
import Card from '../components/ui/Card'

export default function ExperienceSection() {
  return (
    <section id="experience" className="pt-16 md:pt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Experience</h2>
      <p className="mt-3 text-slate-600">Timeline of internships and systems-focused achievements.</p>

      <div className="mt-8 relative border-l border-slate-200 ml-3 space-y-6">
        {EXPERIENCE.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="relative pl-6"
          >
            <span className="absolute -left-[6px] top-4 h-3 w-3 rounded-full bg-violet-500 ring-4 ring-violet-100" />
            <Card className="p-6 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <span className="text-xs font-medium text-slate-500">{item.timeframe}</span>
              </div>
              <div className="mt-1 text-sm font-semibold text-violet-700">{item.org}</div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.summary}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {item.achievements.map((a) => (
                  <li key={a}>- {a}</li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
