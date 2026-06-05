# Setup Guide

Step-by-step guide for setting up your development environment.

## Prerequisites

Before you begin, ensure you have:

| Requirement         | Version    | Check Command           |
| ------------------- | ---------- | ----------------------- |
| Node.js             | >= 22.0.0  | `node --version`        |
| pnpm                | >= 10.14.0 | `pnpm --version`        |
| Azure DevOps Access | -          | Access to Urbix project |

## Step 1: Azure Artifacts Authentication

This project uses `@urbetrack/*` packages from Azure Artifacts.

### 1.1 Request Access

You must have access to the Urbix Azure DevOps project:

- Request access at: <https://dev.azure.com/urbetrack/Urbix/_artifacts/feed/urbix/settings/permissions>

### 1.2 Install Authentication Tool

```bash
npm install -g vsts-npm-auth
```

### 1.3 Authenticate

```bash
# Run from the project root (where .npmrc is located)
vsts-npm-auth -config .npmrc
```

This will open a browser window for Azure DevOps authentication. After authenticating, your credentials will be stored securely.

### 1.4 Verify Configuration

Your `.npmrc` file should contain:

```ini
@urbetrack:registry=https://urbetrack.pkgs.visualstudio.com/_packaging/urbix/npm/registry/
always-auth=true
```

## Step 2: Install Dependencies

```bash
pnpm install
```

If you encounter authentication errors, re-run `vsts-npm-auth -config .npmrc`.

## Step 3: Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

### Required: API URL

The `VITE_LEGACY_API_URL` is required for development. It specifies the backend server:

```txt
VITE_LEGACY_API_URL=https://qa03.urbetrack.com
```

Available environments:

| Environment | URL                          |
| ----------- | ---------------------------- |
| QA03        | `https://qa03.urbetrack.com` |
| QA04        | `https://qa04.urbetrack.com` |
| Production  | (uses parent window origin)  |

### Optional: Authentication Token

This microfrontend normally receives its authentication token from a parent application via `postMessage`. For standalone development, you can bypass this.

1. Obtain a JWT token from your main application (check browser DevTools → Application → Local Storage or Network tab)

2. Add the token to `.env.local`:

   ```txt
   VITE_DEV_AUTH_TOKEN=eyJhbGciOiJIUzI1NiIs...
   ```

3. Start the dev server - you'll be automatically authenticated

> **Note**: Never commit real tokens to the repository. The `.env.local` file is gitignored.

## Step 4: Start Development

```bash
# Start dev server (https://localhost:3000)
pnpm dev

# In another terminal, start Storybook (http://localhost:6006)
pnpm storybook
```

## Step 5: Verify Setup

1. **Dev server**: Navigate to <https://localhost:3000>
   - If using a dev token: Should show authenticated state
   - Without token: Should show "No Autenticado" page

2. **Tests**: Run the test suite

   ```bash
   pnpm test
   ```

3. **Linting**: Check code quality

   ```bash
   pnpm lint
   ```

## Troubleshooting

### "401 Unauthorized" when installing packages

**Cause**: Azure Artifacts authentication expired or missing.

**Solution**:

```bash
vsts-npm-auth -config .npmrc
pnpm install
```

### "ENOENT: no such file or directory, open '.npmrc'"

**Cause**: Missing .npmrc file.

**Solution**: Create `.npmrc` in project root with:

```ini
@urbetrack:registry=https://urbetrack.pkgs.visualstudio.com/_packaging/urbix/npm/registry/
always-auth=true
```

### App shows "No Autenticado" even with token

**Possible causes**:

1. Token is expired - obtain a fresh token
2. Token format is incorrect - ensure it's a valid JWT
3. Environment variable not loaded - restart the dev server after modifying `.env.local`

### Tests fail with "Cannot find module"

**Solution**:

```bash
pnpm install
```

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for project patterns
- Check [TESTING.md](./TESTING.md) for testing strategies
- Explore Storybook at <http://localhost:6006> for UI components
