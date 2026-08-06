/**
 * Single source of truth for everything the site renders.
 *
 * Edit this file; never edit copy inside components.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  Content provenance & honesty rules — please keep these.
 *
 *  Transposed from src/content/json.json, the sanitized extraction output.
 *  Three rules follow from how that material was produced:
 *
 *  1. `metrics[].note` records what kind of measurement each number is. A
 *     single observation on an internal test tenant is NOT a production p95.
 *     It is still a legitimate, impressive number — but it must be labelled,
 *     because the first competent interviewer asks "measured how?" and the
 *     right answer is a confident one.
 *  2. `status` separates shipped work from designed-but-unmerged work. Do not
 *     quietly promote the second to the first. When the architecture standard
 *     and the N+1 query merge, update `status` then.
 *  3. The domain is described abstractly — a two-level parent/child hierarchy —
 *     and the product is deliberately not named. No internal identifiers,
 *     service names or file paths appear anywhere. Keep it that way; the
 *     engineering reads just as strongly without them.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: 'Ashokkumar N K K',
  shortName: 'Ashokkumar',
  initials: 'AK',
  title: 'Full-stack Engineer',
  role: 'Member of Technical Staff',
  // The employer is named — it's on your résumé and LinkedIn already. The
  // product it sells is not. That's the line this site draws.
  company: 'Zoho Corporation',
  location: 'Chennai, Tamil Nadu',
  // Used to compute years of experience so the site never goes stale.
  careerStart: '2022-03',

  email: 'nkkashokkumar007@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ashokkumar-nkk',
  github: 'https://github.com/AshokAk09',
  x: 'https://x.com/Ak_Aananth',
  instagram: 'https://www.instagram.com/ashok_aananth/',

  // Drop an up-to-date PDF at public/ashokkumar-resume.pdf. The nav link
  // hides itself automatically while this is null.
  resume: null,
}

/** Hero — the first twelve words decide whether anyone scrolls. */
export const hero = {
  // Rendered as: "<lead> <accent> <trail>"
  // Deliberately the arc, not the specialty: ~4 years of front-end work and a
  // move down the stack. Framing the headline around scale alone would let one
  // recent project stand in for the whole record.
  lead: 'I build interfaces —',
  accent: 'and the systems',
  trail: 'that hold them up.',
  standfirst: `Full-stack engineer at Zoho. Most of my work is the front end of a
    multi-tenant B2B platform; more recently it's been the read path underneath
    it — pagination, query shape, and the failure modes that don't throw. The
    last one was a request that made the product stall on large tenants: 6.2 MB
    and 8.1 seconds, down to 2 KB and 86 ms.`,
}

export const about = {
  paragraphs: [
    `I joined Zoho in 2022 as a project trainee and stayed. For the first stretch
     I worked entirely on the front end, and most of my work is still there —
     enough of the client that I know where its awkward corners are.`,
    `The more interesting problems turned out to be underneath. The data model is
     a two-level hierarchy: each tenant owns a set of parent records, and each
     parent owns anywhere from one to several thousand children. Serving a small
     tenant is trivial. Then a tenant an order of magnitude larger than any
     existing one arrived — ~4,000 child records across ~100 parents — and
     exposed that the client downloaded the entire hierarchy before it could
     render anything, then did it again on every selection surface. Nothing
     errored. The UI just stalled.`,
    `Fixing it properly meant auditing all 29 consumers of the shared store
     before touching anything, because the obvious fix — paginate the existing
     endpoint — would have turned lookup failures into silently empty UI rather
     than errors. That is the work I want more of: the boundary where a
     front-end constraint and a database constraint have to be reconciled and
     somebody has to decide which one gives.`,
  ],
  facts: [
    { label: 'Based in', value: 'Chennai, India' },
    { label: 'Currently', value: 'MTS at Zoho' },
    { label: 'Focus', value: 'Read paths at scale' },
    { label: 'Open to', value: 'Full-stack roles' },
  ],
}

export const experience = [
  {
    company: 'Zoho Corporation',
    role: 'Member of Technical Staff',
    period: 'May 2022 — Present',
    location: 'Chennai, IN',
    current: true,
    summary: `Front-end work on a multi-tenant B2B SaaS web client, with a growing
      share of backend work over the last two years. Since early 2026 I've been
      working on making the product hold up at large tenant sizes, and wrote the
      architecture standard new API versions follow.`,
    points: [
      "Most of my work is in the web client — around 710 of its ~1,300 commits.",
      'Worked on the scaling effort from early 2026: cut the heaviest client request from 6.2 MB / 8.1 s to 2 KB / 86 ms on a 4,226-record test tenant, by splitting one over-serving API into a layered, paginated data model.',
      "Wrote the architecture standard for new backend API versions — a three-layer domain split, typed request objects, and a throw-don't-swallow error policy in place of 199 blocks that logged an exception and returned an empty object.",
      'Built a cross-collection ranked analytics view end to end: aggregate scoring queries, a seeded configuration migration, a backfill across existing and tenant-defined custom roles, tier gating, export, and translated strings.',
      'Extended the backend to 30 locales, including locale resolution outside a request context so scheduled jobs and outbound email resolve language from user preference and tenant default.',
      'Made automated outbound actions durable across third-party outages by moving retries into the scheduled-task layer and separating retryable transport failures from permanent rejections.',
    ],
    stack: [
      'Vue 2',
      'Vuex',
      'JavaScript',
      'Java 17',
      'JAX-RS / Jersey',
      'SQL',
      'Tomcat',
      'Ant',
    ],
    draft: false,
  },
  {
    company: 'Zoho Corporation',
    role: 'Project Trainee',
    period: 'Mar 2022 — Apr 2022',
    location: 'Chennai, IN',
    current: false,
    summary: `Two-month trainee programme; converted to full-time engineering
      staff at the end of it.`,
    points: [],
    stack: ['JavaScript', 'HTML', 'CSS'],
    draft: false,
  },
]

/**
 * Case studies, strongest first.
 *
 * `status` is load-bearing — it separates live work from designed work.
 * `metrics[].note` carries the provenance of each number.
 */
export const caseStudies = [
  {
    id: 'layered-pagination-for-unbounded-collections',
    index: '01',
    status: 'Shipped — migrations ongoing',
    title: 'Cutting a multi-megabyte client bootstrap to kilobytes',
    oneLiner:
      'The app downloaded every record a tenant owned before it could render anything. I replaced that with layered APIs that fetch only what each screen needs, a page at a time.',
    problem: `A tenant an order of magnitude larger than any existing one was
      being onboarded — roughly 4,000 child records spread unevenly across ~100
      parent records. The client loaded the entire parent-to-child hierarchy into
      a single shared store at application boot, and again on every selection
      surface. Measured on a test tenant of 21 parent / 4,226 child records, that
      request was 6.2 MB and took 8.1 seconds. The response carried ~33 fields
      per child while every consumer used four to eight. Five selection
      components then deep-cloned the whole structure two to five times each to
      avoid mutating shared state; one re-cloned it on every search keystroke.
      Nothing errored — the UI simply stalled, and would degrade further as
      tenants grew.`,
    constraint: `Paginating the existing endpoint was the obvious move and was
      wrong for three reasons. Twenty-nine components read the same shared store,
      several building id-to-object lookup maps; serving them one page would make
      lookups silently return nothing rather than fail — broken UI with no error
      raised. The problem is also two-dimensional: paginating the outer
      collection does not paginate the children nested inside each element, so a
      single page could still carry tens of thousands of objects. And seven call
      sites used a full re-fetch as a generic "refresh everything" after any
      create, delete, rename or move; under pagination that silently becomes
      "refresh page one and discard the rest". Separately, the product's bulk
      select-all affordance is structurally incompatible with pagination, because
      a client cannot enumerate ids for rows it has never fetched.`,
    approach: `I audited all 29 consumers of the shared store and classified them
      into five usage patterns — count and existence checks, full iteration,
      lookup-map construction, selection surfaces needing nested children, and
      post-mutation refresh — then showed all five collapse into two independent
      data flows. That became a layered model: a small always-loaded summary
      layer of four fields per parent serving the ~24 consumers that only need
      names, counts and existence; a paginated list endpoint for the list screen,
      which was already isolated from the shared store; a lazily fetched,
      paginated, server-searched per-parent child endpoint for selection
      surfaces; and full detail loaded only on navigation into a specific record.
      On the client I built a three-layer reusable selector: an inner list
      component owning one parent's data, fetch, pagination, infinite scroll and
      search; a dual-pane engine owning cross-collection selection state and
      every selection affordance; and an optional wrapper adding picker chrome.
      Data sources are injected as functions and row rendering is delegated to
      slots, so one engine serves five previously independent screens instead of
      each reimplementing pagination. On the backend I designed a shared
      pagination input object that parses, validates and caps page parameters
      identically for every new list endpoint, so paging semantics cannot drift
      per endpoint.`,
    decisions: [
      {
        choice:
          'Offset pagination with a 1-based page token, bounded by a hard product ceiling on collection size',
        alternative: 'Keyset / cursor pagination with an opaque encoded cursor',
        rationale:
          'The existing API contract, its mobile consumers, and every already-shipped paginated endpoint used numeric page tokens with legacy parameter aliases. Cursors would fork the contract for no benefit at the real bound: total page depth is capped by a product-level ceiling, so worst-case offset is small and bounded rather than unbounded.',
        tradeoff:
          'Deep pages cost more than a cursor would, and rows can be skipped or repeated if the underlying set mutates mid-session. Accepted because depth is bounded by design and the data changes slowly relative to a paging session.',
      },
      {
        choice:
          'An explicit unique-column tie-breaker as secondary sort on every paginated ranking query',
        alternative: 'Leaving the single business sort column as the only ordering',
        rationale:
          'Several ranked views sort on values with heavy ties. With offset pagination and a non-unique sort key, the database may order tied rows differently between two queries, so the same row appears on two consecutive pages while another is never shown at all. Appending a unique identifier as the final sort column makes the total order deterministic.',
        tradeoff:
          'One extra sort column per query; the tie-break order is arbitrary to a user but stable, which is what pagination correctness requires.',
      },
      {
        choice:
          'Signal "more pages exist" by fetching one row beyond the page size; return no total count',
        alternative: 'A companion COUNT query returning an exact total',
        rationale:
          'The UI needs "is there more to scroll", not "how many in total". Peek-ahead costs one row; an exact count costs a second full aggregate on every page request.',
        tradeoff:
          'Clients cannot render "page 3 of 47" or an exact result count. Consumers that genuinely needed totals were served by a separate lightweight counts endpoint.',
      },
      {
        choice:
          'No pagination on the slim summary endpoint for first-party clients; a hard ceiling on collection size instead',
        alternative: 'Paginating the summary endpoint too, for uniformity',
        rationale:
          'At the capped maximum the entire summary payload is a few hundred kilobytes — small enough that pagination would push partial-data handling into two dozen components in exchange for nothing.',
        tradeoff:
          'The ceiling becomes a real product constraint to enforce and communicate, and the client must treat "exactly at the cap" as unknown rather than exact.',
      },
      {
        choice:
          'Bulk selection sends a server-resolved select-all flag rather than an enumerated id list',
        alternative:
          'Background-fetching every page so the client can enumerate ids before submitting',
        rationale:
          'A paginating client structurally cannot know ids it has not fetched, and background-fetching everything reintroduces exactly the payload problem being solved. Resolving the set server-side at write time keeps the write constant-size on the wire regardless of collection size.',
        tradeoff:
          'The selection payload becomes polymorphic — one shape carries ids, the other carries a flag and none — so every counter, gate and diff on both sides must handle the id-less case. This proved a recurring source of silent bugs.',
      },
      {
        choice:
          'Additive API versioning — new endpoints under a new version, existing version untouched, with a client-side fallback on failure',
        alternative: "Changing the existing endpoint's default response shape or default page size",
        rationale:
          'The existing endpoint served web, mobile and internal service-to-service traffic. Changing its defaults would silently truncate responses for consumers I could not enumerate or test.',
        tradeoff:
          'Two code paths coexist during migration, and remaining callers of the heavy path must be migrated one at a time rather than switched off at once.',
      },
      {
        choice: 'Serialize all identifiers as strings rather than JSON numbers',
        alternative: 'Emitting them as numbers, matching storage',
        rationale:
          "Identifiers exceed JavaScript's safe integer range, so numeric serialization loses precision in the browser.",
        tradeoff:
          'Client and server now disagree on id type at the boundary, which caused real defects until normalization was pinned to the payload boundary.',
      },
    ],
    correctness: `No automated test suite exists in either repository, so
      verification was manual and staged. Each migration was sequenced so every
      stage removes one dependency while the old heavy call is still present —
      the app stays working and independently verifiable after each stage, and
      only the final stage flips the switch. Request payloads were captured
      byte-for-byte before the first edit and diffed against post-migration
      payloads. The first migration produced 11 defects, six of them silent —
      including one that revoked a user's access to a record nobody had
      deselected (a splice on an unguarded index of −1 removing the last element)
      and one that corrupted the wire payload by sending string ids where the
      server hard-cast to a numeric type. I turned those into a written
      pre-flight checklist covering wire id types, both directions of
      differential payloads, counters that must handle the id-less bulk case, and
      guarded index lookups, so the four remaining migrations would not
      rediscover them. Each completed migration was verified live end to end in a
      browser, including a real destructive operation.`,
    metrics: [
      {
        label: 'Heaviest client request — payload',
        before: '6.2 MB',
        after: '2 KB',
        note: 'Browser network measurement recorded in a dated migration completion note; test tenant of 21 parent / 4,226 child records. Single observation, not a percentile.',
      },
      {
        label: 'Same request — wall clock',
        before: '8,112 ms',
        after: '86 ms',
        note: 'Same measurement session. Single browser observation against an internal environment; not a p95 and not production traffic.',
      },
      {
        label: 'Fields returned per child vs. used',
        before: '~33 returned, 4–8 used',
        note: 'Per-consumer field-usage audit, cross-checked against a captured live response.',
      },
      {
        label: 'Shared-store consumers audited',
        after: '29 across 5 patterns',
        note: '28 of 29 covered by a single 4-field summary shape. From the consumer classification tables in the design analysis.',
      },
      {
        label: 'Defects caught in the first migration',
        after: '11 total, 6 silent',
        note: 'Including one permission data loss and one wire-format corruption. From the migration completion report and the resulting pre-flight checklist.',
      },
    ],
    stack: ['Vue 2', 'Vuex', 'JavaScript', 'Java 17', 'JAX-RS / Jersey', 'SQL'],
    myRole: `I ran the consumer audit, wrote the problem analysis and the
      four-approach comparison, and made the recommendation. The final
      summary-response shape and the decision to cap collection size rather than
      paginate that endpoint were settled in a team design discussion — I
      prepared the analysis it worked from, the team decided. I built the
      client-side layered fetching, the three-layer selector family, and the
      migration of three screens onto it, plus removing the heavy call from two
      flows and from application boot. Pagination on other backend domains was
      built by teammates on their own features; my backend contribution here is
      the deterministic tie-breaker above.`,
    draft: false,
  },

  {
    id: 'ranked-analytics-feature',
    index: '02',
    status: 'Shipped',
    title: 'A cross-collection ranked analytics view, end to end',
    oneLiner:
      'A ranking view that scores and orders every child record in a tenant by performance across several computed dimensions, with configurable metrics, role-scoped visibility and export.',
    problem: `Tenants managing many records had no way to compare them against
      one another on performance, or to identify underperformers.`,
    constraint: `Scoring aggregates a large event table across records, so the
      ranking query is an aggregate that must stay paginated and
      permission-scoped. Metric configuration had to live in a shared
      cross-tenant store while remaining per-tenant in effect, requiring a
      schema-dictionary change plus a seeding migration rather than a simple
      insert. Existing roles — including tenant-defined custom ones — needed
      backfilling to the new permission without disturbing their other grants.`,
    approach: `Delivered across the stack in one change: a request handler,
      aggregate scoring and ranking queries sortable on several computed
      dimensions, a configuration table with a migration seeding it in the shared
      store, a second migration backfilling the new capability onto existing and
      custom roles, subscription-tier gating, an export path, permission-filter
      wiring, and translated user-facing strings. A follow-up made the pagination
      deterministic by adding a unique tie-breaker to every ranking sort.`,
    decisions: [
      {
        choice: 'Metric configuration in the shared cross-tenant store, seeded by migration',
        alternative: 'A per-tenant configuration table',
        rationale:
          'The configuration defines what a metric means at the product level rather than holding tenant data; one definition prevents per-tenant drift in what a score means.',
        tradeoff:
          'Requires a schema-dictionary change and a seeded migration — heavier to deploy than a per-tenant table.',
      },
    ],
    correctness: `A dedicated migration backfills the new capability onto existing
      roles, with a follow-up fix handling custom roles correctly and making
      default-value handling explicit for the boolean setting. No automated
      tests; validated by exercising a locally deployed instance.`,
    metrics: [
      {
        label: 'Change size',
        after: '~5,850 lines / 37 files',
        note: 'Commit statistics from the backend repository. A size figure, not an impact figure.',
      },
    ],
    stack: ['Java 17', 'JAX-RS / Jersey', 'SQL aggregates', 'Schema migrations', 'RBAC', 'i18n'],
    myRole: 'I wrote this change and its follow-up fixes, per commit history.',
    draft: false,
  },

  {
    id: 'layered-api-architecture-standard',
    index: '03',
    status: 'Designed — not yet merged',
    title: 'An API architecture standard argued from measurements',
    oneLiner:
      'New endpoints now follow a documented three-layer structure with typed inputs and correct error semantics, instead of accreting into two enormous shared files.',
    problem: `Features were being added by appending to a handful of very large
      shared files. I measured one domain's data layer: a static utility of
      ~2,830 lines exposing 221 static methods, containing 199 catch-blocks that
      logged an exception and returned an empty object; a data-access
      implementation of ~6,550 lines across 88 methods; and one interface
      declaring 79 methods spanning unrelated domains. The consequences were
      concrete, not aesthetic: because failures were swallowed and an empty
      result returned, a database outage was indistinguishable from "no data" to
      the caller, and a representative list endpoint reported every failure —
      including genuine server errors — as an HTTP 400 with a hand-rolled body.
      Request parsing, orchestration and error formatting all lived in one
      ~210-line method.`,
    constraint: `A rewrite was not on the table — the existing version serves web,
      mobile and internal service traffic, and the team ships continuously. The
      standard had to be additive, coexist indefinitely, and be cheap enough per
      endpoint that people would follow it rather than route around it. It also
      had to reuse the existing tenant-routing mechanism, since multi-tenancy
      resolves through a vendor bean lookup that new code has no business
      reimplementing.`,
    approach: `Wrote it as an architecture proposal backed by measurements of the
      current code and an end-to-end trace of a real endpoint, rather than an
      assertion of best practice. It defines a domain-first three-layer split —
      an HTTP layer that only reads the request and writes the response, a
      handler layer holding business rules, and a per-domain data-access layer —
      with typed request and response objects at the boundary so required inputs
      are compile-time visible rather than string keys read at runtime. The error
      policy is throw-don't-swallow: the data layer throws a typed server-side
      exception carrying an error code and log level and deliberately knows
      nothing about HTTP, while a single framework-level mapper renders every
      exception to the standard envelope, so status semantics are correct and
      error formatting lives in one place. Cross-cutting list concerns — page
      parameter parsing, validation, capping, offset arithmetic, peek-ahead
      limit — live in one shared, framework-agnostic object depending only on the
      raw request, unit-testable without a server. Shipped with a worked
      reference endpoint and per-domain interfaces narrow enough to mock,
      replacing the 79-method catch-all.`,
    decisions: [
      {
        choice: 'Additive new API version alongside the old — explicitly not a migration or rewrite',
        alternative: 'Incrementally refactoring the existing large files in place',
        rationale:
          'In-place refactoring of files every developer edits daily generates constant merge conflict and regression risk across three classes of client, while delivering no feature. The additive approach stops the growth curve without paying rewrite cost.',
        tradeoff:
          'Two architectures coexist indefinitely and new developers must learn both. The old files keep growing wherever old endpoints are extended.',
      },
      {
        choice: 'Data layer throws a server-typed exception; only the HTTP boundary knows status codes',
        alternative:
          'Having the data layer throw the request-facing exception type directly — fewer types',
        rationale:
          'Keeping HTTP semantics out of persistence makes the data layer reusable from non-HTTP callers such as scheduled jobs, and removes the temptation to choose a status code somewhere with no request context.',
        tradeoff:
          'Two exception types plus a mapping. Logging is deliberately centralized in the mapper so one failure is not logged twice.',
      },
    ],
    correctness: `Not a behavioural change to existing endpoints — the previous
      version is untouched by design. No automated test coverage exists, though
      making the layers unit-testable without a running server was an explicit
      design goal.`,
    metrics: [
      {
        label: 'Legacy data-layer facade',
        before: '~2,830 lines · 221 static methods · 199 swallowed exceptions',
        note: 'Line and occurrence counts measured against the repository and stated in the standard; independently re-derivable from source.',
      },
      {
        label: 'Legacy data-access implementation',
        before: '~6,550 lines · 88 methods · one 79-method interface',
        note: 'Same measurement.',
      },
      {
        label: 'Representative legacy handler',
        before: '~210 lines · all failures reported as HTTP 400',
        after: '~5 small files + one data method',
        note: 'Before is an end-to-end trace of one real endpoint; after is the per-endpoint cost under the standard.',
      },
    ],
    stack: ['Java 17', 'JAX-RS / Jersey', 'Typed DTOs', 'Exception mappers', 'Multi-tenant routing'],
    myRole: `I wrote the standard and the reference implementation. Worth being
      clear about the status: this is still local work, so nothing here evidences
      team adoption or production use — it's a proposal with a worked example,
      not something I can claim the team runs on.`,
    draft: false,
  },

  {
    id: 'n-plus-one-elimination',
    index: '04',
    status: 'Designed — not yet merged',
    title: 'Collapsing a per-row query loop into one aggregating join',
    oneLiner:
      'Listing records used to issue one extra database query per row just to count what was inside it. I collapsed that into a single query.',
    problem: `After fetching a page of parent records, the list endpoint looped
      over every record in the page and issued a separate query fetching all of
      its children, purely to compute three counts — and did so even when the
      caller had not requested child detail. At ~100 parents averaging ~40
      children, one list request pulled roughly 4,000 rows it then discarded.`,
    constraint: `The counts are not simple row counts — one is conditional on a
      per-child status column. The query must also respect per-user permission
      scoping, where a restricted user sees only an allow-listed subset at both
      levels, and must exclude records that are soft-deleted or have a pending
      deletion job. A naive join would either double-count rows or leak records
      the user is not permitted to see.`,
    approach: `Rewrote the read as one statement: an inner query grouping the
      child table by owning parent, producing both the total count and a
      conditional count via a CASE aggregate, exposed as a derived table; then an
      outer query over the parent table LEFT JOINing it so parents with zero
      children still appear with zeroed counts. Permission scoping is applied as
      criteria on both the inner aggregation and the outer selection; the
      pending-deletion exclusion is a NOT IN against a scoped subquery.
      Pagination is applied to the outer query via the shared page-request
      object, with peek-ahead next-page detection. Restricted users with no
      assignments short-circuit to an empty result before touching the database.`,
    decisions: [
      {
        choice: 'One derived-table join with conditional aggregation',
        alternative: "Keeping the loop but batching it into a single IN query over the page's ids",
        rationale:
          'Batching cuts query count from N+1 to 2 but still transfers every child row to the application layer only to count them. The aggregate keeps counting in the database and returns one row per parent.',
        tradeoff:
          'The query is substantially harder to read than the loop it replaces, and it is expressed through a programmatic query builder rather than SQL, which compounds that. Mitigated by documenting the two-stage shape inline and extracting the reusable filter predicates into a single shared builder so scoping rules cannot drift between endpoints.',
      },
    ],
    correctness: `Generated SQL is logged per request so the actual statement can
      be inspected against the intended shape. Database resources are closed in a
      finally block. Failures are wrapped in a typed exception and rethrown
      rather than swallowed, so an outage surfaces as an error response instead
      of an empty success. No automated test coverage.`,
    metrics: [
      {
        label: 'Database round-trips per list request',
        before: '1 + N',
        after: '1',
        note: '"Before" from a handler trace walking the existing per-row loop; "after" is the structure of the replacement query. Neither is a timed measurement.',
      },
      {
        label: 'Rows read per list request',
        before: '~4,000',
        after: '0 transferred — counted in-database',
        note: 'Arithmetic from ~100 parents × ~40 children, not an instrumented row count.',
      },
    ],
    stack: ['Java 17', 'SQL', 'Derived tables', 'Conditional aggregation'],
    myRole: `I wrote the analysis and the replacement query. Same caveat as
      above: it isn't merged yet, so it hasn't been through review and nothing
      here shows it running in production.`,
    draft: false,
  },

  {
    id: 'internationalization-rollout',
    index: '05',
    status: 'Shipped',
    title: 'Extending the backend to 30 locales',
    oneLiner:
      'Took server-generated user-facing text from effectively English-only to 30 languages, including the locale-resolution logic behind it.',
    problem: `Server-generated text — API messages, notifications, outbound
      email — was unavailable in the locales the product needed.`,
    constraint: `Locale resolution must work for text generated outside a request,
      such as scheduled jobs and outbound email, where no incoming request
      carries a locale header. Resolution therefore had to fall back through user
      preference and tenant default rather than reading the request alone.`,
    approach: `Reworked the message-resolution utility and its callers, then added
      30 locale bundles of ~650 keys each alongside a substantially expanded base
      bundle.`,
    decisions: [],
    correctness: 'No automated tests; validated against a locally deployed instance.',
    metrics: [
      {
        label: 'Locales supported',
        after: '30 bundles · ~650 keys each',
        note: '~16,800 lines added. Commit statistics from the backend repository.',
      },
    ],
    stack: ['Java 17', 'Resource bundles', 'i18n'],
    myRole: `I wrote this change. The translations themselves came from a
      localization process — my part was the resolution logic and the
      integration, not the 30 languages.`,
    draft: false,
  },

  {
    id: 'durable-retry-for-third-party-failures',
    index: '06',
    status: 'Shipped',
    title: 'Making automated outbound actions survive third-party failures',
    oneLiner:
      'Automated actions that call external services used to be lost when those services failed. Now they are retried durably on a schedule.',
    problem: `Automated workflow actions calling external third-party APIs failed
      permanently when the remote service was unavailable, silently dropping the
      action with no retry and no operator visibility.`,
    constraint: `Retries must survive process restarts, so they belong in the
      scheduled-task layer rather than an in-process retry loop, and the failure
      taxonomy must distinguish retryable transport failures from permanent
      rejections that should never be retried.`,
    approach: `Added dedicated scheduled retry tasks per failing action type,
      extended the scheduling utility to enqueue them, added the corresponding
      error constants, and reworked the workflow utility to route failures into
      the retry path rather than dropping them.`,
    decisions: [],
    correctness: 'No automated tests; validated against a locally deployed instance.',
    metrics: [],
    stack: ['Java 17', 'Scheduled task framework', 'Third-party API integration'],
    myRole: 'I wrote this change, per commit history.',
    draft: false,
  },
]

export const skills = [
  {
    group: 'Front-end',
    items: [
      'Vue 2 · Vuex',
      'JavaScript (ES2020+)',
      'Reusable component architecture',
      'HTML · CSS',
      'Accessibility',
      'i18n (30 locales)',
    ],
  },
  {
    group: 'Back-end',
    items: [
      'Java 17',
      'JAX-RS / Jersey',
      'SQL · query optimisation',
      'Pagination correctness',
      'N+1 elimination',
      'RBAC · schema migrations',
    ],
  },
  {
    group: 'Practice',
    items: [
      'Codebase-wide impact analysis',
      'Incremental migration without a test suite',
      'Backward-compatible API evolution',
      'Architecture documentation',
    ],
  },
  {
    group: 'Tooling',
    items: ['Git', 'Tomcat · Ant', 'Vite', 'CI/CD (GitHub Actions)', 'Firebase Hosting'],
  },
]

export const education = [
  {
    institution: 'PSG College of Technology',
    credential: 'B.E., Electrical and Electronics Engineering',
    period: '2017 — 2022',
    location: 'Coimbatore, IN',
  },
]

export const extras = {
  publications: [
    {
      title: 'Design of Power Converters for E-Vehicle Applications',
      note: 'Undergraduate research paper',
    },
  ],
  certifications: [
    { title: 'Crash Course on Python', issuer: 'Coursera' },
    { title: 'Machine Learning for All', issuer: 'Coursera' },
  ],
  awards: [
    {
      title: 'Runners-up, Zonal Badminton Tournament',
      issuer: 'Anna University Sports Board',
      year: '2019',
    },
  ],
}

export const contact = {
  heading: 'Open to full-stack roles',
  body: `I'm looking for work where the front end and the data layer are the
    same person's problem. If that's what you're hiring for, I'd like to hear
    about it.`,
}

/** Nav — `id` must match a section's DOM id. */
export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

/** Years of experience, computed so the number never goes stale. */
export function yearsOfExperience(from = profile.careerStart, now = new Date()) {
  const [y, m] = from.split('-').map(Number)
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m)
  return Math.max(0, Math.floor(months / 12))
}
