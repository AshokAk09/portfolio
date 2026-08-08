<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { nav, profile } from '@/content/site'

const scrolled = ref(false)
const activeId = ref('')
const menuOpen = ref(false)

/**
 * Two cheap scroll behaviours, both passive:
 *  1. the bar gains a background once you leave the hero
 *  2. the current section's link is marked, so the nav doubles as a position
 *     indicator rather than just a set of jump links
 */
function onScroll() {
  scrolled.value = window.scrollY > 24

  const probe = window.innerHeight * 0.35
  let current = ''
  for (const item of nav) {
    const el = document.getElementById(item.id)
    if (el && el.getBoundingClientRect().top <= probe) current = item.id
  }
  activeId.value = current
}

function close() {
  menuOpen.value = false
}

/**
 * Lock the page behind the open menu. Without this the hero scrolls under a
 * fixed panel, which reads as two pages moving at once.
 */
watch(menuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

/** Escape closes it — expected of anything that traps the view. */
function onKeydown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  // Never leave the page unscrollable if this unmounts while open
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen }">
    <div class="shell nav__inner">
      <a class="nav__mark" href="#main" :aria-label="`${profile.name} — home`">
        <span class="nav__initials">{{ profile.initials }}</span>
        <span class="nav__mark-name">{{ profile.name }}</span>
      </a>

      <button
        class="nav__toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="nav-links"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="menuOpen = !menuOpen"
      >
        <!-- The label lives on aria-label, not in a child span: a
             visually-hidden span would be the button's :first-child, which
             silently breaks the bar selectors that build the X. -->
        <span class="nav__bar" aria-hidden="true"></span>
        <span class="nav__bar" aria-hidden="true"></span>
      </button>

      <nav id="nav-links" class="nav__links" aria-label="Sections">
        <a
          v-for="item in nav"
          :key="item.id"
          class="nav__link"
          :class="{ 'is-active': activeId === item.id }"
          :href="`#${item.id}`"
          :aria-current="activeId === item.id ? 'true' : undefined"
          @click="close"
        >
          {{ item.label }}
        </a>

        <a
          v-if="profile.resume"
          class="nav__resume"
          :href="profile.resume"
          target="_blank"
          rel="noopener"
          @click="close"
        >
          Résumé
          <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M3 9 9 3M9 3H4.5M9 3v4.5"
              stroke="currentColor"
              stroke-width="1.4"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 100;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  transition:
    background var(--dur) var(--ease-out),
    border-color var(--dur) var(--ease-out);
  border-block-end: 1px solid transparent;
}

/* Only once you've scrolled does the bar assert itself — over the hero it's
   invisible chrome, which keeps the first impression to type alone. */
.nav.is-scrolled {
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(12px) saturate(140%);
  border-block-end-color: var(--line);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-m);
}

/* Wordmark ---------------------------------------------------------------- */

.nav__mark {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-xs);
  white-space: nowrap;
}

.nav__initials {
  font-family: var(--font-serif);
  font-size: var(--step-2);
  line-height: 1;
  color: var(--accent);
}

.nav__mark-name {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
  color: var(--text-faint);
  transition: color var(--dur-fast) var(--ease-out);
}

.nav__mark:hover .nav__mark-name {
  color: var(--text-dim);
}

/* Links ------------------------------------------------------------------- */

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-m);
}

.nav__link {
  position: relative;
  font-size: var(--step--1);
  color: var(--text-dim);
  padding-block: var(--space-2xs);
  transition: color var(--dur-fast) var(--ease-out);
}

/* Underline grows from the left rather than fading — reads as more deliberate */
.nav__link::after {
  content: '';
  position: absolute;
  inset-block-end: 0;
  inset-inline-start: 0;
  height: 1px;
  width: 100%;
  background: var(--accent);
  scale: 0 1;
  transform-origin: left;
  transition: scale var(--dur) var(--ease-out);
}

.nav__link:hover {
  color: var(--text);
}

.nav__link:hover::after,
.nav__link.is-active::after {
  scale: 1 1;
}

.nav__link.is-active {
  color: var(--text);
}

.nav__resume {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  font-size: var(--step--1);
  padding: 0.45rem 0.9rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-pill);
  color: var(--text);
  transition:
    border-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out),
    background var(--dur-fast) var(--ease-out);
}

.nav__resume:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-dim);
}

/* Mobile ------------------------------------------------------------------ */

.nav__toggle {
  display: none;
  /* 44px is the minimum comfortable touch target; the visual box is smaller
     than the hit area via the negative margin. */
  width: 44px;
  height: 44px;
  margin-inline-end: -10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--text);
  transition:
    border-color var(--dur-fast) var(--ease-out),
    background var(--dur-fast) var(--ease-out);
}

.nav__toggle:hover {
  border-color: var(--line-strong);
  background: var(--bg-raised);
}

.nav__bar {
  display: block;
  width: 20px;
  height: 1.5px;
  background: var(--text);
  transition:
    translate var(--dur-fast) var(--ease-out),
    rotate var(--dur-fast) var(--ease-out);
}

.is-open .nav__bar:first-child {
  translate: 0 3.25px;
  rotate: 45deg;
}

.is-open .nav__bar:last-child {
  translate: 0 -3.25px;
  rotate: -45deg;
}

@media (max-width: 720px) {
  /* The name stays. Initials alone are a monogram nobody can decode — on the
     one surface where a stranger is deciding whether to keep reading, the
     whole name has to be legible. */
  .nav__mark-name {
    font-size: 0.72rem;
  }

  .nav__toggle {
    display: flex;
    order: 3;
  }

  .nav__links {
    order: 4;
    position: fixed;
    inset-block-start: var(--nav-h);
    inset-inline: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: var(--space-xs) var(--gutter) var(--space-m);
    background: color-mix(in srgb, var(--bg) 96%, transparent);
    backdrop-filter: blur(12px);
    border-block-end: 1px solid var(--line);

    /* Collapsed by default; `visibility` keeps the links out of the tab order
       while closed, which a pure opacity/height trick would not. */
    visibility: hidden;
    opacity: 0;
    translate: 0 -8px;
    transition:
      opacity var(--dur) var(--ease-out),
      translate var(--dur) var(--ease-out),
      visibility var(--dur);
  }

  .is-open .nav__links {
    visibility: visible;
    opacity: 1;
    translate: 0 0;
  }

  .nav__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: var(--space-s);
    font-size: var(--step-2);
    color: var(--text);
    border-block-end: 1px solid var(--line);
  }

  /* A chevron gives each row somewhere to point; without it the list reads as
     four labels floating in a box. */
  .nav__link::before {
    content: '';
    order: 2;
    width: 7px;
    height: 7px;
    border-block-start: 1px solid var(--text-faint);
    border-inline-end: 1px solid var(--text-faint);
    rotate: 45deg;
  }

  .nav__link.is-active {
    color: var(--accent);
  }

  .nav__link.is-active::before {
    border-color: var(--accent);
  }

  /* The desktop underline would sit on top of the row divider */
  .nav__link::after {
    display: none;
  }

  /* Whatever ends the list — last link, or the résumé button when present —
     shouldn't draw a rule into empty padding. */
  .nav__links > :last-child {
    border-block-end: 0;
  }

  .nav__resume {
    margin-block-start: var(--space-m);
    align-self: flex-start;
  }
}
</style>
