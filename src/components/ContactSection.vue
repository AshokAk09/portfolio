<script setup>
import { contact, profile } from '@/content/site'
import SocialLinks from './SocialLinks.vue'
</script>

<template>
  <section id="contact" class="section contact">
    <div class="shell">
      <h2 class="section-label" v-reveal>
        <span class="num">04</span> Contact
      </h2>

      <p class="heading" v-reveal="60">{{ contact.heading }}</p>
      <p class="lede body" v-reveal="120">{{ contact.body }}</p>

      <a class="email" :href="`mailto:${profile.email}`" v-reveal="180">
        <span class="text">{{ profile.email }}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 17 17 7M9 7h8v8"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>

      <div class="foot" v-reveal="240">
        <SocialLinks />
        <p class="mono availability">
          <span class="dot" aria-hidden="true"></span>
          Based in {{ profile.location }} · open to remote
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  border-top: 1px solid var(--line);
}

.heading {
  font-size: var(--step-5);
  line-height: 1.05;
  letter-spacing: var(--track-tight);
  max-width: 18ch;
}

.body {
  margin-top: var(--space-m);
}

/* Email ------------------------------------------------------------------ */

.email {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  margin-top: var(--space-xl);
  font-size: clamp(1.4rem, 1rem + 2.4vw, 2.6rem);
  letter-spacing: var(--track-tight);
  color: var(--text);
  /* Break rather than overflow on narrow phones */
  overflow-wrap: anywhere;
  transition: color var(--dur) var(--ease-out);
}

/* Underline drawn as a background so it can animate independently of the
   text colour and survive the line wrapping. */
.email .text {
  background-image: linear-gradient(var(--accent), var(--accent));
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 0% 1px;
  transition: background-size var(--dur) var(--ease-out);
  padding-bottom: 0.12em;
}

.email svg {
  width: 0.7em;
  height: 0.7em;
  flex: none;
  transition: transform var(--dur) var(--ease-out);
}

.email:hover {
  color: var(--accent);
}

.email:hover .text {
  background-size: 100% 1px;
}

.email:hover svg {
  transform: translate(3px, -3px);
}

/* Foot ------------------------------------------------------------------- */

.foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-m);
  margin-top: var(--space-xl);
  padding-top: var(--space-m);
  border-top: 1px solid var(--line);
}

.availability {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-faint);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-pill);
  background: #4ade80;
}
</style>
