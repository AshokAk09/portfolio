# Portfolio content extraction prompt

Paste everything inside the fence below into Claude Code running at the root of
your **office project repo**. It produces a sanitized JSON block that drops
straight into `src/content/site.js` in this portfolio repo.

Run it once per product/repo you've worked on. Read the "Open questions"
section it returns and answer those before publishing anything.

---

````text
You are helping me extract material for my personal portfolio website from this
work repository. I am a full-stack engineer; I want an accurate, evidence-based
account of what I actually built here, written so a hiring manager who knows
nothing about this product can understand the engineering.

## Absolute rules — read these first

1. NEVER invent a number. Not a latency figure, not a row count, not a
   percentage, not a user count. If a metric is not present in the repo
   (code, comments, tests, benchmarks, commit messages, config, dashboards
   checked into the repo, migration files), you do not have it. Put it in
   "Open questions" for me to measure or look up. A portfolio with one real
   number beats one with ten invented ones, and a fabricated metric that comes
   up in an interview is unrecoverable.
2. This is proprietary employer code. Everything you output must be safe to
   publish on a public website:
   - No source code, no snippets, no file paths, no function or class names.
   - No internal hostnames, service names, endpoints, repo names, ticket IDs,
     or dashboard URLs.
   - No customer names, tenant names, or any data that could identify one.
   - No credentials, keys, or config values, even placeholder-looking ones.
   - Describe systems generically: "a multi-tenant publishing product",
     "the document-listing API", "a relational store". Where a specific
     internal name is unavoidable for the story, replace it with a generic
     role noun and note the substitution.
   - If you are unsure whether something is safe to publish, leave it out and
     list it under "Open questions".
3. Distinguish what I did from what the team did. Use the authorship evidence
   below. If a change was collaborative, say so — "contributed to" is credible,
   "built" for someone else's work is not.

## How to investigate

Identify my commits first. My author identity is my work email address, or a
name matching mine. Confirm which identities exist with:

    git log --format='%ae' | sort | uniq -c | sort -rn | head -30

Then work through, adapting paths to this repo's layout:

    # My work, newest first, with the files touched
    git log --author='<my email>' --stat --date=short \
        --pretty=format:'%h %ad %s' | head -300

    # Where I've concentrated — the subsystems I likely own
    git log --author='<my email>' --name-only --pretty=format: \
        | grep -v '^$' | sort | uniq -c | sort -rn | head -40

    # Substantial changes, not typo fixes
    git log --author='<my email>' --shortstat --pretty=format:'%h %s' \
        | paste - - | sort -k2 -rn | head -40

    # Anything pagination/scaling related, whoever wrote it
    git log --oneline --all -i --grep='paginat\|cursor\|offset\|scal\|perf\|
        latency\|slow quer\|index\|batch\|throttl\|cache\|N+1\|timeout'

Then read the actual code I touched most, so the description reflects the
design and not just the commit subjects. Also check for evidence of impact:
benchmark files, load-test scripts, performance tests, migration files that
add indexes, before/after notes in commit bodies or PR descriptions, ADRs,
design docs, README/CHANGELOG entries, and any committed dashboard configs
or SLO definitions.

## What to produce for each piece of work

Prioritize the pagination and scaling work — that's the strongest material —
then other substantial contributions. For each, establish:

- **The problem.** What was actually breaking or limiting, in user-visible
  terms. Not "we needed pagination" but what failed without it: timeouts on
  large accounts, unbounded memory on the response path, the UI hanging past
  N records. Find the evidence for this in the repo.
- **Why it was hard.** The constraint that made the obvious solution wrong.
  This is the part that signals engineering judgment.
- **What I designed and built.** The approach, at architecture level.
- **The key decision and its trade-off.** For pagination specifically, be
  precise about which of these applies and why it was chosen over the
  alternative: offset/limit vs. keyset/cursor; stable sort key and tie-breaker
  choice; how deep-page cost was handled; consistency under concurrent writes;
  whether total counts are exact, estimated, or omitted, and what that cost;
  index changes required; how the page size ceiling was picked; cursor opacity
  and encoding; backward compatibility for existing API consumers.
- **How correctness was ensured.** Tests, backfill/migration strategy,
  rollout, feature flags, monitoring added.
- **Metrics.** Only ones evidenced in the repo. Candidates worth hunting for:
  p95/p99 latency before and after, worst-case page depth, rows scanned per
  request, query count per request (N+1 elimination), peak memory per request,
  payload size, timeout/error rate, largest tenant or dataset size the system
  now handles, throughput. For each metric you find, record where you found it
  so I can verify.

## Output format

Return exactly two things.

**1. A JSON block** matching this schema. Omit any field you have no evidence
for rather than filling it with something plausible.

```json
{
  "role": {
    "company": "",
    "product": "",
    "title": "",
    "start": "YYYY-MM",
    "end": "YYYY-MM | present",
    "summary": "2-3 sentences. What the product is, generically, and what I own on it.",
    "stack": []
  },
  "caseStudies": [
    {
      "id": "kebab-case-slug",
      "title": "Outcome-shaped, e.g. 'Constant-time pagination for unbounded document sets'",
      "oneLiner": "One sentence a non-specialist understands.",
      "problem": "",
      "constraint": "Why the obvious approach didn't work.",
      "approach": "",
      "decisions": [
        { "choice": "", "alternative": "", "rationale": "", "tradeoff": "" }
      ],
      "correctness": "Testing, migration, rollout.",
      "metrics": [
        { "label": "", "before": "", "after": "", "source": "where in the repo this came from" }
      ],
      "stack": [],
      "myRole": "What I did vs. what the team did.",
      "confidence": "high | medium | low — how well the repo supports this account"
    }
  ],
  "skillsEvidenced": [
    { "skill": "", "evidence": "The specific work that demonstrates it, sanitized." }
  ]
}
```

**2. An "Open questions" list** — everything you could not establish from the
repo, phrased as specific questions I can answer or go measure. Especially:
every metric slot you left empty, every place you were unsure about
confidentiality, and every case where you couldn't tell how much of the work
was mine. Rank them by how much each would strengthen the portfolio, so I know
what to chase first.

Do not write the portfolio copy itself — I'll do the voice. Give me accurate,
sanitized raw material.
````

---

## After you run it

1. Answer the "Open questions" — the metrics are what make this land. If a
   number isn't recorded anywhere, it's usually still measurable: run the query
   against a staging dataset, or check your APM/monitoring for the endpoint's
   p95 before and after your change date.
2. Sanity-check the sanitization yourself before anything goes public. The
   model is cautious but it is not your employer's legal team.
3. If in doubt about what's publishable, the safe framing is the *shape* of the
   problem and your reasoning — "cursor-based pagination over a multi-tenant
   dataset, chosen over offset because deep pages scanned linearly" — with no
   product specifics at all. That still demonstrates the engineering.
4. Paste the JSON into `src/content/site.js` in this repo.
