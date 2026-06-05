# Testing Guide

## TL;DR

Vitest + Testing Library for unit/component tests. MSW for API mocking. Unit tests live in sibling `__tests__/` folders next to the source they cover. Storybook tests run via Vitest browser mode.

## Testing Stack

| Tool | Purpose |
| ------ | --------- |
| Vitest | Test runner (Jest-compatible API) |
| Testing Library | Component testing utilities |
| MSW | API mocking (Mock Service Worker) |
| Vitest Browser Mode | Storybook component testing |

## Test File Structure

Tests live in sibling `__tests__/` folders next to their source files:

```txt
src/
├── modules/
│   └── home/
│       └── pages/
│           ├── home-page.tsx
│           └── __tests__/
│               └── home-page.test.tsx
├── shared/
│   └── components/
│       ├── loading-spinner.tsx
│       └── __tests__/
│           └── loading-spinner.test.tsx
└── tests/
    ├── setup.ts                      # Global test setup
    ├── test-utils.tsx                # Custom render utilities
    └── integration/                  # Integration tests
        └── api-mocking.test.tsx
```

## Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# With coverage
pnpm test:coverage

# Interactive UI
pnpm test:ui
```

## Test Setup

### Global Setup (`src/tests/setup.ts`)

```typescript
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";

// MSW server for API mocking
export const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
```

### Custom Render (`src/tests/test-utils.tsx`)

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  { route = "/", queryClient, ...options } = {}
) {
  const testQueryClient = queryClient ?? createTestQueryClient();

  return {
    ...render(ui, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={testQueryClient}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </QueryClientProvider>
      ),
      ...options,
    }),
    queryClient: testQueryClient,
  };
}
```

## Testing Patterns

### Page Testing (Mock Hooks)

```typescript
// modules/home/pages/__tests__/home-page.test.tsx
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuthToken } from "@/modules/auth";
import HomePage from "./home-page";

vi.mock("@/modules/auth", () => ({
  useAuthToken: vi.fn(),
}));

const mockUseAuthToken = vi.mocked(useAuthToken);

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    mockUseAuthToken.mockReturnValue({
      status: "loading",
      loading: true,
      token: undefined,
      credentials: null,
      error: null,
    });

    render(<HomePage />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows content when authenticated", () => {
    mockUseAuthToken.mockReturnValue({
      status: "authenticated",
      loading: false,
      token: "mock-token",
      credentials: { id: 1, email: "test@example.com", name: "Test" },
      error: null,
    });

    render(<HomePage />);
    expect(screen.getByText("HomePageContent")).toBeInTheDocument();
  });
});
```

### Hook Testing

> For page-scoped hooks, the `__tests__/` folder sits beside the `hooks/` folder inside the page directory (e.g. `pages/{page}/hooks/__tests__/`).

```typescript
// modules/products/hooks/__tests__/use-products.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestProviders } from "@/tests/test-utils";
import { useProducts } from "./use-products";

describe("useProducts", () => {
  it("returns products data", async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: TestProviders,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toBeDefined();
  });
});
```

### Component Testing

```typescript
// shared/components/__tests__/user-card.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UserCard } from "./user-card";

const mockUser = { id: "1", name: "John Doe", email: "john@example.com" };

describe("UserCard", () => {
  it("renders user information", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<UserCard user={mockUser} onSelect={onSelect} />);
    await user.click(screen.getByRole("button"));

    expect(onSelect).toHaveBeenCalledWith("1");
  });
});
```

## MSW (API Mocking)

### Handler Setup (`src/mocks/handlers.ts`)

```typescript
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({ id: 1, name: "Test User" });
  }),

  http.post("/api/user", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: Date.now(), ...body }, { status: 201 });
  }),
];

// Error handlers for testing error states
export const errorHandlers = {
  unauthorized: http.get("/api/user", () => {
    return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
  }),

  serverError: http.get("/api/user", () => {
    return HttpResponse.json({ error: "Server Error" }, { status: 500 });
  }),

  networkError: http.get("/api/user", () => {
    return HttpResponse.error();
  }),
};
```

### Override Handlers in Tests

```typescript
import { server } from "@/tests/setup";
import { http, HttpResponse } from "msw";

it("handles API error", async () => {
  server.use(
    http.get("/api/users", () => {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    })
  );

  render(<UsersPage />);

  await waitFor(() => {
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });
});
```

## Test Configuration

### Vitest Config (`vite.config.ts`)

```typescript
test: {
  globals: true,
  environment: "jsdom",
  coverage: {
    provider: "v8",
    reporter: ["html", "text"],
  },
  projects: [
    {
      extends: true,
      test: {
        name: "unit",
        setupFiles: ["src/tests/setup.ts"],
        include: ["src/**/*.test.(ts|tsx)"],
      },
    },
    {
      extends: true,
      plugins: [storybookTest({ configDir: ".storybook" })],
      test: {
        name: "storybook",
        browser: {
          enabled: true,
          headless: true,
          provider: playwright(),
        },
      },
    },
  ],
}
```

## Best Practices

### Test Organization

1. **Colocate tests** - Place `*.test.tsx` next to source files
2. **Clear naming** - Use descriptive test names
3. **Single responsibility** - One behavior per test
4. **Mock at boundaries** - Mock hooks in pages, APIs in hooks

### Testing Hierarchy

| Component Type | What to Mock | What to Test |
| -------------- | ------------ | -------------- |
| **Page** | Hooks | Rendering states, user interactions |
| **Hook** | API calls (MSW) | Return values, state changes |
| **Component** | Nothing (usually) | Props handling, events |

### Performance Tips

1. **Use `vi.clearAllMocks()`** in `beforeEach`
2. **Avoid unnecessary renders** - Test specific behaviors
3. **Use `screen.getBy*`** for assertions (auto-waits)
4. **Mock expensive operations** - APIs, timers, animations

## Common Patterns

| Pattern | When to Use | Example |
| ------- | ----------- | ------- |
| `vi.mock()` | Mock entire modules | Page tests mocking hooks |
| `vi.fn()` | Mock single functions | Callback props |
| `server.use()` | Override API responses | Error state testing |
| `renderWithProviders()` | Components needing context | Router, Query, etc. |
| `waitFor()` | Async assertions | API data loading |

## Troubleshooting

### Tests Flaky

- Add proper `waitFor()` for async operations
- Use `findBy*` queries for elements that appear async
- Ensure MSW handlers cover all API calls

### Module Not Found

- Check `@/` alias configuration in vite.config.ts
- Verify import paths match actual file locations

### MSW Not Intercepting

- Ensure `server.listen()` is called in setup
- Check URL patterns match actual API calls
- Use `onUnhandledRequest: "error"` to catch missing handlers

---

**Related:** [ARCHITECTURE.md](./ARCHITECTURE.md) | [ROUTING.md](./ROUTING.md)
