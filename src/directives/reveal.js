/**
 * v-reveal — fade/rise an element the first time it enters the viewport.
 *
 *   <div v-reveal>        ... no delay
 *   <div v-reveal="120">  ... 120ms delay, for staggering siblings
 *
 * Registered globally in main.js, so components use `v-reveal` without any
 * import.
 *
 * One IntersectionObserver is shared across every instance rather than one
 * per element — a page with ~60 revealed nodes otherwise pays for 60
 * observers. Elements unobserve themselves once shown, so the observer
 * drains to empty after the first full scroll.
 */

const REVEALED = 'is-visible'

let observer = null
const pending = new WeakSet()

function ensureObserver() {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add(REVEALED)
        observer.unobserve(entry.target)
        pending.delete(entry.target)
      }
    },
    {
      // Fire a little before the element's top edge clears the fold, so the
      // transition is already underway by the time it's properly in view.
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.08,
    },
  )

  return observer
}

export const reveal = {
  mounted(el, binding) {
    const prefersStill = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // No observer support, or the user asked for no motion: show it outright.
    // Never leave content stranded at opacity 0.
    if (typeof IntersectionObserver === 'undefined' || prefersStill) {
      el.classList.add('reveal', REVEALED)
      return
    }

    el.classList.add('reveal')

    const delay = Number(binding.value) || 0
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    pending.add(el)
    ensureObserver().observe(el)
  },

  unmounted(el) {
    if (pending.has(el)) {
      observer?.unobserve(el)
      pending.delete(el)
    }
  },
}

export default reveal
