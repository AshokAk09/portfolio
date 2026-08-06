<script setup>
import { experience } from '@/content/site'
import DraftBadge from './DraftBadge.vue'
</script>

<template>
  <section id="experience" class="section">
    <div class="shell">
      <h2 class="section-label">
        <span class="num">02</span> Experience
      </h2>

      <ol class="timeline">
        <li
          v-for="(job, i) in experience"
          :key="`${job.company}-${job.role}`"
          v-reveal="i * 90"
          class="job"
        >
          <!-- The rail dot is filled for the current role, hollow for past ones,
               so tenure is legible before any text is read. -->
          <span
            class="job__dot"
            :class="{ 'is-current': job.current }"
            aria-hidden="true"
          ></span>

          <div class="job__meta">
            <p class="job__period">
              {{ job.period }}
              <span v-if="job.current" class="job__now">Now</span>
            </p>
            <p class="job__location">{{ job.location }}</p>
          </div>

          <div class="job__main">
            <h3 class="job__role">{{ job.role }}</h3>
            <p class="job__company">{{ job.company }}</p>

            <p v-if="job.summary" class="job__summary">{{ job.summary }}</p>

            <DraftBadge v-if="job.draft">
              These bullets are placeholders. Each should name a system, a
              decision, and a measured result.
            </DraftBadge>

            <ul v-if="job.points?.length" class="job__points">
              <li v-for="(point, pi) in job.points" :key="pi">{{ point }}</li>
            </ul>

            <ul v-if="job.stack?.length" class="tags">
              <li v-for="tech in job.stack" :key="tech" class="tag">{{ tech }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.job {
  position: relative;
  display: grid;
  grid-template-columns: 12rem 1fr;
  gap: var(--space-l);
  padding-inline-start: var(--space-m);
}

/* Rail. Drawn per-item rather than as one long line so the last entry stops
   cleanly instead of trailing into whitespace. */
.job::before {
  content: '';
  position: absolute;
  inset-block-start: 0.55rem;
  inset-block-end: calc(-1 * var(--space-xl));
  inset-inline-start: 0;
  width: 1px;
  background: var(--line);
}

.job:last-child::before {
  inset-block-end: auto;
  height: 100%;
  background: linear-gradient(to bottom, var(--line), transparent);
}

.job__dot {
  position: absolute;
  inset-inline-start: -3.5px;
  inset-block-start: 0.5rem;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-pill);
  background: var(--bg);
  border: 1px solid var(--line-strong);
}

.job__dot.is-current {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-dim);
}

/* Meta column ------------------------------------------------------------- */

.job__period {
  display: flex;
  align-items: center;
  gap: 0.5em;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
  color: var(--text-dim);
}

.job__now {
  padding: 0.1rem 0.45rem;
  border-radius: var(--radius-pill);
  background: var(--accent-dim);
  border: 1px solid var(--accent-glow);
  color: var(--accent);
  letter-spacing: var(--track-wide);
}

.job__location {
  margin-block-start: var(--space-2xs);
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--text-faint);
}

/* Main column ------------------------------------------------------------- */

.job__role {
  font-family: var(--font-serif);
  font-size: var(--step-3);
  letter-spacing: -0.02em;
}

.job__company {
  margin-block-start: 0.1rem;
  font-size: var(--step-0);
  color: var(--accent);
}

.job__summary {
  margin-block-start: var(--space-s);
  max-width: var(--measure);
  color: var(--text-dim);
  line-height: 1.7;
}

.job__points {
  margin-block-start: var(--space-s);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  max-width: var(--measure);
}

.job__points li {
  position: relative;
  padding-inline-start: var(--space-s);
  color: var(--text-dim);
  line-height: 1.65;
}

.job__points li::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0.7em;
  width: 5px;
  height: 1px;
  background: var(--accent);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs);
  margin-block-start: var(--space-m);
}

.tag {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  color: var(--text-dim);
}

@media (max-width: 800px) {
  .job {
    grid-template-columns: 1fr;
    gap: var(--space-s);
  }
}
</style>
