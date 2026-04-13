function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollElementIntoView(
  el: Element,
  options?: { block?: ScrollLogicalPosition },
) {
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: options?.block ?? 'start',
  })
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  scrollElementIntoView(el)
}
