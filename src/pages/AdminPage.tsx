import { type ReactNode, useId, useState } from 'react'
import { cn } from '../utils/cn'
import SafeImage from '../components/ui/SafeImage'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import type { CertificationItem } from '../config/portfolio.config'
import type { Project } from '../data/types'
import { usePortfolioStore } from '../state/usePortfolioStore'

function readImageAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result))
    r.onerror = () => reject(new Error('read failed'))
    r.readAsDataURL(file)
  })
}

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string
  hint?: string
  className?: string
  children: ReactNode
}) {
  return (
    <label className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</span>
      {hint ? <span className="text-[11px] font-normal normal-case text-slate-400">{hint}</span> : null}
      {children}
    </label>
  )
}

function Accordion({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
      >
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">{title}</h2>
        <span className="text-slate-400 tabular-nums" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? <div className="space-y-4 border-t border-slate-100 px-5 pb-6 pt-5">{children}</div> : null}
    </section>
  )
}

function impactDescription(p: Project): string {
  return p.impact[0]?.description ?? ''
}

export default function AdminPage() {
  const {
    portfolio,
    projects,
    updatePersonal,
    updateTextContent,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    removeCertification,
    updateCertification,
    updateTechStack,
    saveToStorage,
    resetToDefault,
    lastSavedAt,
  } = usePortfolioStore()

  const { profile, personal, meta, hero, footer, techStack } = portfolio
  const certifications = portfolio.certifications as CertificationItem[]

  const uid = useId()
  const [highlightProjectId, setHighlightProjectId] = useState<string | null>(null)

  return (
    <>
      <Helmet>
        <title>Admin | Portfolio</title>
      </Helmet>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <header className="border-b border-slate-200 bg-white px-4 py-4 md:px-8">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
            <h1 className="text-lg font-bold">Portfolio admin</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                ← Site
              </Link>
              <button
                type="button"
                className="rounded-lg bg-violet-700 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-800"
                onClick={saveToStorage}
              >
                Save changes
              </button>
              <button
                type="button"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800 hover:bg-red-100"
                onClick={() => {
                  if (window.confirm('Reset all content to default from code? This clears local storage.')) {
                    resetToDefault()
                  }
                }}
              >
                Reset to default
              </button>
            </div>
          </div>
          <p className="mx-auto mt-3 max-w-3xl text-xs text-slate-500">
            Changes are saved locally in your browser. Edits apply to the site immediately; <strong>Save</strong> keeps
            them for your next visit.
            {lastSavedAt ? (
              <span className="ml-2 font-mono text-slate-600">Last saved: {new Date(lastSavedAt).toLocaleString()}</span>
            ) : null}
          </p>
        </header>

        <main className="mx-auto max-w-3xl space-y-4 px-4 py-8 md:space-y-5 md:px-8">
          <Accordion title="Personal" defaultOpen>
            <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Shipped identity:</span> Backend Systems & Cloud Automation
              Engineer · I build systems that run.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name">
                <input
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={profile.name}
                  onChange={(e) => updatePersonal({ name: e.target.value })}
                />
              </Field>
              <Field
                label="Title (role)"
                hint="e.g. Backend Systems & Cloud Automation Engineer"
              >
                <input
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={profile.title}
                  onChange={(e) => updatePersonal({ title: e.target.value })}
                />
              </Field>
              <Field label="Tagline" hint="e.g. I build systems that run.">
                <input
                  className="sm:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={profile.headline}
                  onChange={(e) => updatePersonal({ tagline: e.target.value })}
                />
              </Field>
              <Field label="Email" className="sm:col-span-2">
                <input
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2"
                  value={profile.contact.email}
                  onChange={(e) => updatePersonal({ email: e.target.value })}
                />
              </Field>
              <Field label="Photo" hint="URL or upload a file below (stored as data URL for this browser).">
                <input
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={personal.photo.src}
                  onChange={(e) => updatePersonal({ photoUrl: e.target.value })}
                  placeholder="/headshot.png"
                />
                <input
                  id={`${uid}-photo`}
                  type="file"
                  accept="image/*"
                  className="mt-2 text-xs file:mr-2 file:rounded-lg file:border file:border-slate-200 file:bg-white file:px-2 file:py-1"
                  onChange={async (e) => {
                    const f = e.target.files?.[0]
                    if (!f) return
                    try {
                      const dataUrl = await readImageAsDataUrl(f)
                      updatePersonal({ photoUrl: dataUrl })
                    } catch {
                      /* ignore */
                    }
                    e.target.value = ''
                  }}
                />
                {personal.photo.src.trim() ? (
                  <div className="mt-3 h-20 w-20 overflow-hidden rounded-lg border border-slate-200">
                    <SafeImage
                      src={personal.photo.src}
                      alt="Preview"
                      fallbackLabel={profile.name}
                      className="h-20 w-20 object-cover"
                      wrapperClassName="h-20 w-20"
                    />
                  </div>
                ) : null}
              </Field>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Site & SEO</p>
              <div className="grid gap-5">
                <Field label="Meta title">
                  <input
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    value={meta.title}
                    onChange={(e) => updateTextContent({ metaTitle: e.target.value })}
                  />
                </Field>
                <Field label="Meta description">
                  <textarea
                    className="min-h-[72px] rounded-lg border border-slate-300 px-3 py-2 text-sm leading-snug"
                    rows={2}
                    value={meta.description}
                    onChange={(e) => updateTextContent({ metaDescription: e.target.value })}
                  />
                </Field>
                <Field label="Hero headline (H1)">
                  <input
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    value={hero.lines.h1}
                    onChange={(e) => updateTextContent({ heroH1: e.target.value })}
                  />
                </Field>
                <Field label="Hero subhead">
                  <textarea
                    className="min-h-[52px] rounded-lg border border-slate-300 px-3 py-2 text-sm leading-snug"
                    rows={2}
                    value={hero.lines.subhead}
                    onChange={(e) => updateTextContent({ heroSubhead: e.target.value })}
                  />
                </Field>
                <Field label="Hero kicker" hint="Optional; leave empty to hide.">
                  <input
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    value={hero.lines.kicker}
                    onChange={(e) => updateTextContent({ heroKicker: e.target.value })}
                  />
                </Field>
                <Field label="Footer line">
                  <input
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    value={footer.line}
                    onChange={(e) => updateTextContent({ footerLine: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          </Accordion>

          <Accordion title="Projects" defaultOpen>
            <div className="sticky top-0 z-10 -mx-5 mb-5 flex justify-end border-b border-slate-200/90 bg-gradient-to-b from-slate-100 via-slate-100/98 to-slate-100/90 px-5 py-3 backdrop-blur-md">
              <button
                type="button"
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
                onClick={() => {
                  const id = addProject()
                  setHighlightProjectId(id)
                  window.requestAnimationFrame(() => {
                    document.getElementById(`admin-project-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  })
                  window.setTimeout(() => setHighlightProjectId(null), 2400)
                }}
              >
                Add project
              </button>
            </div>
            <ul className="space-y-6">
              {projects.map((proj) => (
                <li
                  key={proj.id}
                  id={`admin-project-${proj.id}`}
                  className={cn(
                    'rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-[box-shadow,background-color] duration-500 md:p-5',
                    highlightProjectId === proj.id &&
                      'bg-violet-50/70 shadow-[0_0_0_2px_rgba(139,92,246,0.35),0_12px_36px_-16px_rgba(109,40,217,0.25)]',
                  )}
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                    <span className="font-mono text-xs text-slate-500">{proj.id}</span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-red-700 hover:underline"
                      onClick={() => removeProject(proj.id)}
                    >
                      Remove project
                    </button>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Title (slug / legacy)">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm"
                        value={proj.title}
                        onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                      />
                    </Field>
                    <Field label="Display title" hint="Card headline (e.g. Certificate Verification System).">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={proj.displayTitle ?? ''}
                        onChange={(e) =>
                          updateProject(proj.id, {
                            displayTitle: e.target.value.trim() ? e.target.value : undefined,
                          })
                        }
                      />
                    </Field>
                    <Field label="Repository slug" hint="Repository: … line (e.g. certificate-verification).">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm"
                        value={proj.repoSlug ?? ''}
                        onChange={(e) =>
                          updateProject(proj.id, { repoSlug: e.target.value.trim() ? e.target.value : undefined })
                        }
                      />
                    </Field>
                    <Field label="Tagline">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={proj.tagline}
                        onChange={(e) => updateProject(proj.id, { tagline: e.target.value })}
                      />
                    </Field>
                    <Field label="Description" hint="One line for project cards (falls back to tagline)." className="sm:col-span-2">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={proj.description ?? ''}
                        onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                      />
                    </Field>

                    <Field label="Problem" className="sm:col-span-2">
                      <textarea
                        className="min-h-[72px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-snug"
                        rows={2}
                        value={proj.problem}
                        onChange={(e) => updateProject(proj.id, { problem: e.target.value })}
                      />
                    </Field>
                    <Field label="Solution" className="sm:col-span-2">
                      <textarea
                        className="min-h-[72px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-snug"
                        rows={2}
                        value={proj.solution}
                        onChange={(e) => updateProject(proj.id, { solution: e.target.value })}
                      />
                    </Field>
                    <Field label="Impact" hint="Shown in modals; cards use highlights/features first." className="sm:col-span-2">
                      <textarea
                        className="min-h-[56px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-snug"
                        rows={2}
                        value={impactDescription(proj)}
                        onChange={(e) => {
                          const t = e.target.value.trim()
                          updateProject(proj.id, {
                            impact: t
                              ? [{ metric: 'Impact', description: t }]
                              : [{ metric: '—', description: '—' }],
                          })
                        }}
                      />
                    </Field>
                    <Field label="Features" hint="One per line → card bullets (or usage highlights if set in data).">
                      <textarea
                        className="min-h-[100px] rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm leading-snug"
                        value={proj.keyFeatures.join('\n')}
                        onChange={(e) =>
                          updateProject(proj.id, {
                            keyFeatures: e.target.value
                              .split('\n')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                      />
                    </Field>
                    <Field label="Highlights (optional)" hint="If set, these win on the card (max 3). One per line.">
                      <textarea
                        className="min-h-[80px] rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm leading-snug"
                        value={proj.usageHighlights.join('\n')}
                        onChange={(e) =>
                          updateProject(proj.id, {
                            usageHighlights: e.target.value
                              .split('\n')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                      />
                    </Field>
                    <Field label="Tech" hint="Comma-separated">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm sm:col-span-2"
                        value={proj.techStack.join(', ')}
                        onChange={(e) =>
                          updateProject(proj.id, {
                            techStack: e.target.value
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                      />
                    </Field>
                    <Field label="GitHub URL">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={proj.github ?? ''}
                        onChange={(e) => updateProject(proj.id, { github: e.target.value })}
                      />
                    </Field>
                    <Field label="Demo URL">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={proj.demo ?? ''}
                        onChange={(e) => updateProject(proj.id, { demo: e.target.value })}
                      />
                    </Field>
                    <Field label="Live URL" hint="Optional; shown as Live → on cards. Also set demo if you use one URL for both.">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={proj.live ?? ''}
                        onChange={(e) => updateProject(proj.id, { live: e.target.value })}
                      />
                    </Field>
                    <Field label="Card image" hint="URL or upload; optional banner on grid cards." className="sm:col-span-2">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={proj.thumbnail ?? ''}
                        onChange={(e) => updateProject(proj.id, { thumbnail: e.target.value || undefined })}
                        placeholder="https://… or data URL"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="mt-2 text-xs file:mr-2 file:rounded-lg file:border file:border-slate-200 file:bg-white file:px-2 file:py-1"
                        onChange={async (e) => {
                          const f = e.target.files?.[0]
                          if (!f) return
                          try {
                            const dataUrl = await readImageAsDataUrl(f)
                            updateProject(proj.id, { thumbnail: dataUrl })
                          } catch {
                            /* ignore */
                          }
                          e.target.value = ''
                        }}
                      />
                      {proj.thumbnail ? (
                        <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                          <SafeImage
                            src={proj.thumbnail}
                            alt=""
                            fallbackLabel={proj.title}
                            className="aspect-video max-h-32 w-full object-cover"
                            wrapperClassName="aspect-video max-h-32 w-full min-h-[80px]"
                          />
                        </div>
                      ) : null}
                    </Field>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion title="Certifications" defaultOpen>
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                onClick={() =>
                  addCertification({
                    title: 'New certification',
                    org: '',
                    image: '/credentials/placeholder-certificate.svg',
                    category: 'Cloud',
                  })
                }
              >
                Add certification
              </button>
            </div>
            <ul className="space-y-6">
              {certifications.map((c) => (
                <li key={c.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 md:p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                    <span className="font-mono text-xs text-slate-500">{c.id}</span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-red-700 hover:underline"
                      onClick={() => removeCertification(c.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Title">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={c.title}
                        onChange={(e) => updateCertification(c.id, { title: e.target.value })}
                      />
                    </Field>
                    <Field label="Org">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={'org' in c && c.org != null ? c.org : ''}
                        onChange={(e) => updateCertification(c.id, { org: e.target.value })}
                      />
                    </Field>
                    <Field label="Image URL" className="sm:col-span-2">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={c.image}
                        onChange={(e) => updateCertification(c.id, { image: e.target.value })}
                      />
                    </Field>
                    <Field label="Upload image" hint="Replaces URL with a data URL (good for quick local edits)." className="sm:col-span-2">
                      <input
                        type="file"
                        accept="image/*"
                        className="text-xs file:mr-2 file:rounded-lg file:border file:border-slate-200 file:bg-white file:px-2 file:py-1"
                        onChange={async (e) => {
                          const f = e.target.files?.[0]
                          if (!f) return
                          try {
                            const dataUrl = await readImageAsDataUrl(f)
                            updateCertification(c.id, { image: dataUrl })
                          } catch {
                            /* ignore */
                          }
                          e.target.value = ''
                        }}
                      />
                      {c.image ? (
                        <div className="mt-3 max-h-36 w-full max-w-md overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                          <SafeImage
                            src={c.image}
                            alt=""
                            fallbackLabel={c.title}
                            className="max-h-36 w-full object-contain"
                            wrapperClassName="flex min-h-[100px] w-full items-center justify-center"
                          />
                        </div>
                      ) : null}
                    </Field>
                    <Field label="Category">
                      <input
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={c.category}
                        onChange={(e) => updateCertification(c.id, { category: e.target.value })}
                      />
                    </Field>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion title="Stack" defaultOpen={false}>
            <p className="text-xs text-slate-500">One label per line. IDs are derived from the label slug.</p>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Primary">
                <textarea
                  className="min-h-[160px] rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm leading-relaxed"
                  value={techStack.primary.map((x) => x.label).join('\n')}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                    updateTechStack(
                      lines.map((label) => ({
                        id: label.toLowerCase().replace(/\s+/g, '-').slice(0, 48),
                        label,
                      })),
                      [...techStack.secondary],
                    )
                  }}
                />
              </Field>
              <Field label="Secondary">
                <textarea
                  className="min-h-[160px] rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm leading-relaxed"
                  value={techStack.secondary.map((x) => x.label).join('\n')}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                    updateTechStack(
                      [...techStack.primary],
                      lines.map((label) => ({
                        id: label.toLowerCase().replace(/\s+/g, '-').slice(0, 48),
                        label,
                      })),
                    )
                  }}
                />
              </Field>
            </div>
          </Accordion>
        </main>
      </div>
    </>
  )
}
