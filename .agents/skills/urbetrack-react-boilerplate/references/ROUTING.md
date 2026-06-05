# Feature-Based Routing Pattern

## TL;DR

Feature-based routing with lazy loading. Each feature manages its own routes. Use `createLazyRoute` helper for code splitting. Always add `errorElement` to routes.

## Architecture Overview

### Main Router (`src/router/index.tsx`)

- Handles top-level application routes
- Delegates to feature-specific routes
- Manages global error boundaries and root layout

### Feature Routes (`src/modules/{feature}/routes/`)

```txt
src/modules/{feature}/
├── pages/                    # Route page components
│   ├── simple-page.tsx       # Simple page (< 100 lines)
│   └── complex-page/         # Complex page (folder)
│       ├── complex-page.tsx
│       ├── components/       # Page-specific components
│       └── index.ts
├── routes/                   # Feature routing
│   ├── {feature}.routes.tsx  # Route definitions
│   └── index.ts              # Route constants & exports
├── components/               # Reusable feature components
├── hooks/                    # Business logic hooks
├── services/                 # API calls
└── stores/                   # Feature state
```

## Lazy Loading & Code Splitting

### When to Use Lazy Loading

**Always lazy load:**

- Feature pages (dashboard, analytics, settings)
- Large components (data tables, charts, maps)
- Admin/settings sections
- Third-party integrations

**Don't lazy load:**

- Root layout components
- Critical UI components (navigation, headers)
- Error boundaries
- Loading spinners
- Small, frequently used components

### `createLazyRoute` Helper Utility

```typescript
// src/shared/lib/create-lazy-route.ts
export function createLazyRoute<T = any>(
  importFn: () => Promise<T>,
  componentName: keyof T,
) {
  return async () => {
    const module = await importFn();
    return { Component: module[componentName] };
  };
}
```

### Usage Pattern

```typescript
// ✅ Recommended: Using createLazyRoute helper
import type { RouteObject } from 'react-router';
import { RouteErrorBoundary } from '@/shared/components/error-boundary';
import { createLazyRoute } from '@/shared/lib/create-lazy-route';

export const homeRoutes: RouteObject[] = [
  {
    // Use "default" for default exports (most common)
    lazy: createLazyRoute(() => import('../pages/home-layout'), 'default'),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        lazy: createLazyRoute(() => import('../pages/home-page'), 'default'),
        errorElement: <RouteErrorBoundary />
      },
      {
        path: 'dashboard',
        lazy: createLazyRoute(() => import('../pages/dashboard-page'), 'default'),
        errorElement: <RouteErrorBoundary />
      }
    ]
  }
];

// For named exports, use the export name:
// lazy: createLazyRoute(() => import('../pages/products'), 'ProductsPage')
```

## Route Constants & Type-Safe Navigation

### Route Constants Pattern

```typescript
// src/modules/home/routes/home.routes.tsx
export const HOME_ROUTES = {
  ROOT: "",
  DASHBOARD: "dashboard",
  ANALYTICS: "analytics",
  SETTINGS: "settings",
} as const;

// Helper functions for dynamic routes
export const getDashboardRoute = (id: string) => `dashboard/${id}`;
export const getAnalyticsRoute = (date: string) => `analytics?date=${date}`;
```

### Type-Safe Navigation Hook

```typescript
// src/shared/hooks/use-navigation.ts
import { useNavigate } from "react-router";
import { HOME_ROUTES } from "@/modules/home/routes";

export function useNavigation() {
  const navigate = useNavigate();

  return {
    goToDashboard: (id: string) => navigate(getDashboardRoute(id)),
    goToAnalytics: (date: string) => navigate(getAnalyticsRoute(date)),
    goToSettings: () => navigate(HOME_ROUTES.SETTINGS),
  };
}
```

## Main Router Configuration

### Root Router Setup

```typescript
// src/router/index.tsx
import { createHashRouter } from 'react-router';
import { Suspense } from 'react';
import { RootLayout } from '@/layout/root-layout';
import { RouteErrorBoundary } from '@/shared/components/error-boundary';
import { LoadingSpinner } from '@/shared/components/loading-spinner';

// Import feature routes
import { homeRoutes } from '@/modules/home';
import { authRoutes } from '@/modules/auth';

export const router = createHashRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <LoadingSpinner size="large" message="Loading..." />
          </div>
        }
      >
        <RootLayout />
      </Suspense>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      // Feature routes
      {
        path: 'home',
        children: homeRoutes
      },
      {
        path: 'auth',
        children: authRoutes
      }
    ]
  }
]);
```

## Advanced Routing Patterns

### Nested Routes with Layouts

```typescript
// Feature with nested layout
export const dashboardRoutes: RouteObject[] = [
  {
    lazy: createLazyRoute(() => import('../layouts/dashboard-layout'), 'default'),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        lazy: createLazyRoute(() => import('../pages/dashboard-overview'), 'default'),
        errorElement: <RouteErrorBoundary />
      },
      {
        path: 'analytics',
        lazy: createLazyRoute(() => import('../pages/analytics-page'), 'default'),
        errorElement: <RouteErrorBoundary />
      }
    ]
  }
];
```

### Route Guards & Protected Routes

```typescript
// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

// Usage in routes
export const protectedRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />
  }
];
```

### Dynamic Routes with Parameters

```typescript
// Dynamic route with params
export const productRoutes: RouteObject[] = [
  {
    path: 'products',
    lazy: createLazyRoute(() => import('../pages/products-page'), 'default'),
    errorElement: <RouteErrorBoundary />
  },
  {
    path: 'products/:id',
    lazy: createLazyRoute(() => import('../pages/product-detail-page'), 'default'),
    errorElement: <RouteErrorBoundary />
  },
  {
    path: 'products/:id/edit',
    lazy: createLazyRoute(() => import('../pages/product-edit-page'), 'default'),
    errorElement: <RouteErrorBoundary />
  }
];

// Route constants with params
export const PRODUCT_ROUTES = {
  LIST: 'products',
  DETAIL: 'products/:id',
  EDIT: 'products/:id/edit'
} as const;

// Helper functions
export const getProductDetailRoute = (id: string) => `products/${id}`;
export const getProductEditRoute = (id: string) => `products/${id}/edit`;
```

## Error Handling in Routes

### Route-Level Error Boundaries

```typescript
// Every route should have errorElement
export const exampleRoutes: RouteObject[] = [
  {
    path: '/risky-page',
    element: <RiskyPage />,
    errorElement: <RouteErrorBoundary /> // ✅ Always add this
  }
];
```

### Error Boundary with Recovery

```typescript
// Custom error boundary with retry
function RouteErrorBoundaryWithRetry() {
  return (
    <RouteErrorBoundary
      onReset={() => {
        // Retry logic
        window.location.reload();
      }}
    />
  );
}
```

## Performance Optimization

### Preloading Strategies

```typescript
// Preload on hover
function NavigationLink({ to, children }: { to: string; children: React.ReactNode }) {
  const handleMouseEnter = () => {
    // Preload route component
    import(`../pages/${to}-page`);
  };

  return (
    <Link to={to} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
}
```

### Route-Based Code Splitting

```typescript
// Split by feature
const HomeModule = lazy(() => import('@/modules/home'));
const AuthModule = lazy(() => import('@/modules/auth'));

// Use in router
export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'home',
        element: <HomeModule />
      },
      {
        path: 'auth',
        element: <AuthModule />
      }
    ]
  }
]);
```

## Best Practices

### Route Organization

1. **Feature-based grouping** - Group routes by business domain
2. **Consistent naming** - Use kebab-case for paths, PascalCase for components
3. **Error boundaries** - Always add `errorElement` to routes
4. **Lazy loading** - Use for all feature pages
5. **Route constants** - Define reusable route paths

### Performance Tips

1. **Preload critical routes** - Load important pages on hover
2. **Bundle splitting** - Split by feature boundaries
3. **Error recovery** - Provide retry mechanisms
4. **Loading states** - Show meaningful loading indicators

### Common Patterns

| Pattern              | Use Case       | Example                               |
| -------------------- | -------------- | ------------------------------------- |
| **Simple Route**     | Basic page     | `/home` → `HomePage`                  |
| **Nested Routes**    | Layout + pages | `/dashboard/*` → `DashboardLayout`    |
| **Dynamic Routes**   | Parameterized  | `/products/:id` → `ProductDetailPage` |
| **Protected Routes** | Auth required  | `/admin/*` → `AdminGuard`             |
| **Lazy Routes**      | Code splitting | `lazy: createLazyRoute(...)`          |

## Troubleshooting

### Common Issues

#### Route not found (404)

- Check path spelling in route definition
- Verify route is registered in main router
- Ensure no trailing slashes mismatch

#### Lazy loading fails

- Verify component export name matches `createLazyRoute` parameter
- Check import path is correct
- Ensure component is default export

#### Error boundary not catching

- Verify `errorElement` is added to route
- Check error boundary component is properly implemented
- Ensure error occurs during render, not in event handlers

#### Performance issues

- Use React DevTools Profiler to identify slow routes
- Consider splitting large components further
- Implement route preloading for critical paths

---

**Related:** [ARCHITECTURE.md](./ARCHITECTURE.md) | [ERROR_BOUNDARIES.md](./ERROR_BOUNDARIES.md)
