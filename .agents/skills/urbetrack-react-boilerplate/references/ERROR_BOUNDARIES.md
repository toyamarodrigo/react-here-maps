# Error Boundary Patterns Guide

## TL;DR

Three-layer error strategy: Route-level (every route) + Hook-level (return `{ error, loading }`) + Component-level (risky components). Always add `errorElement` to routes. Wrap charts, forms, third-party widgets.

## Architecture

### Three-Layer Error Strategy

1. **Route-Level**: Catch routing, loader, and navigation errors
2. **Hook-Level**: Return `{ data, error, loading }` from hooks for declarative error handling
3. **Component-Level**: Catch rendering and data processing errors

## Route-Level Error Boundaries

### When to Use Route-Level Boundaries

- **Every route definition** should have an `errorElement`
- Catches errors from:
  - Route loaders and actions
  - Component rendering during navigation
  - Data fetching during route transitions

### Route-Level Implementation

```typescript
// In modules/[domain]/routes/*.tsx
import { RouteErrorBoundary } from '@/shared/components/error-boundary';

export const domainRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
    errorElement: <RouteErrorBoundary />  // ✅ Always add this
  },
  {
    path: '/analytics',
    element: <AnalyticsPage />,
    errorElement: <RouteErrorBoundary />  // ✅ Always add this
  }
];
```

### Route-Level Benefits

- Integrated with React Router's error handling lifecycle
- Cleaner route definitions (no wrapper components)
- Better performance (no extra React tree nesting)
- Catches more error types than component boundaries

## Hook-Level Error Handling

### When to Use Hook-Level Error Handling

- **Every data-fetching hook** should return `{ data, error, loading }`
- Pages consume hooks and handle errors declaratively
- Provides granular control over error UI per data source

### Hook-Level Implementation

```typescript
// modules/products/hooks/use-products.ts
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../services/products.api";

export function useProducts() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: () => productsApi.getAll(),
  });

  return {
    products: query.data ?? [],
    loading: query.isLoading,
    error: query.error,  // Always expose error
  };
}
```

### Page Consuming Hook

```typescript
// modules/products/pages/products-page.tsx
import { useProducts } from '../hooks/use-products';
import { LoadingSpinner } from '@/shared/components';
import { DefaultErrorFallback } from '@/shared/components/error-boundary';

export function ProductsPage() {
  const { products, loading, error } = useProducts();

  if (loading) return <LoadingSpinner />;
  if (error) return <DefaultErrorFallback error={error} />;  // Handle error

  return (
    <div className="products-page">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Hook-Level Benefits

- Declarative error handling in pages
- Easier to test (mock hook, check error UI)
- Granular control per data source
- Works with TanStack Query's built-in error state

## Component-Level Error Boundaries

### When to Use Component-Level Boundaries

Wrap components that are **high-risk** for errors:

#### Always Wrap These

- **Data Visualization**: Charts, graphs, maps, tables
- **Third-Party Integrations**: External widgets, embeds, iframes
- **Real-Time Components**: WebSocket connections, live data
- **Complex Forms**: Multi-step forms, dynamic field generation
- **Heavy Computation**: Data processing, calculations
- **Feature Boundaries**: Entire feature sections

#### Don't Wrap These

- Simple presentational components
- Basic form inputs
- Static content components
- Already wrapped components

### Component-Level Implementation

```typescript
// In pages or components
import { ComponentErrorBoundary } from '@/shared/components/error-boundary';

// ✅ Wrap risky components in page
export function DashboardPage() {
  const { analytics, loading } = useDashboardData();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Dashboard</h1>

      {/* High-risk component */}
      <ComponentErrorBoundary>
        <ComplexAnalyticsChart data={analytics.chartData} />
      </ComponentErrorBoundary>

      {/* Another risky component */}
      <ComponentErrorBoundary>
        <RealtimeDataTable websocketUrl={url} />
      </ComponentErrorBoundary>

      {/* Safe component - no boundary needed */}
      <SimpleInfoCard title="Stats" />
    </div>
  );
}
```

## Error Boundary Components

### RouteErrorBoundary

```typescript
// src/shared/components/error-boundary/route-error-boundary.tsx
import { useRouteError, isRouteErrorResponse } from 'react-router';
import { Button } from '@urbetrack/urbix';

export function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{error.status}</h1>
          <p className="text-muted-foreground">{error.statusText}</p>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
        <Button onClick={() => window.location.reload()}>
          Reload Page
        </Button>
      </div>
    </div>
  );
}
```

### ComponentErrorBoundary

```typescript
// src/shared/components/error-boundary/component-error-boundary.tsx
import React, { Component, ReactNode } from 'react';
import { Button } from '@urbetrack/urbix';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ComponentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h3 className="font-semibold text-red-800">Something went wrong</h3>
          <p className="text-sm text-red-600">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          {this.props.onReset && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                this.props.onReset?.();
              }}
            >
              Try Again
            </Button>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Error Recovery Patterns

### Retry with Reset

```typescript
// Error boundary with retry functionality
function ChartErrorBoundary({ children }: { children: React.ReactNode }) {
  const [retryCount, setRetryCount] = useState(0);

  const handleReset = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <ComponentErrorBoundary
      key={retryCount} // Force remount on retry
      onReset={handleReset}
      fallback={
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground mb-2">
            Chart failed to load
          </p>
          <Button size="sm" onClick={handleReset}>
            Retry ({retryCount}/3)
          </Button>
        </div>
      }
    >
      {children}
    </ComponentErrorBoundary>
  );
}
```

### Fallback UI

```typescript
// Custom fallback for specific components
function DataTableErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ComponentErrorBoundary
      fallback={
        <div className="rounded-lg border p-8 text-center">
          <div className="text-muted-foreground mb-2">
            📊 Data table unavailable
          </div>
          <p className="text-sm">
            The data table could not be loaded. Please try refreshing the page.
          </p>
        </div>
      }
    >
      {children}
    </ComponentErrorBoundary>
  );
}
```

### Progressive Degradation

```typescript
// Multiple fallback levels
function AnalyticsDashboard() {
  return (
    <div>
      <h1>Analytics Dashboard</h1>

      {/* Level 1: Full chart */}
      <ComponentErrorBoundary
        fallback={
          <div>
            {/* Level 2: Simple chart */}
            <ComponentErrorBoundary
              fallback={
                <div>
                  {/* Level 3: Static summary */}
                  <StaticSummary />
                </div>
              }
            >
              <SimpleChart />
            </ComponentErrorBoundary>
          </div>
        }
      >
        <ComplexChart />
      </ComponentErrorBoundary>
    </div>
  );
}
```

## Testing Error Boundaries

### Testing Route Errors

```typescript
// Test route error boundary
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RouteErrorBoundary } from '@/shared/components/error-boundary';

test('displays error message for route error', () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <div>Test</div>,
      errorElement: <RouteErrorBoundary />
    }
  ], {
    initialEntries: ['/'],
    initialIndex: 0
  });

  // Simulate route error
  router.navigate('/error-route');

  render(<RouterProvider router={router} />);

  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});
```

### Testing Component Errors

```typescript
// Test component error boundary
import { render, screen } from '@testing-library/react';
import { ComponentErrorBoundary } from '@/shared/components/error-boundary';

// Component that throws error
function ThrowingComponent() {
  throw new Error('Test error');
}

test('catches component error and shows fallback', () => {
  render(
    <ComponentErrorBoundary>
      <ThrowingComponent />
    </ComponentErrorBoundary>
  );

  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  expect(screen.getByText('Test error')).toBeInTheDocument();
});
```

## Best Practices

### Error Handling Placement

1. **Route Level**: Every route definition (`errorElement`)
2. **Hook Level**: Every data-fetching hook (return `{ error }`)
3. **Feature Level**: Wrap entire feature sections
4. **Component Level**: Wrap risky individual components
5. **Widget Level**: Wrap third-party integrations

### Error Recovery

1. **Provide retry mechanisms** - Allow users to recover
2. **Show meaningful messages** - Explain what went wrong
3. **Log errors** - For debugging and monitoring
4. **Graceful degradation** - Show alternative content

### Performance

1. **Minimal boundaries** - Don't wrap everything
2. **Strategic placement** - Only where errors are likely
3. **Lightweight fallbacks** - Keep fallback UI simple
4. **Error monitoring** - Track error rates and types

## Common Patterns

| Pattern                     | Use Case           | Implementation                         |
| --------------------------- | ------------------ | -------------------------------------- |
| **Route Boundary**          | All routes         | `errorElement: <RouteErrorBoundary />` |
| **Hook Error Return**       | Data fetching      | `return { data, error, loading }`      |
| **Component Boundary**      | Risky components   | `<ComponentErrorBoundary>`             |
| **Retry Pattern**           | Recoverable errors | Reset state + remount                  |
| **Fallback Pattern**        | Alternative UI     | Custom fallback component              |
| **Progressive Degradation** | Multiple fallbacks | Nested error boundaries                |

## Troubleshooting

### Common Issues

#### Error boundary not catching

- Verify error occurs during render phase
- Check error boundary placement
- Ensure error is thrown in React component tree

#### Infinite error loops

- Don't throw errors in error boundary render
- Use try-catch in event handlers
- Implement proper error recovery

#### Performance impact

- Minimize error boundary nesting
- Use lightweight fallback components
- Monitor error boundary usage

---

**Related:** [ARCHITECTURE.md](./ARCHITECTURE.md) | [ROUTING.md](./ROUTING.md)
