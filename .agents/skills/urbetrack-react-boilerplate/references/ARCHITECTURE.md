# Architecture Guide

## TL;DR

**Core Pattern**: Pages get data from hooks (NOT props). Use feature-based organization. Always implement 3-layer error handling.

## Project Structure Overview

```txt
src/
├── layout/             # Root layout components
├── mocks/              # Development/testing mocks
├── modules/            # Feature modules (feature-based architecture)
├── router/             # App router configuration & shared error boundaries
├── shared/             # Shared code across features
│   ├── components/
│   │   ├── ui/         # Project-specific UI not provided by @urbetrack/urbix
│   │   ├── error-boundary/
│   │   └── suspense-boundary/
│   ├── constants/      # Shared constants (URLs, configs)
│   ├── hooks/          # Shared hooks (use-debounce, use-query-param)
│   ├── lib/            # Utilities (cn, create-lazy-route)
│   ├── providers/      # React providers (QueryProvider)
│   ├── services/       # API clients (axios)
│   └── utils/          # Helper functions
├── styles/             # Global styles
└── main.tsx            # Application entry point
```

## 30-Second Lookup

| **I'm creating a...**   | **Put it in...**                                         | **Example**                              |
| ----------------------- | -------------------------------------------------------- | ---------------------------------------- |
| Route page              | `modules/{feature}/pages/{name}-page.tsx`                | `products-page.tsx` → `ProductsPage`     |
| Feature layout          | `modules/{feature}/pages/{name}-layout.tsx`              | `home-layout.tsx` → `HomeLayout`         |
| Reusable component      | `modules/{feature}/components/{name}.tsx`                | `product-card.tsx` → `ProductCard`       |
| Page-specific component | `modules/{feature}/pages/{page}/components/`             | `header.tsx` → `Header`                  |
| Data hook               | See Hook decision tree                                   | `use-products.ts` → `useProducts`        |
| Form hook               | See Hook decision tree                                   | `use-product-form.ts` → `useProductForm` |
| Page-only static config | `modules/{feature}/pages/{page}/constants/{name}.tsx`    | `vehicle-table-columns.tsx`              |
| Unit test               | `modules/{feature}/{area}/__tests__/{name}.test.ts(x)`   | `home-page.test.tsx`                     |
| API service             | `modules/{feature}/services/{name}.api.ts`               | `products.api.ts` → `productsApi`        |
| Route definition        | `modules/{feature}/routes/{feature}.routes.tsx`          | `products.routes.tsx` → `productsRoutes` |
| Route constants         | `modules/{feature}/routes/{feature}.routes.constants.ts` | `products.routes.constants.ts`           |
| Utility function        | See Utility decision tree                                | `auth-token-mapper.ts`                   |

## Core Pattern: Custom Hooks + Pages

### The Rule: Pages get data from hooks (NOT props)

```typescript
// ✅ YES - Page uses hook
export function ProductsPage() {
  const { products, loading } = useProducts(); // ← Hook provides data
  return <div>{products.map(...)}</div>;
}

// ❌ NO - Page receives props
export function ProductsPage({ products }: Props) {
  return <div>{products.map(...)}</div>;
}
```

### Why?

No prop drilling, easier testing, better performance.

## File Placement Decision Tree

```txt
┌─ Creating a PAGE? (used in router)
│  └─→ modules/{feature}/pages/{name}-page.tsx
│     • Must use "Page" suffix
│     • Gets data from hooks
│     • Simple route shell = keep {name}-page.tsx flat
│     • Page-only UI = add pages/{name}-page/components/
│     • Dedicated page composition = promote to {name}-page/ with index.ts
│
├─ Creating a COMPONENT? (reusable UI)
│  ├─→ Used in 1 page only?
│  │  └─→ modules/{feature}/pages/{page}/components/{name}.tsx
│  ├─→ Used 2+ times in THIS feature?
│  │  └─→ modules/{feature}/components/{name}.tsx
│  └─→ Used across ALL features?
│     └─→ shared/components/{name}.tsx
│
├─ Creating a HOOK? (business logic)
│  ├─→ Used in 1 page only?
│  │  └─→ modules/{feature}/pages/{page}/hooks/use-{name}.ts
│  ├─→ Used 2+ times in THIS feature?
│  │  └─→ modules/{feature}/hooks/use-{name}.ts
│  └─→ Used across ALL features?
│     └─→ shared/hooks/use-{name}.ts
│     • If it only exports static config or values, it is not a hook
│
├─ Creating a UTILITY? (helper function)
│  ├─→ Used in 1 page only?
│  │  └─→ modules/{feature}/pages/{page}/utils/{name}.ts
│  ├─→ Used 2+ times in THIS feature?
│  │  └─→ modules/{feature}/utils/{name}.ts
│  └─→ Used across ALL features?
│     └─→ shared/utils/{name}.ts
│
├─ Creating a CONSTANT?
│  ├─→ Used in 1 page only?
│  │  └─→ modules/{feature}/pages/{page}/constants/{name}.ts
│  ├─→ Used 2+ times in THIS feature?
│  │  └─→ modules/{feature}/constants/{name}.ts
│  └─→ Used across ALL features?
│     └─→ shared/constants/{name}.ts
│
├─ Creating a TYPE?
│  ├─→ Used in 1 page only?
│  │  └─→ modules/{feature}/pages/{page}/types/{name}.types.ts
│  ├─→ Used 2+ times in THIS feature?
│  │  └─→ modules/{feature}/types/{name}.types.ts
│  └─→ Used across ALL features?
│     └─→ shared/types/{name}.types.ts
│
├─ Creating API calls?
│  └─→ modules/{feature}/services/{name}.api.ts
│
└─ Creating ROUTE definitions?
   └─→ modules/{feature}/routes/{feature}.routes.tsx
```

## Templates

### Simple Page Template

```typescript
// File: modules/products/pages/products-page.tsx
import { useProducts } from '../hooks/use-products';
import { ProductCard } from '../components/product-card';
import { LoadingSpinner } from '@/shared/components';
import { DefaultErrorFallback } from '@/shared/components/error-boundary';

export function ProductsPage() {
  const { products, loading, error } = useProducts();

  if (loading) return <LoadingSpinner />;
  if (error) return <DefaultErrorFallback error={error} />;

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### Complex Page Template

```typescript
// File: modules/products/pages/product-detail-page/product-detail-page.tsx
import { useParams } from 'react-router';
import { useProductDetail } from './hooks/use-product-detail';
import { LoadingSpinner } from '@/shared/components';
import { DefaultErrorFallback } from '@/shared/components/error-boundary';
import { ProductHeader, ProductInfo, ProductGallery } from './components';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProductDetail(id!);

  if (loading) return <LoadingSpinner />;
  if (error) return <DefaultErrorFallback error={error} />;

  return (
    <div className="product-detail-page">
      <ProductHeader product={product} />
      <ProductInfo product={product} />
      <ProductGallery images={product.images} />
    </div>
  );
}
```

### Data Hook Template

```typescript
// File: modules/products/hooks/use-products.ts
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
    error: query.error,
  };
}
```

### Form Hook Template

```typescript
// File: modules/products/hooks/use-product-form.ts
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "../services/products.api";
import type { ProductFormData } from "../types/product.types";

export function useProductForm() {
  const form = useForm<ProductFormData>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    form,
    handleSubmit,
    loading: mutation.isPending,
    error: mutation.error,
  };
}
```

### API Service Template

```typescript
// File: modules/products/services/products.api.ts
import { apiClient } from "@/shared/services/api-client";
import type {
  Product,
  CreateProduct,
  ProductFilters,
} from "../types/product.types";

export const productsApi = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    const { data } = await apiClient.get("/products", { params: filters });
    return data;
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  },

  create: async (payload: CreateProduct): Promise<Product> => {
    const { data } = await apiClient.post("/products", payload);
    return data;
  },

  update: async (id: string, payload: Partial<Product>): Promise<Product> => {
    const { data } = await apiClient.patch(`/products/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
```

### Route Definition Template

```typescript
// File: modules/products/routes/products.routes.tsx
import type { RouteObject } from 'react-router';
import { createLazyRoute } from '@/shared/lib/create-lazy-route';
import { RouteErrorBoundary } from '@/shared/components/error-boundary';

const ProductsPage = createLazyRoute(
  () => import('../pages/products-page'),
  'ProductsPage'
);
const ProductDetailPage = createLazyRoute(
  () => import('../pages/product-detail-page'),
  'ProductDetailPage'
);

export const productsRoutes: RouteObject[] = [
  {
    index: true,
    element: <ProductsPage />,
    errorElement: <RouteErrorBoundary />
  },
  {
    path: ':id',
    element: <ProductDetailPage />,
    errorElement: <RouteErrorBoundary />
  }
];

// Route constants for type-safe navigation
export const PRODUCTS_ROUTES = {
  ROOT: '',
  DETAIL: ':id'
} as const;

// Helper functions for dynamic routes
export const getProductDetailRoute = (id: string) => id;
```

### Component Template

```typescript
// File: modules/products/components/product-card.tsx
import type { Product } from '../types/product.types';

interface ProductCardProps {
  product: Product;
  onSelect?: (id: string) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div
      className="product-card"
      onClick={() => onSelect?.(product.id)}
      data-testid="product-card"
    >
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span className="price">${product.price}</span>
    </div>
  );
}
```

## Error Handling (3 Layers)

Always implement all 3 layers:

```typescript
// 1️⃣ ROUTE LEVEL - Add to route definition
{
  path: '/products',
  element: <ProductsPage />,
  errorElement: <RouteErrorBoundary /> // ← Always add this
}

// 2️⃣ HOOK LEVEL - Return error from hook
export function useProducts() {
  const { data, error, isLoading } = useQuery(...);
  return {
    products: data ?? [],
    loading: isLoading,
    error  // ← Return error
  };
}

// 3️⃣ PAGE LEVEL - Handle error in page
export function ProductsPage() {
  const { products, loading, error } = useProducts();

  if (loading) return <LoadingSpinner />;
  if (error) return <DefaultErrorFallback error={error} />; // ← Handle error

  return <div>{products.map(...)}</div>;
}
```

## Naming Cheatsheet

| Type                | File Name                      | Export Name        | Location                        |
| ------------------- | ------------------------------ | ------------------ | ------------------------------- |
| **Page**            | `products-page.tsx`            | `ProductsPage`     | `modules/{feature}/pages/`      |
| **Layout**          | `products-layout.tsx`          | `ProductsLayout`   | `modules/{feature}/pages/`      |
| **Component**       | `product-card.tsx`             | `ProductCard`      | `modules/{feature}/components/` |
| **Hook**            | `use-products.ts`              | `useProducts`      | See decision tree               |
| **Form Hook**       | `use-product-form.ts`          | `useProductForm`   | See decision tree               |
| **Service**         | `products.api.ts`              | `productsApi`      | `modules/{feature}/services/`   |
| **Store**           | `products.store.ts`            | `useProductsStore` | `modules/{feature}/stores/`     |
| **Types**           | `product.types.ts`             | `type Product`     | See decision tree               |
| **Routes**          | `products.routes.tsx`          | `productsRoutes`   | `modules/{feature}/routes/`     |
| **Route Constants** | `products.routes.constants.ts` | `PRODUCTS_ROUTES`  | `modules/{feature}/routes/`     |
| **Utils**           | `auth-token-mapper.ts`         | `mapAuthToken`     | See decision tree               |

**Universal rule**: Files are `kebab-case`, exports are `PascalCase` (components) or `camelCase` (functions)

## Common Mistakes

| ❌ Wrong                        | ✅ Right                               | Why                              |
| ------------------------------- | -------------------------------------- | -------------------------------- |
| `Product.tsx`                   | `product.tsx`                          | Files must be kebab-case         |
| `function Products()`           | `function ProductsPage()`              | Pages need "Page" suffix         |
| `ProductsPage({ data }: Props)` | `const { data } = useProducts()`       | Pages use hooks, not props       |
| Reusable component in `pages/`  | Reusable component in `components/`    | `pages/` is only for route-owned UI |
| No `errorElement`               | `errorElement: <RouteErrorBoundary />` | Always add error boundaries      |
| `UseProducts.ts`                | `use-products.ts`                      | Files are kebab-case             |
| `return [data, loading]`        | `return { data, loading }`             | Hooks return objects, not arrays |

## Feature Structure Reference

```txt
modules/{feature}/
├── pages/              # Route components
│   ├── {name}-page.tsx             # Simple route shell
│   ├── {name}-layout.tsx           # Feature layout (optional)
│   └── {name}-page/                # Route-owned files for this page
│       ├── components/             # Page-specific components (optional)
│       │   ├── page-header.tsx
│       │   └── page-section.tsx
│       ├── hooks/                  # Page-specific hooks (optional)
│       │   └── use-{name}.ts
│       ├── utils/                  # Page-specific utilities (optional)
│       ├── constants/              # Page-specific constants/config (optional)
│       ├── types/                  # Page-specific types (optional)
│       ├── {name}-page.tsx         # Optional: promote complex pages into the folder
│       └── index.ts                # Optional: re-export default page module
├── components/         # Reusable feature components (optional)
│   ├── entity-card.tsx
│   └── entity-list.tsx
├── hooks/              # Shared feature hooks (used by 2+ pages)
│   ├── use-{entity}.ts           # Data fetching
│   ├── use-{entity}-form.ts      # Form management
│   ├── use-{capability}.ts       # UI state
│   └── __tests__/                # Hook tests
│       └── use-{entity}.test.ts
├── services/          # API calls: {entity}.api.ts
├── stores/            # State: {entity}.store.ts (Zustand)
├── types/             # Shared feature types (used by 2+ pages, optional)
├── utils/             # Shared feature utilities (used by 2+ pages, optional)
├── constants/         # Shared feature constants (used by 2+ pages, optional)
├── routes/            # Routes: {feature}.routes.tsx
│   ├── {feature}.routes.tsx
│   ├── {feature}.routes.constants.ts  # Route path constants
│   └── index.ts
└── index.ts           # Public exports
```

> **Note**: Folders marked `(optional)` should only be created when needed. Start simple and add structure as the feature grows.

## Creating a New Feature (Step-by-Step)

### Example: Create a products list feature

1. **Create page** (`modules/products/pages/products-page.tsx`)
   - Use "Simple Page Template"
   - Gets data from hook
   - Handles loading/error states

2. **Create data hook** (`modules/products/hooks/use-products.ts`)
   - Use "Data Hook Template"
   - Returns `{ products, loading, error }`

3. **Create API service** (`modules/products/services/products.api.ts`)
   - Use "API Service Template"
   - Export `productsApi` with CRUD methods

4. **Create route** (`modules/products/routes/products.routes.tsx`)
   - Use "Route Definition Template"
   - Add `errorElement: <RouteErrorBoundary />`

5. **Register route** in main router (`src/router/index.tsx`)
   - Mount `productsRoutes` under `/products` path

6. **Create types** (`modules/products/types/product.types.ts`)

   ```typescript
   export interface Product {
     id: string;
     name: string;
     price: number;
     description: string;
   }
   ```

7. **Create component** (if needed) (`modules/products/components/product-card.tsx`)
   - Use "Component Template"
   - Receives data via props

8. **Write tests**
   - Page test: `pages/__tests__/` or `pages/{page}/__tests__/`
   - Hook test: `hooks/__tests__/`
   - Component test: nearest `__tests__/` folder to the component

## Quick Search Keywords

**Use Ctrl+F to find:**

- `"creating a page"` → Decision tree
- `"simple page"` → Template
- `"complex page"` → Template with sub-components
- `"data hook"` → Data fetching template
- `"form hook"` → Form management template
- `"error handling"` → 3 layers section
- `"naming"` → Cheatsheet table
- `"where does"` → Decision tree
- `"mistake"` → Common mistakes
- `"template"` → All templates
- `"test"` → Testing templates
- `"route"` → Route definition template
- `"api"` → API service template

## For AI Assistants

### When user asks "where does X go?"

→ Check **File Placement Decision Tree** section

### When user asks "create a page"

→ Use **Simple Page Template** or **Complex Page Template**  
→ Also generate: **Data Hook** + **API Service** + **Route Definition**

### When user asks "is this right?"

→ Validate against:

1. **Naming rules** (kebab-case files, PascalCase exports)
2. **Pages use hooks** (not props for data)
3. **Error handling** (3 layers present?)
4. **File location** (matches decision tree?)

### Pattern validation checklist

**Pages:**

- [ ] File name ends with `-page.tsx`
- [ ] Export name ends with `Page`
- [ ] Uses hooks for data (not props)
- [ ] Handles loading/error states
- [ ] Located in `modules/{feature}/pages/`

**Hooks:**

- [ ] File name starts with `use-`
- [ ] Export name starts with `use`
- [ ] Actually uses hook behavior; static config belongs in `constants/`
- [ ] Returns object: `{ data, loading, error }`
- [ ] Located based on reusability: `pages/{page}/hooks/` if page-only, `modules/{feature}/hooks/` if shared within feature, `shared/hooks/` if cross-feature

**Components:**

- [ ] File name is `kebab-case.tsx`
- [ ] Export name is `PascalCase`
- [ ] Receives data via props
- [ ] Has TypeScript interface for props
- [ ] Located based on reusability

**Routes:**

- [ ] Has `errorElement: <RouteErrorBoundary />`
- [ ] Imports page components (with Page suffix)
- [ ] Located in `modules/{feature}/routes/`

---

**Related:** [ROUTING.md](./ROUTING.md) | [TESTING.md](./TESTING.md) | [ERROR_BOUNDARIES.md](./ERROR_BOUNDARIES.md)
