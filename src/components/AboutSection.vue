<script setup>
import { about, education, extras, skills } from '@/content/site'

/**
 * Derived from ak_trans.png (2109×3456, 5.3 MB) — cropped to the subject and
 * re-encoded as WebP at two widths, which is 55 kB instead of 5.3 MB. The
 * original stays in assets/ as the source but is deliberately not imported,
 * so Vite never bundles it.
 */
import portrait560 from '@/assets/portrait-560.webp'
import portrait840 from '@/assets/portrait-840.webp'

// Flatten the three "extras" lists into one honest recognition column rather
// than giving each its own near-empty heading.
const recognition = [
  ...extras.publications.map((p) => ({
    title: p.title,
    detail: p.note,
    year: p.year || '',
  })),
  ...extras.awards.map((a) => ({
    title: a.title,
    detail: a.issuer,
    year: a.year || '',
  })),
  ...extras.certifications.map((c) => ({
    title: c.title,
    detail: c.issuer,
    year: c.year || '',
  })),
]
</script>

<template>
  <section id="about" class="section">
    <div class="shell">
      <h2 class="section-label">
        <span class="num">03</span> About
      </h2>

      <div class="about">
        <div v-reveal class="about__prose">
          <p v-for="(para, i) in about.paragraphs" :key="i">{{ para }}</p>
        </div>

        <aside v-reveal="120" class="about__side">
          <img
            class="about__portrait"
            :src="portrait840"
            :srcset="`${portrait560} 560w, ${portrait840} 840w`"
            sizes="(max-width: 560px) 240px, (max-width: 900px) 200px, 420px"
            alt="Portrait of Ashokkumar N K K"
            width="840"
            height="1395"
            loading="lazy"
            decoding="async"
          />

          <dl class="facts">
            <div v-for="fact in about.facts" :key="fact.label" class="fact">
              <dt>{{ fact.label }}</dt>
              <dd>{{ fact.value }}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <!-- Skills ---------------------------------------------------------- -->
      <div id="skills" class="skills">
        <h3 v-reveal class="sub-label">Skills</h3>
        <div class="skills__grid">
          <div
            v-for="(group, i) in skills"
            :key="group.group"
            v-reveal="i * 70"
            class="skill-group"
          >
            <h4 class="skill-group__name">{{ group.group }}</h4>
            <ul>
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Education & recognition ----------------------------------------- -->
      <div class="credentials">
        <div v-reveal class="credentials__col">
          <h3 class="sub-label">Education</h3>
          <ul class="entries">
            <li v-for="ed in education" :key="ed.institution" class="entry">
              <p class="entry__title">{{ ed.institution }}</p>
              <p class="entry__detail">{{ ed.credential }}</p>
              <p class="entry__meta">{{ ed.period }} · {{ ed.location }}</p>
            </li>
          </ul>
        </div>

        <div v-reveal="120" class="credentials__col">
          <h3 class="sub-label">Recognition</h3>
          <ul class="entries">
            <li v-for="item in recognition" :key="item.title" class="entry">
              <p class="entry__title">{{ item.title }}</p>
              <p class="entry__detail">
                {{ item.detail }}<template v-if="item.year"> · {{ item.year }}</template>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: var(--space-2xl);
  align-items: start;
}

.about__prose {
  max-width: var(--measure);
  font-size: var(--step-1);
  line-height: 1.75;
  color: var(--text-dim);
}

.about__prose p + p {
  margin-block-start: var(--space-m);
}

/* The opening paragraph gets a drop-cap-adjacent treatment: larger, brighter.
   It carries the most weight, so it earns the emphasis. */
.about__prose p:first-child {
  color: var(--text);
  font-size: var(--step-2);
  line-height: 1.55;
  letter-spacing: -0.015em;
}

/* Side column ------------------------------------------------------------- */

.about__side {
  position: sticky;
  inset-block-start: calc(var(--nav-h) + var(--space-m));
}

.about__portrait {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  background: linear-gradient(160deg, var(--bg-inset), var(--bg-raised));
  border: 1px solid var(--line);
  /* The source PNG is a cut-out on transparency; a slight desaturation keeps it
     from fighting the amber accent. */
  filter: grayscale(0.25) contrast(1.05);
  object-fit: cover;
}

.facts {
  margin-block-start: var(--space-m);
  display: grid;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}

.fact {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-s);
  padding: var(--space-xs) var(--space-s);
  background: var(--bg-raised);
}

.fact dt {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
  color: var(--text-faint);
}

.fact dd {
  margin: 0;
  font-size: var(--step-0);
  color: var(--text);
  text-align: end;
}

/* Shared sub-heading ------------------------------------------------------ */

.sub-label {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  font-weight: 500;
  letter-spacing: var(--track-widest);
  text-transform: uppercase;
  color: var(--text-faint);
  padding-block-end: var(--space-xs);
  border-block-end: 1px solid var(--line);
  margin-block-end: var(--space-m);
}

/* Skills ------------------------------------------------------------------ */

.skills {
  margin-block-start: var(--space-2xl);
  scroll-margin-block-start: calc(var(--nav-h) + var(--space-m));
}

.skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: var(--space-m);
}

.skill-group__name {
  font-family: var(--font-serif);
  font-size: var(--step-2);
  color: var(--text);
  margin-block-end: var(--space-xs);
}

.skill-group ul {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.skill-group li {
  font-size: var(--step-0);
  color: var(--text-dim);
  padding-inline-start: var(--space-s);
  position: relative;
}

.skill-group li::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0.72em;
  width: 4px;
  height: 4px;
  border-radius: var(--radius-pill);
  background: var(--accent);
  opacity: 0.5;
}

/* Credentials ------------------------------------------------------------- */

.credentials {
  margin-block-start: var(--space-2xl);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-xl);
}

.entries {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

.entry__title {
  color: var(--text);
  font-size: var(--step-1);
  line-height: 1.4;
}

.entry__detail {
  margin-block-start: 0.15rem;
  color: var(--text-dim);
  font-size: var(--step-0);
}

.entry__meta {
  margin-block-start: 0.15rem;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--text-faint);
}

@media (max-width: 900px) {
  .about {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .about__side {
    position: static;
    display: grid;
    grid-template-columns: minmax(0, 200px) minmax(0, 1fr);
    gap: var(--space-m);
    align-items: start;
  }
}

@media (max-width: 560px) {
  .about__side {
    grid-template-columns: 1fr;
  }

  .about__portrait {
    max-width: 240px;
  }
}
</style>
