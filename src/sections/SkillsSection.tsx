import { motion } from 'framer-motion'
import { SKILL_CATEGORIES } from '../data/skills'
import Card from '../components/ui/Card'

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="border-t border-slate-200/60 bg-white px-4 py-12 md:px-8 md:py-14"
    >
      <h2 className="heading-support">Skills</h2>
      <p className="mt-3 max-w-2xl text-sm text-slate-600 md:mt-4 md:text-base">
        Backend, frontend, DevOps — what I actually ship with.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
        {SKILL_CATEGORIES.map((group) => (
          <Card key={group.id} className="p-5 md:p-6">
            <h3 className="text-base font-semibold text-slate-900 md:text-lg">{group.title}</h3>
            <p className="mt-1 text-xs text-slate-600 md:text-sm">{group.description}</p>
            <div className="mt-5 space-y-3">
              {group.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 font-medium">{skill.name}</span>
                    <span className="text-slate-500 tabular-nums">{skill.level}%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-200 overflow-x-hidden">
                    <motion.div
                      className="h-full bg-violet-700"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
