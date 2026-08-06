<script setup>
import TheNav from './components/TheNav.vue'
import HeroSection from './components/HeroSection.vue'
import WorkSection from './components/WorkSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <a class="skip-link" href="#work">Skip to content</a>

  <!-- Film grain. Large flat dark areas band badly on cheap panels; a touch
       of noise breaks the gradient up and reads as texture rather than dirt. -->
  <div class="grain" aria-hidden="true"></div>

  <TheNav />

  <main id="main">
    <HeroSection />
    <WorkSection />
    <ExperienceSection />
    <AboutSection />
    <ContactSection />
  </main>

  <TheFooter />
</template>

<style scoped>
.grain {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@media print {
  .grain {
    display: none;
  }
}
</style>
