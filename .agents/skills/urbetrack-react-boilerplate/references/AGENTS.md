# AGENTS.md

## Template Info

This project was generated with `@urbetrack/create-mf`.

1. Update environment variables in `.env`
2. Add your feature modules in `src/modules/`
3. Start developing: `pnpm dev`

---

## General

- Only create an abstraction if it's actually needed
- Prefer clear function/variable names over inline comments
- Avoid helper functions when a simple inline expression would suffice
- Use `knip` to remove unused code if making large changes
- Don't use emojis

## React

- Colocate code that changes together
- Use **Custom Hooks + Pages Pattern**: Pages get data from hooks, not props
- Place hooks, utils, constants, and types by reusability: page-only → `pages/{page}/{folder}/`, feature-shared → `modules/{feature}/{folder}/`, cross-feature → `shared/{folder}/`. Services, stores, and routes stay feature-level.
- Treat `data`, `forms`, and `ui` as hook categories, not nested folders by default
- Reserve `use-*` for real hooks. Static page config like table columns belongs in `pages/{page}/constants/`.
- Put page-only UI under `modules/{feature}/pages/{page}/components/`

### Pages Get Data From Hooks (Not Props)

```tsx
// ✅ YES - Page uses hook
export function ProductsPage() {
  const { products, loading } = useProducts();
  return <div>{products.map(...)}</div>;
}

// ❌ NO - Page receives data as props
export function ProductsPage({ products }: Props) {
  return <div>{products.map(...)}</div>;
}
```

## File Placement (30-second lookup)

| I'm creating a...       | Put it in...                                             | Example                                  |
| ----------------------- | -------------------------------------------------------- | ---------------------------------------- |
| Route page              | `modules/{feature}/pages/{name}-page.tsx`                | `products-page.tsx` → `ProductsPage`     |
| Feature layout          | `modules/{feature}/pages/{name}-layout.tsx`              | `home-layout.tsx` → `HomeLayout`         |
| Reusable component      | `modules/{feature}/components/{name}.tsx`                | `product-card.tsx` → `ProductCard`       |
| Page-specific component | `modules/{feature}/pages/{page}/components/`             | `header.tsx` → `Header`                  |
| Data hook (page-only)   | `modules/{feature}/pages/{page}/hooks/use-{name}.ts`     | `use-detail.ts` → `useDetail`            |
| Data hook (feature)     | `modules/{feature}/hooks/use-{name}.ts`                  | `use-products.ts` → `useProducts`        |
| Form hook (page-only)   | `modules/{feature}/pages/{page}/hooks/use-{name}-form.ts`| `use-new-form.ts` → `useNewForm`         |
| Form hook (feature)     | `modules/{feature}/hooks/use-{name}-form.ts`             | `use-product-form.ts` → `useProductForm` |
| Page static config      | `modules/{feature}/pages/{page}/constants/{name}.tsx`    | `vehicle-table-columns.tsx` → `VEHICLE_TABLE_COLUMNS` |
| Unit test               | `modules/{feature}/{area}/__tests__/{name}.test.ts(x)`   | `home-page.test.tsx`                     |
| API service             | `modules/{feature}/services/{name}.api.ts`               | `products.api.ts` → `productsApi`        |
| Route definition        | `modules/{feature}/routes/{feature}.routes.tsx`          | `products.routes.tsx` → `productsRoutes` |
| Route constants         | `modules/{feature}/routes/{feature}.routes.constants.ts` | `PRODUCTS_ROUTES`                        |
| Utility (page-only)     | `modules/{feature}/pages/{page}/utils/{name}.ts`         | `format-row.ts` → `formatRow`            |
| Utility (feature)       | `modules/{feature}/utils/{name}.ts`                      | `auth-token-mapper.ts` → `mapAuthToken`  |
| Constant (page-only)    | `modules/{feature}/pages/{page}/constants/{name}.ts`     | `filters.ts` → `DEFAULT_FILTERS`         |
| Constant (feature)      | `modules/{feature}/constants/{name}.ts`                  | `categories.ts` → `CATEGORIES`           |
| Type (page-only)        | `modules/{feature}/pages/{page}/types/{name}.types.ts`   | `detail.types.ts` → `type Detail`        |
| Type (feature)          | `modules/{feature}/types/{name}.types.ts`                | `product.types.ts` → `type Product`      |

> Full decision tree and templates: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## Common Mistakes

| ❌ Wrong                        | ✅ Right                               | Why                                 |
| ------------------------------- | -------------------------------------- | ----------------------------------- |
| `Product.tsx`                   | `product.tsx`                          | Files must be kebab-case            |
| `function Products()`           | `function ProductsPage()`              | Pages need "Page" suffix            |
| `ProductsPage({ data }: Props)` | `const { data } = useProducts()`       | Pages use hooks, not props          |
| Reusable component in `pages/`  | Reusable component in `components/`    | `pages/` is only for route-owned UI |
| No `errorElement`               | `errorElement: <RouteErrorBoundary />` | Always add error boundaries         |
| `UseProducts.ts`                | `use-products.ts`                      | Files are kebab-case                |
| `return [data, loading]`        | `return { data, loading }`             | Hooks return objects, not arrays    |
| `use-vehicle-table-columns.tsx` | `pages/home-page/constants/vehicle-table-columns.tsx` | Static config is not a hook |

## Vite + React Router

- Use React Router v7 with hash-based routing for microfrontends
- Lazy load routes with `createLazyRoute` helper
- Use route constants for type-safe navigation
- Keep route definitions close to feature modules (`modules/{feature}/routes/`)

## State Management

- **TanStack Query** for server state (API data fetching/caching)
- **Zustand** for client state (UI state, filters, preferences)

## Tailwind CSS

- Use Tailwind v4 + global CSS file format + shadcn/ui approach
- Mostly use built-in values, occasionally allow dynamic values
- Prefer `@urbetrack/urbix` for shared UI components
- Use `src/shared/components/ui/` only for project-specific components that Urbix does not provide

## Error Handling (3-Layer)

1. **Route-level**: `errorElement: <RouteErrorBoundary />`
2. **Hook-level**: Return `{ error, isLoading }` from hooks
3. **Component-level**: Wrap risky components with `<ComponentErrorBoundary>`
   - **Always wrap**: charts/graphs/maps, third-party widgets and embeds, real-time/WebSocket components, complex multi-step or dynamic forms, heavy computation
   - **Don't wrap**: simple presentational components, basic inputs, static content

> Implementations and recovery patterns: [docs/ERROR_BOUNDARIES.md](./docs/ERROR_BOUNDARIES.md)

## File Naming

- Files: `kebab-case` (e.g., `use-products.ts`, `products-page.tsx`)
- Exports: `kebab-case` for components, `kebab-case` for hooks/functions
- Pages: `*-page.tsx` suffix
- Hooks: `use-*.ts` prefix, only for actual hooks

## TypeScript

- Don't unnecessarily add `try/catch` blocks
- Don't cast to `any` - use proper types
- Strict mode is enabled - no implicit any

### Naming Conventions

- PascalCase for interfaces, types, classes, components
- camelCase for functions, variables, methods
- SCREAMING_SNAKE_CASE for constants
- kebab-case for file names

### Type Safety

- NO any without explicit justification comment
- NO @ts-ignore or @ts-expect-error without explanation
- Prefer unknown over any when type is truly unknown
- Use explicit return types on exported functions

## Unacceptable Comments

- Comments that repeat what code does
- Commented-out code (delete it)
- Obvious comments ("increment counter")
- Comments instead of good naming

## Testing

- **Vitest** + **Testing Library** for unit/component tests
- **Vitest browser mode** with Playwright for Storybook tests
- **MSW** for API mocking
- Test files: `__tests__/*.test.ts(x)` next to the source folder they cover

### Structure

- One logical assertion per test
- Descriptive test names that explain the scenario
- Use `describe` blocks to group related tests

### Mocking

- Mock hooks in page tests using `vi.mock()`
- Use MSW handlers for API mocking in hook/integration tests
- Don't mock the unit under test
- Reset mocks between tests with `vi.clearAllMocks()`

### Testing Hierarchy

| Component Type | What to Mock      | What to Test                        |
| -------------- | ----------------- | ----------------------------------- |
| **Page**       | Hooks             | Rendering states, user interactions |
| **Hook**       | API calls (MSW)   | Return values, state changes        |
| **Component**  | Nothing (usually) | Props handling, events              |

### Coverage

- Test happy path AND error cases
- Test edge cases (empty, null, boundary values)
- Test async behavior (loading, success, error states)

> Templates and MSW handler examples: [docs/TESTING.md](./docs/TESTING.md)

---

**Related:** [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) · [docs/ROUTING.md](./docs/ROUTING.md) · [docs/ERROR_BOUNDARIES.md](./docs/ERROR_BOUNDARIES.md) · [docs/TESTING.md](./docs/TESTING.md) · [docs/SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)
