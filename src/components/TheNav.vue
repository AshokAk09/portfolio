<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
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

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
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
        @click="menuOpen = !menuOpen"
      >
        <span class="visually-hidden">{{ menuOpen ? 'Close' : 'Open' }} menu</span>
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
  width: 40px;
  height: 40px;
  margin-inline-end: -8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
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
  .nav__mark-name {
    display: none;
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
    padding-block: var(--space-s);
    font-size: var(--step-1);
    border-block-end: 1px solid var(--line);
  }

  .nav__link::after {
    display: none;
  }

  .nav__resume {
    margin-block-start: var(--space-m);
    align-self: flex-start;
  }
}
</style>
