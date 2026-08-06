# ashokkumar-nkk.web.app

Personal portfolio — [ashokkumar-nkk.web.app](https://ashokkumar-nkk.web.app/)

Vue 3 + Vite, no runtime dependencies beyond Vue. Ships as a static bundle to
Firebase Hosting on every push to `main`.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the built output
```

Requires Node 20+.

## How it's put together

All copy lives in **`src/content/site.js`**. Nothing user-facing is hardcoded in
a component, so updating the site means editing one file.

```
index.html                  Meta tags, Open Graph, JSON-LD Person schema
src/
  content/site.js           ← every word on the site
  styles/tokens.css         Design tokens: colour, type scale, spacing, motion
  styles/base.css           Reset, layout primitives (.shell/.section), utilities
  directives/reveal.js      v-reveal — one shared IntersectionObserver
  components/
    TheNav.vue              Fixed nav, scroll-spy, mobile menu
    HeroSection.vue         Load-in animation (no observer — already in view)
    WorkSection.vue         Case studies: problem → constraint → approach → metrics
    ExperienceSection.vue   Timeline
    AboutSection.vue        Prose, portrait, skills, education, recognition
    ContactSection.vue
    TheFooter.vue
    SocialLinks.vue         Inline SVG icons
    DraftBadge.vue          Loud placeholder warning
```

### Editing content

Anything marked `draft: true` in `site.js` renders a visible **DRAFT** badge.
That's deliberate: placeholder prose reaching production reads as carelessness
to exactly the audience this site exists for.

Replace the placeholder text with real detail, then set `draft: false`.
`CONTENT-EXTRACTION-PROMPT.md` is a prompt to run inside a work repo — it
produces sanitized, evidence-based material to fill those gaps.

### Design system

One dark canvas, one warm accent (`--accent: #ffc24b`, carried over from the
original site's yellow). Resisting a second accent colour is what keeps the page
reading as considered rather than decorated. Type is a fluid `clamp()` scale
(`--step--1` … `--step-7`), so there are no breakpoint jumps.

Motion is decoration, never information — nothing is hidden behind an animation
that a `prefers-reduced-motion` user would miss.

### Images

`src/assets/ak_trans.png` is the 5.3 MB original portrait and is **not
imported**, so Vite never bundles it. The site uses `portrait-560.webp` and
`portrait-840.webp` (55 kB total), cropped to the subject.

To regenerate after replacing the source:

```bash
python3 -c "
from PIL import Image
src = Image.open('src/assets/ak_trans.png').convert('RGBA')
src = src.crop(src.getchannel('A').getbbox())
for w in (560, 840):
    im = src.copy(); im.thumbnail((w, w * 4), Image.LANCZOS)
    im.save(f'src/assets/portrait-{w}.webp', 'WEBP', quality=82, method=6)
"
```

### Résumé link

`profile.resume` in `site.js` is `null`, which hides the nav's résumé button.
Drop a PDF into `public/` and set the path to make it appear.

## Deployment

`.github/workflows/firebase-hosting-merge.yml` builds and deploys `main` to the
live channel. Pull requests get a preview channel via
`firebase-hosting-pull-request.yml`. `dist/` is generated in CI and is not
tracked in git.
