<script setup>
import { profile } from '@/content/site'

defineProps({
  size: { type: String, default: 'md' }, // 'md' | 'sm'
})

// Single-path icons keep this inline rather than pulling an icon dependency
// for four glyphs.
const links = [
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    path: 'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z',
    viewBox: '0 0 512 512',
  },
  {
    label: 'GitHub',
    href: profile.github,
    path: 'M256 8C119 8 8 119 8 256c0 109.6 71.1 202.6 169.7 235.4 12.4 2.3 17-5.4 17-11.9 0-5.9-.2-21.4-.3-42-69 15-83.6-33.3-83.6-33.3-11.3-28.7-27.6-36.3-27.6-36.3-22.5-15.4 1.7-15.1 1.7-15.1 24.9 1.8 38 25.6 38 25.6 22.1 37.9 58.1 27 72.3 20.6 2.2-16 8.7-27 15.8-33.2-55.1-6.3-113-27.6-113-122.6 0-27.1 9.7-49.2 25.6-66.6-2.6-6.3-11.1-31.5 2.4-65.6 0 0 20.9-6.7 68.4 25.4a237.6 237.6 0 0 1 124.6 0c47.5-32.1 68.3-25.4 68.3-25.4 13.6 34.1 5 59.3 2.5 65.6 15.9 17.4 25.5 39.5 25.5 66.6 0 95.2-58 116.2-113.2 122.4 8.9 7.7 16.8 22.9 16.8 46.1 0 33.3-.3 60.2-.3 68.4 0 6.6 4.5 14.4 17.2 11.9C432.9 458.5 504 365.5 504 256 504 119 393 8 256 8z',
    viewBox: '0 0 512 512',
  },
  {
    label: 'X',
    href: profile.x,
    path: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z',
    viewBox: '0 0 512 512',
  },
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    path: 'M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z',
    viewBox: '0 0 512 512',
  },
]
</script>

<template>
  <ul class="socials" :class="`is-${size}`">
    <li v-for="link in links" :key="link.label">
      <a
        :href="link.href"
        :aria-label="link.label"
        :target="link.href.startsWith('mailto:') ? null : '_blank'"
        :rel="link.href.startsWith('mailto:') ? null : 'noopener noreferrer'"
      >
        <svg :viewBox="link.viewBox" aria-hidden="true" focusable="false">
          <path :d="link.path" fill="currentColor" />
        </svg>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.socials {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--text-faint);
  transition:
    color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out),
    background-color var(--dur-fast) var(--ease-out);
}

svg {
  width: 17px;
  height: 17px;
}

.is-sm a {
  width: 34px;
  height: 34px;
}

.is-sm svg {
  width: 14px;
  height: 14px;
}

a:hover {
  color: var(--accent);
  border-color: var(--line-strong);
  background: var(--bg-raised);
  transform: translateY(-2px);
}
</style>
