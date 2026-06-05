---
title: Strategic Suspense Boundaries
impact: HIGH
impactDescription: faster initial paint
tags: async, suspense, code-splitting, layout-shift
---

## Strategic Suspense Boundaries

Use Suspense boundaries to show wrapper UI immediately while heavy components or data load asynchronously. Combine with `React.lazy()` for code splitting and the `use()` hook for promise-based data fetching.

**Incorrect (everything loads in one bundle, blocks on data):**

```tsx
import HeavyChart from './HeavyChart'

function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData().then(setData)
  }, [])

  if (!data) return <Spinner />

  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <div>
        <HeavyChart data={data} />
      </div>
      <div>Footer</div>
    </div>
  )
}
```

The entire page shows a spinner until data arrives, and HeavyChart is included in the main bundle even if not immediately visible.

**Correct (code-split heavy components, stream data with Suspense):**

```tsx
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./HeavyChart'))

function Page() {
  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <div>
        <Suspense fallback={<Skeleton />}>
          <HeavyChart />
        </Suspense>
      </div>
      <div>Footer</div>
    </div>
  )
}
```

Sidebar, Header, and Footer render immediately. HeavyChart loads its code on demand and shows a skeleton while loading.

**Alternative (share a promise across components with `use()`):**

```tsx
import { Suspense, use } from 'react'

function Page() {
  // Start fetch immediately, but don't await
  const dataPromise = fetchData()

  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <Suspense fallback={<Skeleton />}>
        <DataDisplay dataPromise={dataPromise} />
        <DataSummary dataPromise={dataPromise} />
      </Suspense>
      <div>Footer</div>
    </div>
  )
}

function DataDisplay({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise) // Unwraps the promise
  return <div>{data.content}</div>
}

function DataSummary({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise) // Reuses the same promise
  return <div>{data.summary}</div>
}
```

Both components share the same promise, so only one fetch occurs. Layout renders immediately while both components wait together.

**When NOT to use this pattern:**

- Critical data needed for layout decisions (affects positioning)
- Small, fast queries where suspense overhead isn't worth it
- When you want to avoid layout shift (loading -> content jump)

**Trade-off:** Faster initial paint vs potential layout shift. Choose based on your UX priorities.
