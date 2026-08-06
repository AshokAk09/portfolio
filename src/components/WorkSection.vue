<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { caseStudies } from '@/content/site'
import DraftBadge from './DraftBadge.vue'

const root = ref(null)

/**
 * Force every disclosure open for printing, then restore.
 *
 * CSS alone can't do this reliably: browsers hide a closed <details>'s content
 * through UA rules that `display: block !important` doesn't always beat, so a
 * printed copy would silently lose the substance of every case study. Toggling
 * the attribute is the only approach that works across engines.
 */
let reclose = []

function expandForPrint() {
  const panels = root.value?.querySelectorAll('details') ?? []
  reclose = [...panels].filter((d) => !d.open)
  reclose.forEach((d) => (d.open = true))
}

function restoreAfterPrint() {
  reclose.forEach((d) => (d.open = false))
  reclose = []
}

onMounted(() => {
  window.addEventListener('beforeprint', expandForPrint)
  window.addEventListener('afterprint', restoreAfterPrint)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeprint', expandForPrint)
  window.removeEventListener('afterprint', restoreAfterPrint)
})

/**
 * A metric may carry a before and an after, or only an after (a count, a size),
 * or only a before (a measurement of legacy code with no replacement figure).
 * Rendering a "→" when there is nothing on one side would imply a comparison
 * that was never made.
 */
const isDelta = (m) => Boolean(m.before) && Boolean(m.after)

/** Work that isn't live yet says so, in the tag colour that means "careful". */
const isShipped = (status) => Boolean(status) && status.startsWith('Shipped')

/**
 * Rough count of what's hidden, so the toggle can promise something specific.
 * "Problem, 7 decisions, verification" earns a click; "Read more" doesn't.
 */
function detailSummary(study) {
  const parts = []
  if (study.problem) parts.push('problem')
  if (study.constraint) parts.push('constraints')
  const n = study.decisions?.length
  if (n) parts.push(`${n} decision${n > 1 ? 's' : ''}`)
  if (study.correctness) parts.push('verification')
  return parts.join(' · ')
}
</script>

<template>
  <section id="work" ref="root" class="section">
    <div class="shell">
      <h2 class="section-label"><span class="num">01</span> Selected work</h2>

      <p v-reveal class="lede work__lede">
        Six pieces of work, summarised. Each expands into the full engineering —
        what was breaking, why the obvious fix was wrong, and the decisions with
        their costs. Every number says how it was measured.
      </p>

      <ol class="work__list">
        <li v-for="study in caseStudies" :key="study.id" v-reveal class="study">
          <header class="study__head">
            <div class="study__meta">
              <span class="study__index" aria-hidden="true">{{ study.index }}</span>
              <span
                v-if="study.status"
                class="status"
                :class="isShipped(study.status) ? 'is-shipped' : 'is-wip'"
              >
                {{ study.status }}
              </span>
            </div>

            <h3 class="study__title">{{ study.title }}</h3>
            <p class="study__oneliner">{{ study.oneLiner }}</p>
          </header>

          <DraftBadge v-if="study.draft">
            This case study is still a skeleton. Replace the problem,
            constraint, approach, decisions and metrics with the real thing —
            then set <code>draft: false</code> in
            <code>src/content/site.js</code>.
          </DraftBadge>

          <!-- Metrics stay above the fold of the card. They're the reason to
               keep reading, and each number keeps its provenance so a skimmer
               can never take it for a production percentile. -->
          <dl v-if="study.metrics?.length" class="metrics">
            <div v-for="(m, mi) in study.metrics" :key="mi" class="metric">
              <dt>{{ m.label }}</dt>
              <dd>
                <template v-if="isDelta(m)">
                  <span class="metric__before">{{ m.before }}</span>
                  <span class="metric__arrow" aria-hidden="true">→</span>
                  <span class="metric__after">{{ m.after }}</span>
                </template>
                <span v-else-if="m.after" class="metric__after">{{ m.after }}</span>
                <span v-else class="metric__before-only">{{ m.before }}</span>
              </dd>
              <p v-if="m.note" class="metric__note">{{ m.note }}</p>
            </div>
          </dl>

          <ul v-if="study.stack?.length" class="tags">
            <li v-for="tech in study.stack" :key="tech" class="tag">{{ tech }}</li>
          </ul>

          <!-- Everything below is opt-in. Native <details> rather than a Vue
               toggle: keyboard and screen-reader behaviour comes free, and it
               still works if the JS bundle fails. -->
          <details class="deep">
            <summary class="deep__toggle">
              <span class="deep__label">Read the engineering</span>
              <span class="deep__hint">{{ detailSummary(study) }}</span>
              <svg class="deep__chevron" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M4 6.5 8 10.5l4-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </summary>

            <div class="deep__inner">
              <div class="study__body">
                <div class="study__block">
                  <h4 class="study__label">The problem</h4>
                  <p>{{ study.problem }}</p>
                </div>

                <div v-if="study.constraint" class="study__block">
                  <h4 class="study__label">Why the obvious fix was wrong</h4>
                  <p>{{ study.constraint }}</p>
                </div>

                <div class="study__block">
                  <h4 class="study__label">The approach</h4>
                  <p>{{ study.approach }}</p>
                </div>
              </div>

              <!-- Decisions: the choice and the road not taken. Naming the cost
                   is what makes the claim credible to a senior interviewer. -->
              <div v-if="study.decisions?.length" class="study__decisions">
                <h4 class="study__label">Decisions</h4>
                <ul>
                  <li v-for="(d, di) in study.decisions" :key="di" class="decision">
                    <p class="decision__choice">
                      {{ d.choice }}
                      <span v-if="d.alternative" class="decision__over">
                        over {{ d.alternative }}
                      </span>
                    </p>
                    <p v-if="d.rationale" class="decision__line">
                      <span class="decision__key">Why</span>{{ d.rationale }}
                    </p>
                    <p v-if="d.tradeoff" class="decision__line">
                      <span class="decision__key">Cost</span>{{ d.tradeoff }}
                    </p>
                  </li>
                </ul>
              </div>

              <div v-if="study.correctness || study.myRole" class="study__footnotes">
                <div v-if="study.correctness" class="study__block">
                  <h4 class="study__label">How it was verified</h4>
                  <p>{{ study.correctness }}</p>
                </div>
                <div v-if="study.myRole" class="study__block">
                  <h4 class="study__label">My part in it</h4>
                  <p>{{ study.myRole }}</p>
                </div>
              </div>
            </div>
          </details>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.work__lede {
  margin-block-end: var(--space-xl);
}

.work__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

.study {
  padding: var(--space-l);
  background: var(--bg-raised);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  transition:
    border-color var(--dur) var(--ease-out),
    background var(--dur) var(--ease-out);
}

.study:hover {
  border-color: var(--line-strong);
  background: var(--bg-inset);
}

/* Head -------------------------------------------------------------------- */

.study__meta {
  display: flex;
  align-items: center;
  gap: var(--space-s);
  margin-block-end: var(--space-s);
}

.study__index {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--accent);
}

.status {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-pill);
  border: 1px solid;
}

.status.is-shipped {
  color: #6ee7a8;
  border-color: rgba(110, 231, 168, 0.28);
  background: rgba(110, 231, 168, 0.08);
}

/* Not-yet-merged work is marked in the accent rather than green. Being straight
   about this is worth more in an interview than the extra credit. */
.status.is-wip {
  color: var(--accent);
  border-color: var(--accent-glow);
  background: var(--accent-dim);
}

.study__title {
  font-family: var(--font-serif);
  font-size: var(--step-4);
  letter-spacing: -0.02em;
  max-width: 34ch;
}

.study__oneliner {
  margin-block-start: var(--space-xs);
  font-size: var(--step-1);
  line-height: 1.55;
  color: var(--text-dim);
  max-width: var(--measure);
}

/* Metrics ----------------------------------------------------------------- */

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: var(--space-s);
  margin-block-start: var(--space-m);
}

.metric {
  padding: var(--space-s);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg);
}

.metric dt {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
  color: var(--text-faint);
}

.metric dd {
  margin: var(--space-2xs) 0 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4em;
  font-family: var(--font-mono);
  font-size: var(--step-1);
  line-height: 1.35;
}

.metric__before {
  color: var(--text-faint);
  text-decoration: line-through;
  text-decoration-color: var(--line-strong);
}

.metric__before-only {
  color: var(--text-dim);
}

.metric__arrow {
  color: var(--text-faint);
  font-size: var(--step--1);
}

.metric__after {
  color: var(--accent);
  font-weight: 500;
}

/* The provenance line. Small, but it is the difference between a number a
   reader trusts and one they discount. */
.metric__note {
  margin-block-start: var(--space-2xs);
  font-size: var(--step--1);
  line-height: 1.5;
  color: var(--text-faint);
  text-wrap: pretty;
}

/* Tags -------------------------------------------------------------------- */

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

/* Disclosure -------------------------------------------------------------- */

.deep {
  margin-block-start: var(--space-m);
  border-block-start: 1px solid var(--line);
}

.deep__toggle {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding-block: var(--space-s);
  cursor: pointer;
  list-style: none;
  color: var(--text-dim);
  transition: color var(--dur-fast) var(--ease-out);
}

/* Suppress both marker implementations, then supply our own chevron. */
.deep__toggle::-webkit-details-marker {
  display: none;
}

.deep__toggle::marker {
  content: '';
}

.deep__toggle:hover {
  color: var(--accent);
}

.deep__label {
  font-size: var(--step-0);
  font-weight: 500;
}

.deep__hint {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--text-faint);
  /* On narrow screens the label alone is enough. */
  display: none;
}

.deep__chevron {
  width: 15px;
  height: 15px;
  margin-inline-start: auto;
  flex: none;
  transition: rotate var(--dur) var(--ease-out);
}

.deep[open] .deep__toggle {
  color: var(--accent);
}

.deep[open] .deep__chevron {
  rotate: 180deg;
}

/* Fade the revealed block in. Height can't be animated on <details> without
   interpolate-size, and a jump plus a fade reads fine. */
.deep__inner {
  padding-block-end: var(--space-s);
  animation: deep-in var(--dur) var(--ease-out) both;
}

@keyframes deep-in {
  from {
    opacity: 0;
    translate: 0 -4px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .deep__inner {
    animation: none;
  }

  .deep__chevron {
    transition: none;
  }
}

@media (min-width: 560px) {
  .deep__hint {
    display: inline;
  }
}

/* Body -------------------------------------------------------------------- */

.study__body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-m);
}

.study__label {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  font-weight: 500;
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
  color: var(--text-faint);
  margin-block-end: var(--space-2xs);
}

.study__block p {
  color: var(--text-dim);
  font-size: var(--step-0);
  line-height: 1.7;
}

/* Decisions --------------------------------------------------------------- */

.study__decisions {
  margin-block-start: var(--space-l);
}

.study__decisions ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.decision {
  padding-inline-start: var(--space-s);
  border-inline-start: 2px solid var(--accent-glow);
  max-width: var(--measure);
}

.decision__choice {
  color: var(--text);
  font-weight: 500;
  line-height: 1.5;
}

.decision__over {
  color: var(--text-faint);
  font-weight: 400;
}

.decision__line {
  margin-block-start: 0.25rem;
  font-size: var(--step--1);
  color: var(--text-dim);
  line-height: 1.65;
}

.decision__key {
  display: inline-block;
  min-width: 3.4em;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: var(--track-wide);
  color: var(--text-faint);
}

/* Footnotes --------------------------------------------------------------- */

.study__footnotes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-m);
  margin-block-start: var(--space-l);
  padding-block-start: var(--space-m);
  border-block-start: 1px solid var(--line);
}

code {
  font-family: var(--font-mono);
  font-size: 0.95em;
  color: var(--accent);
}

@media (max-width: 640px) {
  .study {
    padding: var(--space-m) var(--space-s);
  }
}

/* Print: the panels are forced open by the beforeprint handler above, so the
   only thing left is to drop the now-meaningless toggle. */
@media print {
  .deep__inner {
    animation: none;
  }

  .deep__toggle {
    display: none;
  }

  .deep {
    border-block-start: none;
  }
}
</style>
