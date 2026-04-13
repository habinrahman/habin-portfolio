type Props = {
  text: string
  keywords: string[]
}

export default function HighlightText({ text, keywords }: Props) {
  const ks = keywords.filter(Boolean)
  if (ks.length === 0) return <>{text}</>

  const pattern = new RegExp(`(${ks.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((p, i) => {
        const hit = ks.some((k) => p.toLowerCase() === k.toLowerCase())
        if (!hit) return <span key={i}>{p}</span>
        return (
          <span
            key={i}
            className="rounded border border-slate-200 bg-slate-100 px-1 py-0.5 font-medium text-slate-900"
          >
            {p}
          </span>
        )
      })}
    </>
  )
}
