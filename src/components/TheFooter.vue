<script setup>
import { profile } from '@/content/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="shell inner">
      <p class="mono">© {{ year }} {{ profile.name }}</p>

      <p class="mono built">
        Built with Vue 3 &amp; Vite ·
        <a :href="profile.github" target="_blank" rel="noopener noreferrer">
          Source
        </a>
      </p>

      <a class="top no-print" href="#top">
        Back to top
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 19V5M5 12l7-7 7 7"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding-block: var(--space-m);
}

.inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-s) var(--space-m);
  color: var(--text-faint);
}

.built a {
  color: var(--text-dim);
  border-bottom: 1px solid var(--line-strong);
  transition: color var(--dur-fast) var(--ease-out);
}

.built a:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.top {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  transition: color var(--dur-fast) var(--ease-out);
}

.top svg {
  width: 13px;
  height: 13px;
  transition: transform var(--dur-fast) var(--ease-out);
}

.top:hover {
  color: var(--accent);
}
.top:hover svg {
  transform: translateY(-2px);
}
</style>
