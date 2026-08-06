<script setup>
/**
 * Deliberately loud. Its whole job is to make it impossible to deploy
 * placeholder copy by accident — see the warning in content/site.js.
 *
 * The default slot carries the generic warning; callers can pass more specific
 * instructions for the block they're guarding.
 */
</script>

<template>
  <p class="draft" role="note">
    <span class="dot" aria-hidden="true"></span>
    <strong>Draft</strong>
    <span class="detail">
      <slot>Placeholder copy — replace with real, evidenced detail before publishing.</slot>
    </span>
  </p>
</template>

<style scoped>
.draft {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: var(--space-s);
  padding: 0.55rem 0.9rem;
  border: 1px dashed var(--accent);
  border-radius: var(--radius);
  background: var(--accent-dim);
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--accent);
  line-height: 1.5;
}

.draft strong {
  font-weight: 500;
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
}

.detail {
  color: var(--text-dim);
  text-wrap: pretty;
}

.detail :deep(code) {
  color: var(--accent);
}

.dot {
  width: 6px;
  height: 6px;
  flex: none;
  border-radius: var(--radius-pill);
  background: var(--accent);
}
</style>
