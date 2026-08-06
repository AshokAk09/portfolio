<script setup>
import { hero, profile, yearsOfExperience } from '@/content/site'
import SocialLinks from './SocialLinks.vue'

const years = yearsOfExperience()
</script>

<template>
  <!-- id="top" is the target for the footer's back-to-top link -->
  <section id="top" class="hero" aria-labelledby="hero-heading">
    <div class="shell hero__inner">
      <p class="hero__eyebrow">
        <span class="hero__pulse" aria-hidden="true"></span>
        {{ profile.role }} · {{ profile.company }}
      </p>

      <!-- The single most-read element on the site. Type does all the work. -->
      <h1 id="hero-heading" class="hero__headline">
        {{ hero.lead }}
        <em class="hero__accent">{{ hero.accent }}</em>
        {{ hero.trail }}
      </h1>

      <p class="hero__standfirst">{{ hero.standfirst }}</p>

      <div class="hero__actions">
        <a class="btn btn--primary" href="#work">
          See the work
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M3 11 11 3M11 3H5.5M11 3v5.5"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <a class="btn btn--ghost" :href="`mailto:${profile.email}`">Get in touch</a>
      </div>

      <SocialLinks class="hero__socials" />

      <!-- Footer strip of the hero: three checkable facts, mono-set. -->
      <dl class="hero__meta">
        <div class="hero__meta-item">
          <dt>Based in</dt>
          <dd>{{ profile.location }}</dd>
        </div>
        <div class="hero__meta-item">
          <dt>Experience</dt>
          <dd>{{ years }}+ years</dd>
        </div>
        <div class="hero__meta-item">
          <dt>Focus</dt>
          <dd>Front-end &amp; scale</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  /* Not a full 100vh: showing a slice of the next section is what invites the
     scroll. svh keeps mobile browser chrome from cropping it. */
  min-height: min(88svh, 900px);
  display: flex;
  align-items: center;
  padding-block: calc(var(--nav-h) + var(--space-2xl)) var(--space-2xl);
}

.hero__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Eyebrow ---------------------------------------------------------------- */

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
  color: var(--text-dim);
  animation: rise var(--dur-slow) var(--ease-out) both;
}

.hero__pulse {
  width: 7px;
  height: 7px;
  border-radius: var(--radius-pill);
  background: var(--accent);
  box-shadow: 0 0 0 0 var(--accent-glow);
  animation: pulse 2.8s var(--ease-in-out) infinite;
}

/* Headline --------------------------------------------------------------- */

.hero__headline {
  margin-block-start: var(--space-m);
  font-family: var(--font-serif);
  font-size: var(--step-7);
  line-height: 1;
  letter-spacing: -0.03em;
  max-width: 20ch;
  animation: rise var(--dur-slow) var(--ease-out) 80ms both;
}

/* Italic serif + amber is the whole brand in one gesture. */
.hero__accent {
  color: var(--accent);
  font-style: italic;
}

.hero__standfirst {
  margin-block-start: var(--space-m);
  max-width: 56ch;
  font-size: var(--step-1);
  line-height: 1.6;
  color: var(--text-dim);
  animation: rise var(--dur-slow) var(--ease-out) 160ms both;
}

/* Actions ---------------------------------------------------------------- */

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-block-start: var(--space-l);
  animation: rise var(--dur-slow) var(--ease-out) 240ms both;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.8rem 1.4rem;
  border-radius: var(--radius-pill);
  font-size: var(--step-0);
  font-weight: 500;
  border: 1px solid transparent;
  transition:
    background var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out),
    translate var(--dur-fast) var(--ease-out);
}

.btn:hover {
  translate: 0 -2px;
}

.btn--primary {
  background: var(--accent);
  color: #0a0a0b;
}

.btn--primary:hover {
  background: #ffd06b;
}

.btn--primary svg {
  transition: translate var(--dur-fast) var(--ease-out);
}

.btn--primary:hover svg {
  translate: 2px -2px;
}

.btn--ghost {
  border-color: var(--line-strong);
  color: var(--text);
}

.btn--ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-dim);
}

/* Socials ---------------------------------------------------------------- */

/* SocialLinks owns its own layout and hover states; the hero only positions it
   and folds it into the load-in sequence. */
.hero__socials {
  margin-block-start: var(--space-l);
  animation: rise var(--dur-slow) var(--ease-out) 320ms both;
}

/* Meta strip ------------------------------------------------------------- */

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-l);
  margin-block-start: var(--space-2xl);
  padding-block-start: var(--space-m);
  border-block-start: 1px solid var(--line);
  width: 100%;
  animation: rise var(--dur-slow) var(--ease-out) 400ms both;
}

.hero__meta-item dt {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
  color: var(--text-faint);
}

.hero__meta-item dd {
  margin: 0.35rem 0 0;
  font-size: var(--step-0);
  color: var(--text);
}

/* Motion ----------------------------------------------------------------- */
/* The hero animates on load rather than on scroll — it is already in view, so
   an IntersectionObserver would fire instantly anyway. */

@keyframes rise {
  from {
    opacity: 0;
    translate: 0 16px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 var(--accent-glow);
  }
  50% {
    box-shadow: 0 0 0 7px transparent;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__eyebrow,
  .hero__headline,
  .hero__standfirst,
  .hero__actions,
  .hero__socials,
  .hero__meta {
    animation: none;
  }

  .hero__pulse {
    animation: none;
  }
}

@media (max-width: 640px) {
  .hero__meta {
    gap: var(--space-m);
  }
}
</style>
