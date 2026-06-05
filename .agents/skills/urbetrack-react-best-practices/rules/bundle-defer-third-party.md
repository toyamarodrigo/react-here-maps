---
title: Defer Non-Critical Third-Party Libraries
impact: MEDIUM
impactDescription: loads after initial render
tags: bundle, third-party, analytics, defer
---

## Defer Non-Critical Third-Party Libraries

Analytics, logging, and error tracking don't block user interaction. Load them lazily after initial render.

**Incorrect (blocks initial bundle):**

```tsx
import { AnalyticsProvider } from 'analytics-library'

function App() {
  return (
    <div>
      <MainContent />
      <AnalyticsProvider />
    </div>
  )
}
```

**Correct (loads lazily after initial render):**

```tsx
import { lazy, Suspense } from 'react'

const AnalyticsProvider = lazy(() =>
  import('analytics-library').then(m => ({ default: m.AnalyticsProvider }))
)

function App() {
  return (
    <div>
      <MainContent />
      <Suspense fallback={null}>
        <AnalyticsProvider />
      </Suspense>
    </div>
  )
}
```
